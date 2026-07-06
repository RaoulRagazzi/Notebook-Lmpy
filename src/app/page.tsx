import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { FORMULE } from "@/lib/listino";

const PASSI = [
  {
    titolo: "Registrati",
    testo:
      "Crea il tuo account gratuito: ricevi subito le tue credenziali e uno Studio di scrittura tutto tuo.",
  },
  {
    titolo: "Scrivi il primo capitolo",
    testo:
      "Racconta l'inizio della tua storia: il primo capitolo, fino a sei pagine, è in omaggio. Senza impegno.",
  },
  {
    titolo: "Scegli la formula",
    testo:
      "Quando sei pronto, scegli la formula più adatta: un ghostwriter professionista completa il tuo libro.",
  },
  {
    titolo: "Ricevi il tuo libro",
    testo:
      "Stampa con le prime 5 copie incluse, consegna entro 10 giorni e deposito dell'opera a tutela dei diritti d'autore.",
  },
];

const SERVIZI = [
  {
    titolo: "Tutor dedicato",
    testo:
      "In ogni fase del progetto avrai al tuo fianco un tutor esperto, pronto a guidarti lungo il cammino della scrittura.",
  },
  {
    titolo: "Colloqui individuali",
    testo:
      "Conversazioni riservate per raccogliere informazioni e materiali, così che la tua storia si distingua da tutte le altre.",
  },
  {
    titolo: "Copywriting",
    testo:
      "Il nostro team lavora con te per far emergere i punti chiave del tuo messaggio e coinvolgere emotivamente chi legge.",
  },
  {
    titolo: "Grafica professionale",
    testo:
      "Designer esperti curano impaginazione e copertina, con un design coerente con la tua personalità o la tua azienda.",
  },
  {
    titolo: "Versione digitale",
    testo:
      "Insieme al libro stampato ricevi una versione digitale e sfogliabile, da condividere con amici, familiari e lettori.",
  },
  {
    titolo: "Stampa e spedizione",
    testo:
      "Tempi rapidi e puntuali: le prime 5 copie sono comprese, con consegna entro 10 giorni dall'approvazione della bozza.",
  },
];

