import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { FORMULE } from "@/lib/listino";

const PASSI = [
  {
    n: "Primo",
    titolo: "Registrati",
    testo:
      "Crea il tuo account gratuito: ricevi subito le tue credenziali e uno Studio di scrittura tutto tuo.",
  },
  {
    n: "Secondo",
    titolo: "Scrivi il primo capitolo",
    testo:
      "Racconta l'inizio della tua storia: il primo capitolo, fino a sei pagine, è in omaggio. Senza impegno.",
  },
  {
    n: "Terzo",
    titolo: "Scegli la formula",
    testo:
      "Quando sei pronto, scegli la formula del listino più adatta: un ghostwriter professionista completa il tuo libro.",
  },
  {
    n: "Quarto",
    titolo: "Ricevi il tuo libro",
    testo:
      "Stampa in brossura con le prime 5 copie incluse, consegna entro 10 giorni e deposito dell'opera a tutela dei diritti d'autore.",
  },
];

const SERVIZI = [
  {
    titolo: "Tutor dedicato",
    testo:
      "In ogni fase del progetto avrai al tuo fianco un tutor esperto, pronto a rispondere alle tue domande e a guidarti lungo il cammino della scrittura.",
  },
  {
    titolo: "Colloqui individuali",
    testo:
      "Conversazioni riservate per raccogliere informazioni e materiali essenziali, così che la tua storia si distingua davvero da tutte le altre.",
  },
  {
    titolo: "Copywriting",
    testo:
      "Il nostro team lavora a stretto contatto con te per far emergere i punti chiave del tuo messaggio e coinvolgere emotivamente chi legge.",
  },
  {
    titolo: "Grafica professionale",
    testo:
      "Designer esperti curano impaginazione e copertina, con un design armonioso e coerente con la tua personalità o con l'immagine della tua azienda.",
  },
  {
    titolo: "Versione digitale",
    testo:
      "Insieme al libro stampato ricevi una versione digitale e sfogliabile, da condividere con facilità con amici, familiari e lettori.",
  },
  {
    titolo: "Stampa e spedizione",
    testo:
      "Tempi di realizzazione rapidi e puntuali: le prime 5 copie stampate sono comprese, con consegna entro 10 giorni dall'approvazione della bozza.",
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
      "Ho trovato un team di persone serie e motivate, con la mia stessa passione e i miei stessi ideali. Il libro che mi hanno consegnato è stato addirittura migliore di quanto mi aspettassi.",
    autore: "Giorgia",
    ruolo: "Manager d'azienda",
  },
];

