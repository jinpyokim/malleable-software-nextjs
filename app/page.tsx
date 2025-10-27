export default function Page() {
  const year = new Date().getFullYear();
  return (
    <div className="wrap">
      <main aria-labelledby="brand">
        <h1 id="brand">malleable software</h1>
        <p>Cupertino, CA</p>
        <p><a href="mailto:reach@malleablesoft.com">reach@malleablesoft.com</a></p>
        <footer>© {year} Malleable Software LLC</footer>
      </main>
    </div>
  );
}
