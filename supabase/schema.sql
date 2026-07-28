-- ============================================================
-- GhostRent schema — hardened version
-- ============================================================

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  preferred_name text,
  phone text,
  email text,
  residential_address text,
  postal_address text,
  role text check (role in ('tenant', 'landlord', 'buyer')),
  city text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "profiles_select_own"
on profiles for select
using (auth.uid() = id);

create policy "profiles_update_own"
on profiles for update using (auth.uid() = id);

create policy "profiles_insert_own"
on profiles for insert with check (auth.uid() = id);

create view public_profiles as
select id, full_name, preferred_name, role, city, created_at
from profiles;

grant select on public_profiles to authenticated, anon;

create table properties (
  id uuid primary key default gen_random_uuid(),
  landlord_id uuid references profiles(id) on delete cascade,
  listing_type text check (listing_type in ('rent', 'sale')),
  price numeric not null,
  province text not null,
  city text not null,
  area text not null,
  latitude numeric,
  longitude numeric,
  bedrooms int,
  bathrooms int,
  parking int,
  property_type text,
  amenities text[],
  description text,
  availability_type text check (availability_type in ('now', 'date')),
  availability_date date,
  images jsonb default '{}'::jsonb,
  status text default 'draft' check (status in ('draft', 'approved', 'rejected', 'expired')),
  published boolean default false,
  rejection_reason text,
  views int default 0,
  created_at timestamptz default now(),
  expires_at timestamptz
);

alter table properties enable row level security;

create policy "properties_public_read_approved"
on properties for select
using (status = 'approved' and published = true);

create policy "properties_owner_read_own"
on properties for select
using (auth.uid() = landlord_id);

create policy "properties_owner_insert"
on properties for insert
with check (auth.uid() = landlord_id and status = 'draft' and published = false);

create policy "properties_owner_update"
on properties for update
using (auth.uid() = landlord_id);

create policy "properties_owner_delete"
on properties for delete
using (auth.uid() = landlord_id);

create or replace function prevent_self_moderation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() <> 'service_role' then
    new.status := old.status;
    new.published := old.published;
    new.rejection_reason := old.rejection_reason;
  end if;
  return new;
end;
$$;

create trigger trg_prevent_self_moderation
before update on properties
for each row
execute function prevent_self_moderation();

create index idx_properties_status_published on properties (status, published);
create index idx_properties_listing_type on properties (listing_type);
create index idx_properties_province_city on properties (province, city);
create index idx_properties_landlord_id on properties (landlord_id);

create table tenant_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references profiles(id) on delete cascade,
  budget numeric,
  province text,
  city text,
  area text,
  bedrooms int,
  bathrooms int,
  move_date date,
  employment text,
  description text,
  selfie_url text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  rejection_reason text,
  created_at timestamptz default now()
);

alter table tenant_requests enable row level security;

create policy "tenant_requests_owner_all"
on tenant_requests for all
using (auth.uid() = tenant_id);

create index idx_tenant_requests_tenant_id on tenant_requests (tenant_id);

create table contact_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references profiles(id) on delete cascade,
  landlord_id uuid references profiles(id) on delete cascade,
  property_id uuid references properties(id) on delete cascade,
  tenant_approved boolean default false,
  landlord_approved boolean default false,
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'expired')),
  created_at timestamptz default now(),
  unique (tenant_id, property_id)
);

alter table contact_requests enable row level security;

create policy "contact_requests_participants_select"
on contact_requests for select
using (auth.uid() = tenant_id or auth.uid() = landlord_id);

create policy "contact_requests_tenant_insert"
on contact_requests for insert
with check (
  auth.uid() = tenant_id
  and landlord_approved = false
  and payment_status = 'pending'
);

create policy "contact_requests_landlord_update_approval"
on contact_requests for update
using (auth.uid() = landlord_id)
with check (auth.uid() = landlord_id);

create or replace function lock_contact_request_columns()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() <> 'service_role' then
    new.tenant_id := old.tenant_id;
    new.landlord_id := old.landlord_id;
    new.property_id := old.property_id;
    new.tenant_approved := old.tenant_approved;
    new.payment_status := old.payment_status;
  end if;
  return new;
