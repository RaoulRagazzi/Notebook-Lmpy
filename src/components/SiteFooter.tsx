export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-4 px-6 py-10 text-center font-sans text-sm">
        <span>
          <b className="mb-1 block text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-orochiara">
            Indirizzo
          </b>
          Via J. W. von Goethe 42
          <br />
          39012 Merano (BZ), Italia
        </span>
        <span>
          <b className="mb-1 block text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-orochiara">
            Telefono
          </b>
          <a href="tel:+3902950290219" className="border-b border-orochiara/50">
            +39 02 950 290 219
          </a>
        </span>
        <span>
          <b className="mb-1 block text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-orochiara">
            Email
          </b>
          <a href="mailto:info@splendoria.vip" className="border-b border-orochiara/50">
            info@splendoria.vip
          </a>
        </span>
      </div>
      <p className="border-t border-paper/10 py-5 text-center font-sans text-[0.7rem] uppercase tracking-[0.12em] text-paper/45">
        Splendoria · già Fabulis Vitae · La tua vita in un romanzo
      </p>
    </footer>
  );
}
