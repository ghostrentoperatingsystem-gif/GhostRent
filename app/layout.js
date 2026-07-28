import "./globals.css";

export const metadata = {
  title: "GhostRent",
  description: "GhostRent — find and list rentals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}