end;
$$;

create trigger trg_lock_contact_request_columns
before update on contact_requests
for each row
execute function lock_contact_request_columns();

create index idx_contact_requests_tenant_id on contact_requests (tenant_id);
create index idx_contact_requests_landlord_id on contact_requests (landlord_id);
create index idx_contact_requests_property_id on contact_requests (property_id);

create or replace function notify_landlord_on_contact_request()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into notifications (user_id, type, title, body, metadata)
  values (
    new.landlord_id,
    'contact_request',
    'A tenant wants to request your property',
    (select area from properties where id = new.property_id),
    jsonb_build_object('contact_request_id', new.id, 'property_id', new.property_id)
  );
  return new;
end;
$$;

create trigger trg_notify_landlord_on_contact_request
after insert on contact_requests
for each row
execute function notify_landlord_on_contact_request();

create table messages (
  id uuid primary key default gen_random_uuid(),
  contact_request_id uuid references contact_requests(id) on delete cascade,
  sender_id uuid references profiles(id) on delete cascade,
  receiver_id uuid references profiles(id) on delete cascade,
  content text,
  read boolean default false,
  created_at timestamptz default now()
);

alter table messages enable row level security;

create policy "messages_participants_only"
on messages for select
using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "messages_participants_insert"
on messages for insert
with check (
  auth.uid() = sender_id
  and exists (
    select 1 from contact_requests cr
    where cr.id = contact_request_id
    and cr.tenant_approved = true
    and cr.landlord_approved = true
    and cr.payment_status = 'paid'
    and (cr.tenant_id = auth.uid() or cr.landlord_id = auth.uid())
  )
);

create index idx_messages_contact_request_id on messages (contact_request_id);
create index idx_messages_sender_id on messages (sender_id);
create index idx_messages_receiver_id on messages (receiver_id);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  read boolean default false,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table notifications enable row level security;

create policy "notifications_owner_all"
on notifications for all
using (auth.uid() = user_id);

create index idx_notifications_user_id on notifications (user_id);

create table payments (
  id uuid primary key default gen_random_uuid(),
  contact_request_id uuid references contact_requests(id) on delete cascade,
  amount numeric not null,
  paystack_reference text unique,
  status text,
  created_at timestamptz default now()
);

alter table payments enable row level security;

create policy "payments_participants_read"
on payments for select
using (
  exists (
    select 1 from contact_requests cr
    where cr.id = contact_request_id
    and (cr.tenant_id = auth.uid() or cr.landlord_id = auth.uid())
  )
);

create index idx_payments_contact_request_id on payments (contact_request_id);

create table saved_properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  property_id uuid references properties(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, property_id)
);

alter table saved_properties enable row level security;

create policy "saved_properties_owner_all"
on saved_properties for all
using (auth.uid() = user_id);

create index idx_saved_properties_user_id on saved_properties (user_id);
create index idx_saved_properties_property_id on saved_properties (property_id);

create table property_views (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade,
  viewer_id uuid references profiles(id),
  created_at timestamptz default now()
);

alter table property_views enable row level security;

create policy "property_views_insert_any_authenticated"
on property_views for insert
with check (auth.uid() is not null);

create policy "property_views_owner_select"
on property_views for select
using (
  exists (
    select 1 from properties p
    where p.id = property_id and p.landlord_id = auth.uid()
  )
);

create index idx_property_views_property_id on property_views (property_id);

create table landlord_contact_details (
  property_id uuid primary key references properties(id) on delete cascade,
  phone text,
  whatsapp text
);

alter table landlord_contact_details enable row level security;

create policy "contact_details_paid_only"
on landlord_contact_details for select
using (
  exists (
    select 1 from contact_requests cr
    where cr.property_id = landlord_contact_details.property_id
    and cr.tenant_id = auth.uid()
    and cr.tenant_approved = true
    and cr.landlord_approved = true
    and cr.payment_status = 'paid'
  )
);