function ChapterHeading({ label, title }: { label: string; title: string }) {
  return (
    <>
      <p className="text-center font-sans text-[0.72rem] uppercase tracking-[0.26em] text-oro">
        {label}
      </p>
      <h2 className="mt-2 text-balance text-center font-display text-3xl font-medium text-ink sm:text-4xl">
        {title}
      </h2>
      <div className="filetto" aria-hidden="true" />
    </>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* Copertina */}
      <header className="bg-[radial-gradient(120%_90%_at_50%_0%,#262838_0%,#191a24_60%)] px-6 pb-20 pt-16 text-paper">
        <div className="mx-auto max-w-3xl border border-orochiara/75 px-8 py-16 text-center outline outline-1 outline-offset-[7px] outline-orochiara/35">
          <p className="font-sans text-[0.72rem] uppercase tracking-[0.3em] text-orochiara">
            Ogni vita merita un romanzo
          </p>
          <h1 className="mt-5 text-balance font-display text-5xl font-medium uppercase tracking-[0.14em] text-orochiara sm:text-7xl">
            Splendoria
          </h1>
          <p className="mt-2 font-display text-2xl italic">La tua vita in un romanzo.</p>
          <span className="my-6 block text-xl text-orochiara" aria-hidden="true">
            ❦
          </span>
          <p className="mx-auto max-w-xl text-balance text-paper/80">
            Il servizio di ghostwriting che trasforma la tua storia — o quella di chi ami —
            in un libro vero, scritto da professionisti della scrittura.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-balance text-paper/80">
            Registrati e scrivi subito il tuo primo capitolo:{" "}
            <em className="text-orochiara">fino a sei pagine, gratis.</em>
          </p>
          <Link
            href="/registrati"
            className="mt-9 inline-block bg-orochiara px-8 py-3.5 font-sans text-[0.78rem] uppercase tracking-[0.18em] text-ink hover:bg-[#e6cd88]"
          >
            Scrivi il tuo primo capitolo gratis
          </Link>
          <p className="mt-12 font-sans text-[0.68rem] uppercase tracking-[0.22em] text-paper/50">
            già Fabulis Vitae · Merano, Italia
          </p>
        </div>
      </header>

      <main>
        {/* Capitolo I — La storia */}
        <section className="mx-auto max-w-5xl px-6 pb-4 pt-18" id="storia">
          <ChapterHeading label="Capitolo I" title="La storia" />
          <p className="mx-auto mb-9 max-w-xl text-balance text-center font-display text-xl italic leading-relaxed text-ink">
            Esistono donne e uomini che stanno vivendo vite straordinarie. Storie che è un
            peccato dimenticare.
          </p>
          <div className="mx-auto max-w-2xl space-y-4">
            <p className="incipit">
              In un angolo di un bar, in un incontro destinato a cambiare il corso delle
              cose, tre menti creative — ognuna con il proprio stile e mestiere —
              condividevano storie e ispirazioni. Alzarono i bicchieri per brindare a una
              nuova alleanza: spiriti affini, intrecciati da un amore comune per la
              scrittura, che fosse romanzo, prosa o poesia. Da quel brindisi è nata
              Splendoria.
            </p>
            <p>
              Hai mai pensato che la tua storia potrebbe essere raccontata in un libro, o
              diventare la trama di un film? Con Splendoria è possibile: sia in forma
              pubblica che anonima, la tua biografia — o una parte romanzata di essa —
              diventa un libro vero, da consegnare ad amici, figli e nipoti. Per rimanere,
              a futura memoria, vivi per sempre.
            </p>
          </div>
        </section>

        {/* Capitolo II — Come funziona */}
        <section className="mx-auto max-w-5xl px-6 pb-4 pt-18" id="come-funziona">
          <ChapterHeading label="Capitolo II" title="Come funziona" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PASSI.map((p) => (
              <div key={p.titolo}>
                <span className="block font-display italic text-oro">{p.n}</span>
                <h3 className="mt-1 font-display text-xl font-medium text-ink">
                  {p.titolo}
                </h3>
                <p className="mt-2 text-[0.95rem]">{p.testo}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center font-display text-lg italic text-bordeaux">
            <span className="mb-2 block font-sans text-[0.68rem] not-italic uppercase tracking-[0.22em] text-muted">
              Scegli il genere
            </span>
            Autobiografia <span className="px-2 not-italic text-oro">·</span> Memoriale{" "}
            <span className="px-2 not-italic text-oro">·</span> Ritratto{" "}
            <span className="px-2 not-italic text-oro">·</span> Giallo{" "}
            <span className="px-2 not-italic text-oro">·</span> Thriller{" "}
            <span className="px-2 not-italic text-oro">·</span> Romanzo
          </p>
        </section>

        {/* Capitolo III — Le formule */}
        <section className="mx-auto max-w-5xl px-6 pb-4 pt-18" id="formule">
          <ChapterHeading label="Capitolo III" title="Le formule" />
          <div className="grid items-stretch gap-5 md:grid-cols-2">
            {FORMULE.map((f) => (
              <article
                key={f.id}
                className={
                  f.inEvidenza
                    ? "flex flex-col bg-ink p-7 text-paper"
                    : "flex flex-col border border-linea bg-paper3 p-7"
                }
              >
                <h3
                  className={`font-display text-2xl font-medium ${
                    f.inEvidenza ? "text-orochiara" : "text-ink"
                  }`}
                >
                  {f.nome}
                </h3>
                <p
                  className={`font-display italic ${
                    f.inEvidenza ? "text-paper/75" : "text-bordeaux"
                  }`}
                >
                  {f.sottotitolo}
                </p>
                <p className="mt-4 font-display text-3xl tabular-nums">
                  {f.prezzo.toLocaleString("it-IT")}&nbsp;€{" "}
                  <small
                    className={`font-sans text-sm tracking-wide ${
                      f.inEvidenza ? "text-paper/60" : "text-muted"
                    }`}
                  >
                    · {f.pagine}
                  </small>
                </p>
                <ul className="mt-4 flex-1">
                  {f.dettagli.map((d) => (
                    <li
                      key={d}
                      className={`border-t py-2 pl-5 text-[0.93rem] relative before:absolute before:left-0 before:text-oro before:content-['—'] ${
                        f.inEvidenza ? "border-paper/15" : "border-linea"
                      }`}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-9 max-w-2xl text-center text-sm text-muted">
            Ogni progetto è seguito da un tutor dedicato, dalla prima intervista alla
            consegna. Marcatura e deposito dell&apos;opera inclusi in tutte le formule.
          </p>
        </section>

        {/* Capitolo IV — Sempre incluso */}
        <section className="mx-auto max-w-5xl px-6 pb-4 pt-18" id="servizi">
          <ChapterHeading label="Capitolo IV" title="Sempre incluso" />
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVIZI.map((s) => (
              <div key={s.titolo}>
                <h3 className="font-sans text-[0.78rem] uppercase tracking-[0.18em] text-bordeaux">
                  {s.titolo}
                </h3>
                <p className="mt-2 text-[0.95rem]">{s.testo}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fascia Scuola Holden */}
        <aside className="mt-18 bg-ink2 px-6 py-14 text-center text-paper">
          <p className="mx-auto max-w-3xl text-balance font-display text-xl italic leading-relaxed">
            «Alcuni romanzi sono scritti dagli scrittori della Scuola Holden, la scuola di
            storytelling fondata a Torino da Alessandro Baricco insieme a Carlo
            Feltrinelli, Oscar Farinetti e Andrea Guerra.»
          </p>
          <span className="mt-5 block font-sans text-[0.78rem] uppercase tracking-[0.14em] text-orochiara">
            Le storie più avvincenti, raccontate da chi le sa scrivere
          </span>
        </aside>

        {/* Capitolo V — Dicono di noi */}
        <section className="mx-auto max-w-5xl px-6 pb-4 pt-18" id="voci">
          <ChapterHeading label="Capitolo V" title="Dicono di noi" />
          <div className="grid gap-5 md:grid-cols-3">
            {VOCI.map((v) => (
              <article key={v.autore} className="border-t-2 border-oro bg-paper2 p-7">
                <blockquote className="font-display italic leading-relaxed text-ink before:text-lg before:text-oro before:content-['“']">
                  {v.testo}
                </blockquote>
                <cite className="mt-4 block font-sans text-[0.72rem] not-italic uppercase tracking-[0.16em] text-muted">
                  <b className="font-semibold text-bordeaux">{v.autore}</b> · {v.ruolo}
                </cite>
              </article>
            ))}
          </div>
        </section>

        {/* Epilogo */}
        <section className="mt-18 bg-ink px-6 py-18 text-paper">
          <div className="mx-auto max-w-3xl border border-orochiara/60 px-8 py-12 text-center">
            <p className="font-sans text-[0.72rem] uppercase tracking-[0.26em] text-orochiara">
              Epilogo
            </p>
            <h2 className="mt-2 text-balance font-display text-3xl font-medium sm:text-4xl">
              La tua storia comincia qui.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-paper/80">
              Crea il tuo account gratuito, scrivi il primo capitolo della tua vita e
              scopri com&apos;è vederla diventare un libro. Al resto pensiamo noi.
            </p>
            <Link
              href="/registrati"
              className="mt-8 inline-block bg-orochiara px-8 py-3.5 font-sans text-[0.78rem] uppercase tracking-[0.18em] text-ink hover:bg-[#e6cd88]"
            >
              Inizia gratis
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
