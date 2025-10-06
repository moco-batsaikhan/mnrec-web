export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <head>
        <title>MNREC CMS - Удирдлагын систем</title>
        <meta name="description" content="MNREC веб сайтын удирдлагын систем" />
      </head>
      <body>{children}</body>
    </html>
  );
}
