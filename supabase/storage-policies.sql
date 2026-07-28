-- property-images: public read, owner-only write
create policy "landlord_upload_own_folder"
on storage.objects for insert
with check (
  bucket_id = 'property-images'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "public_read_property_images"
on storage.objects for select
using (bucket_id = 'property-images');

-- tenant-documents: private, owner-only read AND write
create policy "tenant_upload_own_documents"
on storage.objects for insert
with check (
  bucket_id = 'tenant-documents'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "tenant_read_own_documents"
on storage.objects for select
using (
  bucket_id = 'tenant-documents'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "tenant_delete_own_documents"
on storage.objects for delete
using (
  bucket_id = 'tenant-documents'
  and auth.uid()::text = (storage.foldername(name))[1]
);