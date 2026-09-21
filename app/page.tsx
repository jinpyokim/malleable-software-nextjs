export default function Page() {
  const year = new Date().getFullYear();
  return (
    <div className="wrap">
      <main aria-labelledby="brand">
        <h1 id="brand">malleable software</h1>
        <p>provides personal knowledge management with AI and</p>
        <p>discovers insights from crowdsourced personal knowledge.</p>
        <br />
        <p>Cupertino, CA</p>
        <p><a href="mailto:reach@malleablesoft.com">reach@malleablesoft.com</a></p>
        <footer>© {year} malleable software LLC</footer>
      </main>
    </div>
  );
}