const VOCI = [
  {
    testo:
      "Ho sempre desiderato scrivere un libro, ma mi intimoriva il foglio bianco. Le indicazioni online sono intuitive, i tempi sono stati rispettati e la qualità del libro è eccellente.",
    autore: "Tatiana",
    ruolo: "Insegnante",
  },
  {
    testo:
      "Eccellente il percorso di accompagnamento che mi ha portato a realizzare il mio sogno. Raccontare la mia vita a dei professionisti della scrittura è un'esperienza che consiglio vivamente.",
    autore: "Ettore",
    ruolo: "Commerciante",
  },
  {
    testo:
      "Ho trovato un team di persone serie e motivate, con la mia stessa passione. Il libro che mi hanno consegnato è stato addirittura migliore di quanto mi aspettassi.",
    autore: "Giorgia",
    ruolo: "Manager d'azienda",
  },
];

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <>
      <p className="text-center text-lg font-semibold text-oro">{label}</p>
      <h2 className="font-display mx-auto mt-2 mb-14 max-w-3xl text-balance text-center text-5xl font-semibold text-ink sm:text-6xl">
        {title}
      </h2>
    </>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <header className="bg-ink2 px-6 pb-28 pt-24 text-center text-white">
        <p className="text-xl font-semibold text-orochiara">
          Ogni vita merita un romanzo
        </p>
        <h1 className="font-display mx-auto mt-4 max-w-4xl text-balance text-7xl font-semibold sm:text-8xl">
          Splendoria
        </h1>
        <p className="font-display mx-auto mt-5 max-w-2xl text-balance text-3xl italic text-[#a8c3b8] sm:text-4xl">
          La tua vita in un romanzo.
        </p>
        <p className="mx-auto mt-7 max-w-2xl text-balance text-2xl text-white/85">
          Il servizio di ghostwriting che trasforma la tua storia — o quella di chi
          ami — in un libro vero, scritto da professionisti.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/registrati"
            className="rounded-full bg-oro px-8 py-4 text-xl font-medium text-white hover:bg-[#0b7c72]"
          >
            Scrivi il primo capitolo gratis
          </Link>
          <Link
            href="#come-funziona"
            className="text-xl font-medium text-orochiara hover:underline"
          >
            Scopri come funziona&nbsp;›
          </Link>
        </div>
        <p className="mt-16 text-lg text-white/50">
          già Fabulis Vitae · Merano, Italia
        </p>
      </header>

      <main>
        {/* La storia */}
        <section className="bg-paper2 px-6 py-24" id="storia">
          <SectionHeading label="La storia" title="Storie che è un peccato dimenticare." />
          <div className="mx-auto max-w-3xl space-y-6 text-2xl leading-relaxed text-testo">
            <p>
              In un angolo di un bar, in un incontro destinato a cambiare il corso delle
              cose, tre menti creative — ognuna con il proprio stile e mestiere —
              condividevano storie e ispirazioni. Alzarono i bicchieri per brindare a una
              nuova alleanza: spiriti affini, uniti da un amore comune per la scrittura.
              Da quel brindisi è nata Splendoria.
            </p>
            <p>
              Hai mai pensato che la tua storia potrebbe essere raccontata in un libro, o
              diventare la trama di un film? Con Splendoria è possibile: sia in forma
              pubblica che anonima, la tua biografia — o una parte romanzata di essa —
              diventa un libro vero, da consegnare ad amici, figli e nipoti.{" "}
              <span className="font-semibold text-ink">
                Per rimanere, a futura memoria, vivi per sempre.
              </span>
            </p>
          </div>
        </section>

        {/* Come funziona */}
        <section className="px-6 py-24" id="come-funziona">
          <SectionHeading label="Come funziona" title="Quattro passi. Un libro vero." />
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PASSI.map((p, i) => (
              <div key={p.titolo} className="rounded-[28px] bg-paper2 p-8">
                <span className="text-4xl font-semibold text-oro">{i + 1}</span>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                  {p.titolo}
                </h3>
                <p className="mt-3 text-lg text-muted">{p.testo}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-14 max-w-3xl text-center text-2xl text-muted">
            <span className="font-semibold text-ink">Scegli il genere.</span>{" "}
            Autobiografia, memoriale, ritratto, giallo, thriller o romanzo.
          </p>
        </section>

        {/* Le formule */}
        <section className="bg-paper2 px-6 py-24" id="formule">
          <SectionHeading label="Listino" title="Scegli la tua formula." />
          <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-3">
            {FORMULE.map((f) => (
              <article
                key={f.id}
                className={`flex flex-col rounded-[28px] p-9 ${
                  f.inEvidenza ? "bg-ink text-white" : "bg-white"
                }`}
              >
                <h3
                  className={`font-display text-3xl font-semibold ${
                    f.inEvidenza ? "text-white" : "text-ink"
                  }`}
                >
                  {f.nome}
                </h3>
                <p
                  className={`mt-1 text-lg ${
                    f.inEvidenza ? "text-white/70" : "text-muted"
                  }`}
                >
                  {f.sottotitolo}
                </p>
                <p className="font-display mt-6 text-5xl font-semibold tabular-nums">
                  {f.prezzo.toLocaleString("it-IT")}&nbsp;€
                </p>
                <p
                  className={`mt-1 text-lg ${
                    f.inEvidenza ? "text-white/70" : "text-muted"
                  }`}
                >
                  {f.pagine}
                </p>
                <ul className="mt-6 flex-1 space-y-0">
                  {f.dettagli.map((d) => (
                    <li
                      key={d}
                      className={`border-t py-3 text-lg ${
                        f.inEvidenza
                          ? "border-white/15 text-white/85"
                          : "border-linea text-testo"
                      }`}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/listino"
                  className={`mt-8 rounded-full px-6 py-3.5 text-center text-lg font-medium ${
                    f.inEvidenza
                      ? "bg-oro text-white hover:bg-[#0b7c72]"
                      : "bg-oro text-white hover:bg-[#0b7c72]"
                  }`}
                >
                  Scegli {f.nome.split(" ·")[0]}
                </Link>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center text-lg text-muted">
            Ogni progetto è seguito da un tutor dedicato, dalla prima intervista alla
            consegna. Marcatura e deposito dell&apos;opera inclusi in tutte le formule.
          </p>
        </section>

        {/* Sempre incluso */}
        <section className="px-6 py-24" id="servizi">
          <SectionHeading label="Sempre incluso" title="Tutto quello che serve. Di serie." />
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVIZI.map((s) => (
              <div key={s.titolo} className="rounded-[28px] bg-paper2 p-8">
                <h3 className="text-2xl font-semibold tracking-tight text-ink">
                  {s.titolo}
                </h3>
                <p className="mt-3 text-lg text-muted">{s.testo}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scuola Holden */}
        <aside className="bg-ink2 px-6 py-24 text-center text-white">
          <p className="font-display mx-auto max-w-4xl text-balance text-3xl font-semibold sm:text-4xl">
            Alcuni romanzi sono scritti dagli scrittori della Scuola Holden, la scuola
            di storytelling fondata a Torino da Alessandro Baricco insieme a Carlo
            Feltrinelli, Oscar Farinetti e Andrea Guerra.
          </p>
          <p className="mt-6 text-xl text-orochiara">
            Le storie più avvincenti, raccontate da chi le sa scrivere.
          </p>
        </aside>

        {/* Dicono di noi */}
        <section className="px-6 py-24" id="voci">
          <SectionHeading label="Dicono di noi" title="Vite diventate libri." />
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {VOCI.map((v) => (
              <article key={v.autore} className="rounded-[28px] bg-paper2 p-8">
                <blockquote className="font-display text-2xl leading-relaxed text-testo">
                  “{v.testo}”
                </blockquote>
                <p className="mt-6 text-lg">
                  <b className="font-semibold text-ink">{v.autore}</b>
                  <span className="text-muted"> · {v.ruolo}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA finale */}
        <section className="bg-paper2 px-6 py-24 text-center">
          <h2 className="font-display mx-auto max-w-3xl text-balance text-5xl font-semibold text-ink sm:text-6xl">
            La tua storia comincia qui.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-2xl text-muted">
            Crea il tuo account gratuito, scrivi il primo capitolo della tua vita e
            scopri com&apos;è vederla diventare un libro. Al resto pensiamo noi.
          </p>
          <Link
            href="/registrati"
            className="mt-10 inline-block rounded-full bg-oro px-8 py-4 text-xl font-medium text-white hover:bg-[#0b7c72]"
          >
            Inizia gratis
          </Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
