// Testi del sito in italiano, tedesco e inglese.
// La lingua attiva è salvata nel cookie "lang" (vedi src/lib/lang.ts).

import type { FormulaId } from "./listino";

export type Lang = "it" | "de" | "en";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "it", label: "IT" },
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
];

export const LOCALE: Record<Lang, string> = {
  it: "it-IT",
  de: "de-DE",
  en: "en-GB",
};

type FormulaTesti = { sottotitolo: string; pagine: string; dettagli: string[] };

const it = {
  nav: {
    comeFunziona: "Come funziona",
    listino: "Listino",
    contattaci: "Contattaci",
    studio: "Il tuo Studio",
    esci: "Esci",
    accedi: "Accedi",
    iniziaGratis: "Inizia gratis",
  },
  footer: {
    indirizzo: "Indirizzo",
    contactTitle: "Contattaci",
    contactIntro: "Raccontaci brevemente come possiamo aiutarti.",
    fullName: "Nome e cognome",
    phone: "Telefono",
    email: "Email",
    subject: "Oggetto",
    message: "Messaggio",
    send: "Invia richiesta",
    sending: "Invio in corso...",
    success: "Grazie, la tua richiesta è stata inviata.",
    error: "Non è stato possibile inviare la richiesta. Riprova tra poco.",
    required: "Tutti i campi sono obbligatori.",
    tagline: "Splendoria · La tua vita in un romanzo",
  },
  home: {
    eyebrow: "Ogni vita merita un romanzo",
    tagline: "La tua vita in un romanzo.",
    sub: "Il servizio di ghostwriting che trasforma la tua storia — o quella di chi ami — in un libro vero, scritto da professionisti.",
    ctaPrimo: "Scrivi il primo capitolo gratis",
    ctaScopri: "Scopri come funziona ›",
    storiaLabel: "La storia",
    storiaTitolo: "Storie che è un peccato dimenticare.",
    storiaP1:
      "In un angolo di un bar, in un incontro destinato a cambiare il corso delle cose, tre menti creative — ognuna con il proprio stile e mestiere — condividevano storie e ispirazioni. Alzarono i bicchieri per brindare a una nuova alleanza: spiriti affini, uniti da un amore comune per la scrittura. Da quel brindisi è nata Splendoria.",
    storiaP2:
      "Hai mai pensato che la tua storia potrebbe essere raccontata in un libro, o diventare la trama di un film? Con Splendoria è possibile: sia in forma pubblica che anonima, la tua biografia — o una parte romanzata di essa — diventa un libro vero, da consegnare ad amici, figli e nipoti.",
    storiaForte: "Per rimanere, a futura memoria, vivi per sempre.",
    comeLabel: "Come funziona",
    comeTitolo: "Quattro passi. Un libro vero.",
    passi: [
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
    ],
    genereTitolo: "Scegli il genere.",
    genereTesto: "Autobiografia, memoriale, ritratto, giallo, thriller o romanzo.",
    listinoLabel: "Listino",
    listinoTitolo: "Scegli la tua formula.",
    scegli: "Scegli",
    listinoNota:
      "Ogni progetto è seguito da un tutor dedicato, dalla prima intervista alla consegna. Marcatura e deposito dell'opera inclusi in tutte le formule.",
    serviziLabel: "Sempre incluso",
    serviziTitolo: "Tutto quello che serve. Di serie.",
    servizi: [
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
    ],
    holdenQuote:
      "Alcuni romanzi sono scritti dagli scrittori della Scuola Holden, la scuola di storytelling fondata a Torino da Alessandro Baricco insieme a Carlo Feltrinelli, Oscar Farinetti e Andrea Guerra.",
    holdenSub: "Le storie più avvincenti, raccontate da chi le sa scrivere.",
    vociLabel: "Dicono di noi",
    vociTitolo: "Vite diventate libri.",
    voci: [
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
    ],
    finaleTitolo: "La tua storia comincia qui.",
    finaleTesto:
      "Crea il tuo account gratuito, scrivi il primo capitolo della tua vita e scopri com'è vederla diventare un libro. Al resto pensiamo noi.",
    finaleBtn: "Inizia gratis",
  },
  formule: {
    HYBRID: {
      sottotitolo: "Interviste online e in presenza, a un prezzo fisso",
      pagine: "80 pagine · 50.000 battute",
      dettagli: [
        "Due interviste da 30 minuti, online o in presenza",
        "Possibilità di videointervista e invio di foto e documenti",
        "Scrittura ed editing professionale",
        "Impaginazione e copertina incluse",
        "Stampa in formato A5, prime 5 copie comprese",
        "Consegna entro 10 giorni e deposito dell'opera",
      ],
    },
    PREMIUM_SHORT: {
      sottotitolo: "Formula ibrida con approfondimento psicologico",
      pagine: "100 pagine · 72.000 battute",
      dettagli: [
        "Call di 60 minuti dedicata a temi, aneddoti e messaggio",
        "4 incontri di scrittura da un'ora, online o in presenza",
        "Copertina personalizzata e formato di stampa su richiesta",
        "Prime 5 copie comprese, consegna in 10 giorni",
        "Marcatura e deposito dell'opera",
      ],
    },
    CORPORATE: {
      sottotitolo: "Per aziende, professionisti e partite IVA",
      pagine: "200 pagine · 150–180.000 battute",
      dettagli: [
        "Proposta sartoriale per raccontare la tua impresa",
        "4 incontri di scrittura da un'ora",
        "Il racconto scritto dagli scrittori della Scuola Holden",
        "Un libro che infonde stima e credibilità",
        "Prime 5 copie comprese, deposito dell'opera",
      ],
    },
  } as Record<FormulaId, FormulaTesti>,
  listinoPage: {
    label: "Listino",
    titolo: "Continua il tuo libro.",
    intro:
      "Il primo capitolo è in omaggio. Per trasformarlo in un libro completo — scritto da un ghostwriter professionista, stampato e depositato a tuo nome — scegli la formula più adatta: ti contatteremo per il pagamento e per fissare la prima intervista.",
    scegliFormula: "Scegli questa formula",
    registratiPer: "Registrati per iniziare",
    nota: "Tutte le formule comprendono tutor dedicato, menabò digitale, versione sfogliabile, stampa delle prime 5 copie, consegna entro 10 giorni dall'approvazione della bozza e deposito dell'opera a tutela dei diritti d'autore.",
  },
  auth: {
    creaTitolo: "Crea il tuo account",
    creaIntro:
      "Ricevi subito le tue credenziali e scrivi gratis il primo capitolo della tua storia: fino a sei pagine, senza impegno.",
    nome: "Nome",
    email: "Email",
    password: "Password",
    registratiBtn: "Registrati gratis",
    creazione: "Creazione…",
    benvenuto: "Benvenuto",
    credenzialiIntro1: "Il tuo account è pronto. Queste sono le tue credenziali: ",
    credenzialiForte: "conservale con cura",
    credenzialiIntro2: ", ti serviranno per accedere al tuo Studio.",
    nomeUtente: "Nome utente (email)",
    copia: "Copia",
    copiata: "Copiata ✓",
    entraStudio: "Entra nel tuo Studio",
    haiAccount: "Hai già un account?",
    accediTitolo: "Accedi",
    accediIntro: "Entra nel tuo Studio e continua a scrivere la tua storia.",
    accediBtn: "Accedi",
    accesso: "Accesso…",
    nonHaiAccount: "Non hai un account?",
    registratiLink: "Registrati gratis",
    erroreRegistrazione: "Errore durante la registrazione.",
    erroreAccesso: "Errore durante l'accesso.",
  },
  studio: {
    label: "Il tuo Studio",
    bentornato: "Bentornato",
    intro:
      "Questo è il tuo spazio di scrittura. Il primo capitolo — fino a sei pagine — è in omaggio: raccontaci come comincia la tua storia. Quando vorrai continuare, scegli una formula del listino e un ghostwriter professionista la porterà a compimento.",
    formula: "Formula",
    richiestaRicevuta: "Richiesta ricevuta il",
    richiestaSeguito:
      ": ti contatteremo per il pagamento e per fissare la prima intervista.",
    inLavorazione: "In lavorazione",
    ctaTitolo: "Ti piace com'è cominciata?",
    ctaTesto:
      "Il tuo primo capitolo è solo l'inizio. Scegli la formula più adatta e i nostri ghostwriter trasformeranno la tua storia in un libro vero, stampato e depositato a tuo nome.",
    ctaBtn: "Continua il tuo libro ›",
  },
  editor: {
    capitolo: "Capitolo primo",
    omaggio: "· in omaggio",
    scrivi: "Scrivi",
    anteprima: "Anteprima",
    titoloLabel: "Titolo del capitolo",
    titoloPlaceholder: "Es. Da dove tutto è cominciato",
    genereLabel: "Genere",
    storiaLabel: "La tua storia",
    testoPlaceholder:
      "C'era una volta la tua vita. Comincia a raccontarla da dove vuoi: un ricordo, una persona, un giorno che ha cambiato tutto…",
    battute: "battute",
    circa: "circa",
    pagina: "pagina",
    pagine: "pagine",
    su6: "su 6",
    salva: "Salva capitolo",
    salvataggio: "Salvataggio…",
    salvato: "Capitolo salvato ✓",
    senzaTitolo: "Senza titolo",
    vuoto:
      "Non hai ancora scritto nulla: torna alla scheda «Scrivi» e comincia la tua storia.",
    erroreSalvataggio: "Errore durante il salvataggio.",
    pdfBtn: "Scarica il PDF di prova",
    pdfProva: "PDF di prova",
    di: "di",
  },
  errors: {
    credenziali: "Email o password non corretti.",
    datiNonValidi: "Inserisci nome e un indirizzo email valido.",
    emailEsistente: "Esiste già un account con questa email. Accedi.",
    sessioneScaduta: "Sessione scaduta: accedi di nuovo.",
    troppeBattute: "Il capitolo gratuito può contenere al massimo {max} battute.",
  },
  generi: ["Autobiografia", "Memoriale", "Ritratto", "Giallo", "Thriller", "Romanzo"],
};

export type Dict = typeof it;

const de: Dict = {
  nav: {
    comeFunziona: "So funktioniert's",
    listino: "Preise",
    contattaci: "Kontakt",
    studio: "Dein Studio",
    esci: "Abmelden",
    accedi: "Anmelden",
    iniziaGratis: "Gratis starten",
  },
  footer: {
    indirizzo: "Adresse",
    contactTitle: "Kontakt",
    contactIntro: "Erzähl uns kurz, wie wir dir helfen können.",
    fullName: "Vor- und Nachname",
    phone: "Telefon",
    email: "E-Mail",
    subject: "Betreff",
    message: "Nachricht",
    send: "Anfrage senden",
    sending: "Wird gesendet...",
    success: "Vielen Dank, deine Anfrage wurde gesendet.",
    error: "Die Anfrage konnte nicht gesendet werden. Bitte versuche es später erneut.",
    required: "Alle Felder sind Pflichtfelder.",
    tagline: "Splendoria · Dein Leben als Roman",
  },
  home: {
    eyebrow: "Jedes Leben verdient einen Roman",
    tagline: "Dein Leben als Roman.",
    sub: "Der Ghostwriting-Service, der deine Geschichte — oder die eines geliebten Menschen — in ein echtes Buch verwandelt, geschrieben von Profis.",
    ctaPrimo: "Schreib dein erstes Kapitel gratis",
    ctaScopri: "So funktioniert's ›",
    storiaLabel: "Unsere Geschichte",
    storiaTitolo: "Geschichten, die nicht vergessen werden dürfen.",
    storiaP1:
      "In der Ecke einer Bar, bei einer Begegnung, die den Lauf der Dinge verändern sollte, teilten drei kreative Köpfe — jeder mit eigenem Stil und Handwerk — Geschichten und Inspiration. Sie erhoben die Gläser auf einen neuen Bund: verwandte Seelen, vereint durch die gemeinsame Liebe zum Schreiben. Aus diesem Toast wurde Splendoria geboren.",
    storiaP2:
      "Hast du je daran gedacht, dass deine Geschichte in einem Buch erzählt werden könnte — oder zur Vorlage eines Films? Mit Splendoria ist das möglich: öffentlich oder anonym wird deine Biografie — oder ein romanhafter Teil davon — zu einem echten Buch für Freunde, Kinder und Enkel.",
    storiaForte: "Um für immer in Erinnerung zu bleiben.",
    comeLabel: "So funktioniert's",
    comeTitolo: "Vier Schritte. Ein echtes Buch.",
    passi: [
      {
        titolo: "Registrieren",
        testo:
          "Erstelle dein kostenloses Konto: Du erhältst sofort deine Zugangsdaten und ein eigenes Schreibstudio.",
      },
      {
        titolo: "Schreib das erste Kapitel",
        testo:
          "Erzähl uns, wie deine Geschichte beginnt: Das erste Kapitel — bis zu sechs Seiten — ist geschenkt. Ganz unverbindlich.",
      },
      {
        titolo: "Wähle dein Paket",
        testo:
          "Wenn du bereit bist, wählst du das passende Paket: Ein professioneller Ghostwriter vollendet dein Buch.",
      },
      {
        titolo: "Erhalte dein Buch",
        testo:
          "Gedruckt mit den ersten 5 Exemplaren inklusive, Lieferung innerhalb von 10 Tagen und Werkhinterlegung zum Schutz deiner Urheberrechte.",
      },
    ],
    genereTitolo: "Wähle das Genre.",
    genereTesto: "Autobiografie, Memoiren, Porträt, Krimi, Thriller oder Roman.",
    listinoLabel: "Preise",
    listinoTitolo: "Wähle dein Paket.",
    scegli: "Wähle",
    listinoNota:
      "Jedes Projekt wird von einem persönlichen Tutor begleitet, vom ersten Gespräch bis zur Lieferung. Werkhinterlegung und Urheberrechtsschutz in allen Paketen inklusive.",
    serviziLabel: "Immer inklusive",
    serviziTitolo: "Alles, was du brauchst. Serienmäßig.",
    servizi: [
      {
        titolo: "Persönlicher Tutor",
        testo:
          "In jeder Phase des Projekts steht dir ein erfahrener Tutor zur Seite und begleitet dich auf deinem Weg zum Buch.",
      },
      {
        titolo: "Persönliche Gespräche",
        testo:
          "Vertrauliche Gespräche, um Informationen und Material zu sammeln — damit sich deine Geschichte von allen anderen abhebt.",
      },
      {
        titolo: "Copywriting",
        testo:
          "Unser Team arbeitet eng mit dir zusammen, um die Kernbotschaften herauszuarbeiten und Leser emotional zu berühren.",
      },
      {
        titolo: "Professionelle Gestaltung",
        testo:
          "Erfahrene Designer gestalten Layout und Cover — stimmig zu deiner Persönlichkeit oder deinem Unternehmen.",
      },
      {
        titolo: "Digitale Ausgabe",
        testo:
          "Zusätzlich zum gedruckten Buch erhältst du eine digitale, blätterbare Ausgabe zum einfachen Teilen mit Familie, Freunden und Lesern.",
      },
      {
        titolo: "Druck und Versand",
        testo:
          "Schnell und zuverlässig: Die ersten 5 gedruckten Exemplare sind inklusive, Lieferung innerhalb von 10 Tagen nach Freigabe.",
      },
    ],
    holdenQuote:
      "Einige Romane stammen aus der Feder der Autoren der Scuola Holden, der Storytelling-Schule, die Alessandro Baricco gemeinsam mit Carlo Feltrinelli, Oscar Farinetti und Andrea Guerra in Turin gegründet hat.",
    holdenSub: "Die fesselndsten Geschichten, erzählt von denen, die schreiben können.",
    vociLabel: "Stimmen",
    vociTitolo: "Aus Leben werden Bücher.",
    voci: [
      {
        testo:
          "Ich wollte immer ein Buch schreiben, aber das leere Blatt hat mich eingeschüchtert. Die Online-Anleitung ist intuitiv, die Termine wurden eingehalten und die Qualität des Buches ist ausgezeichnet.",
        autore: "Tatiana",
        ruolo: "Lehrerin",
      },
      {
        testo:
          "Eine hervorragende Begleitung, die mich meinen Traum verwirklichen ließ. Mein Leben professionellen Autoren zu erzählen ist eine Erfahrung, die ich wärmstens empfehle.",
        autore: "Ettore",
        ruolo: "Kaufmann",
      },
      {
        testo:
          "Ich habe ein Team von ernsthaften, motivierten Menschen gefunden, die meine Leidenschaft teilen. Das Buch, das sie mir übergeben haben, war sogar besser, als ich erwartet hatte.",
        autore: "Giorgia",
        ruolo: "Managerin",
      },
    ],
    finaleTitolo: "Deine Geschichte beginnt hier.",
    finaleTesto:
      "Erstelle dein kostenloses Konto, schreib das erste Kapitel deines Lebens und erlebe, wie daraus ein Buch wird. Um den Rest kümmern wir uns.",
    finaleBtn: "Gratis starten",
  },
  formule: {
    HYBRID: {
      sottotitolo: "Interviews online und vor Ort, zum Festpreis",
      pagine: "80 Seiten · 50.000 Zeichen",
      dettagli: [
        "Zwei 30-minütige Interviews, online oder vor Ort",
        "Möglichkeit für Videointerviews sowie Zusendung von Fotos und Dokumenten",
        "Professionelles Schreiben und Lektorat",
        "Layout und Cover inklusive",
        "Druck im A5-Format, die ersten 5 Exemplare inklusive",
        "Lieferung innerhalb von 10 Tagen und Werkhinterlegung",
      ],
    },
    PREMIUM_SHORT: {
      sottotitolo: "Hybrid-Paket mit psychologischer Vertiefung",
      pagine: "100 Seiten · 72.000 Zeichen",
      dettagli: [
        "60-minütiges Gespräch zu Themen, Anekdoten und Botschaft",
        "4 einstündige Schreibtreffen, online oder vor Ort",
        "Individuelles Cover und Druckformat auf Wunsch",
        "Die ersten 5 Exemplare inklusive, Lieferung in 10 Tagen",
        "Werkhinterlegung und Urheberrechtsschutz",
      ],
    },
    CORPORATE: {
      sottotitolo: "Für Unternehmen, Selbstständige und Freiberufler",
      pagine: "200 Seiten · 150–180.000 Zeichen",
      dettagli: [
        "Ein maßgeschneidertes Konzept, um dein Unternehmen zu erzählen",
        "4 einstündige Schreibtreffen",
        "Die Geschichte, geschrieben von den Autoren der Scuola Holden",
        "Ein Buch, das Ansehen und Glaubwürdigkeit schafft",
        "Die ersten 5 Exemplare inklusive, Werkhinterlegung",
      ],
    },
  },
  listinoPage: {
    label: "Preise",
    titolo: "Setz dein Buch fort.",
    intro:
      "Das erste Kapitel ist geschenkt. Um daraus ein vollständiges Buch zu machen — geschrieben von einem professionellen Ghostwriter, gedruckt und auf deinen Namen hinterlegt — wähle das passende Paket: Wir melden uns wegen der Zahlung und zur Vereinbarung des ersten Interviews.",
    scegliFormula: "Dieses Paket wählen",
    registratiPer: "Registrieren und loslegen",
    nota: "Alle Pakete beinhalten einen persönlichen Tutor, digitales Layout, blätterbare Ausgabe, die ersten 5 gedruckten Exemplare, Lieferung innerhalb von 10 Tagen nach Freigabe sowie Werkhinterlegung zum Schutz der Urheberrechte.",
  },
  auth: {
    creaTitolo: "Erstelle dein Konto",
    creaIntro:
      "Erhalte sofort deine Zugangsdaten und schreib gratis das erste Kapitel deiner Geschichte: bis zu sechs Seiten, ganz unverbindlich.",
    nome: "Name",
    email: "E-Mail",
    password: "Passwort",
    registratiBtn: "Kostenlos registrieren",
    creazione: "Wird erstellt…",
    benvenuto: "Willkommen",
    credenzialiIntro1: "Dein Konto ist bereit. Das sind deine Zugangsdaten: ",
    credenzialiForte: "bewahre sie gut auf",
    credenzialiIntro2: ", du brauchst sie für den Zugang zu deinem Studio.",
    nomeUtente: "Benutzername (E-Mail)",
    copia: "Kopieren",
    copiata: "Kopiert ✓",
    entraStudio: "Zu deinem Studio",
    haiAccount: "Schon ein Konto?",
    accediTitolo: "Anmelden",
    accediIntro: "Betritt dein Studio und schreib deine Geschichte weiter.",
    accediBtn: "Anmelden",
    accesso: "Anmeldung…",
    nonHaiAccount: "Noch kein Konto?",
    registratiLink: "Kostenlos registrieren",
    erroreRegistrazione: "Fehler bei der Registrierung.",
    erroreAccesso: "Fehler bei der Anmeldung.",
  },
  studio: {
    label: "Dein Studio",
    bentornato: "Willkommen zurück",
    intro:
      "Das ist dein Schreibraum. Das erste Kapitel — bis zu sechs Seiten — ist geschenkt: Erzähl uns, wie deine Geschichte beginnt. Wenn du weitermachen möchtest, wähle ein Paket und ein professioneller Ghostwriter vollendet dein Buch.",
    formula: "Paket",
    richiestaRicevuta: "Anfrage eingegangen am",
    richiestaSeguito:
      ": Wir melden uns wegen der Zahlung und zur Vereinbarung des ersten Interviews.",
    inLavorazione: "In Bearbeitung",
    ctaTitolo: "Gefällt dir der Anfang?",
    ctaTesto:
      "Dein erstes Kapitel ist erst der Anfang. Wähle das passende Paket und unsere Ghostwriter machen aus deiner Geschichte ein echtes Buch — gedruckt und auf deinen Namen hinterlegt.",
    ctaBtn: "Setz dein Buch fort ›",
  },
  editor: {
    capitolo: "Erstes Kapitel",
    omaggio: "· geschenkt",
    scrivi: "Schreiben",
    anteprima: "Vorschau",
    titoloLabel: "Kapiteltitel",
    titoloPlaceholder: "z. B. Wo alles begann",
    genereLabel: "Genre",
    storiaLabel: "Deine Geschichte",
    testoPlaceholder:
      "Es war einmal dein Leben. Beginn zu erzählen, wo du willst: eine Erinnerung, ein Mensch, ein Tag, der alles verändert hat…",
    battute: "Zeichen",
    circa: "etwa",
    pagina: "Seite",
    pagine: "Seiten",
    su6: "von 6",
    salva: "Kapitel speichern",
    salvataggio: "Wird gespeichert…",
    salvato: "Kapitel gespeichert ✓",
    senzaTitolo: "Ohne Titel",
    vuoto:
      "Du hast noch nichts geschrieben: Wechsle zu «Schreiben» und beginn deine Geschichte.",
    erroreSalvataggio: "Fehler beim Speichern.",
    pdfBtn: "Test-PDF herunterladen",
    pdfProva: "Test-PDF",
    di: "von",
  },
  errors: {
    credenziali: "E-Mail oder Passwort falsch.",
    datiNonValidi: "Bitte gib deinen Namen und eine gültige E-Mail-Adresse ein.",
    emailEsistente: "Mit dieser E-Mail existiert bereits ein Konto. Bitte melde dich an.",
    sessioneScaduta: "Sitzung abgelaufen: Bitte melde dich erneut an.",
    troppeBattute: "Das Gratis-Kapitel darf höchstens {max} Zeichen enthalten.",
  },
  generi: ["Autobiografie", "Memoiren", "Porträt", "Krimi", "Thriller", "Roman"],
};

const en: Dict = {
  nav: {
    comeFunziona: "How it works",
    listino: "Pricing",
    contattaci: "Contact",
    studio: "Your Studio",
    esci: "Sign out",
    accedi: "Sign in",
    iniziaGratis: "Start free",
  },
  footer: {
    indirizzo: "Address",
    contactTitle: "Contact us",
    contactIntro: "Tell us briefly how we can help.",
    fullName: "Full name",
    phone: "Phone",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send enquiry",
    sending: "Sending...",
    success: "Thank you, your enquiry has been sent.",
    error: "We could not send your enquiry. Please try again shortly.",
    required: "All fields are required.",
    tagline: "Splendoria · Your life as a novel",
  },
  home: {
    eyebrow: "Every life deserves a novel",
    tagline: "Your life as a novel.",
    sub: "The ghostwriting service that turns your story — or the story of someone you love — into a real book, written by professionals.",
    ctaPrimo: "Write your first chapter for free",
    ctaScopri: "See how it works ›",
    storiaLabel: "Our story",
    storiaTitolo: "Stories too precious to be forgotten.",
    storiaP1:
      "In the corner of a café, in a meeting destined to change the course of things, three creative minds — each with their own style and craft — shared stories and inspiration. They raised their glasses to a new alliance: kindred spirits united by a shared love of writing. From that toast, Splendoria was born.",
    storiaP2:
      "Have you ever thought your story could be told in a book, or become the plot of a film? With Splendoria it's possible: publicly or anonymously, your biography — or a novelised part of it — becomes a real book to hand to friends, children and grandchildren.",
    storiaForte: "To remain alive forever, for generations to come.",
    comeLabel: "How it works",
    comeTitolo: "Four steps. A real book.",
    passi: [
      {
        titolo: "Sign up",
        testo:
          "Create your free account: receive your credentials right away, plus a writing Studio of your own.",
      },
      {
        titolo: "Write the first chapter",
        testo:
          "Tell us how your story begins: the first chapter, up to six pages, is on us. No strings attached.",
      },
      {
        titolo: "Choose your plan",
        testo:
          "When you're ready, choose the plan that suits you best: a professional ghostwriter completes your book.",
      },
      {
        titolo: "Receive your book",
        testo:
          "Printed with the first 5 copies included, delivered within 10 days, and registered to protect your copyright.",
      },
    ],
    genereTitolo: "Choose the genre.",
    genereTesto: "Autobiography, memoir, portrait, mystery, thriller or novel.",
    listinoLabel: "Pricing",
    listinoTitolo: "Choose your plan.",
    scegli: "Choose",
    listinoNota:
      "Every project is guided by a dedicated tutor, from the first interview to delivery. Copyright registration and protection included in every plan.",
    serviziLabel: "Always included",
    serviziTitolo: "Everything you need. As standard.",
    servizi: [
      {
        titolo: "Dedicated tutor",
        testo:
          "At every stage of the project you'll have an expert tutor by your side, ready to guide you along the writing journey.",
      },
      {
        titolo: "One-to-one conversations",
        testo:
          "Private conversations to gather essential information and material, so that your story truly stands out from all the others.",
      },
      {
        titolo: "Copywriting",
        testo:
          "Our team works closely with you to bring out the key points of your message and emotionally engage your readers.",
      },
      {
        titolo: "Professional design",
        testo:
          "Expert designers take care of layout and cover, with a design that reflects your personality or your company's image.",
      },
      {
        titolo: "Digital edition",
        testo:
          "Along with the printed book you receive a digital, browsable edition to share easily with family, friends and readers.",
      },
      {
        titolo: "Printing and delivery",
        testo:
          "Fast, reliable turnaround: the first 5 printed copies are included, with delivery within 10 days of proof approval.",
      },
    ],
    holdenQuote:
      "Some of the novels are written by the writers of Scuola Holden, the storytelling school founded in Turin by Alessandro Baricco together with Carlo Feltrinelli, Oscar Farinetti and Andrea Guerra.",
    holdenSub: "The most compelling stories, told by those who know how to write them.",
    vociLabel: "What they say",
    vociTitolo: "Lives turned into books.",
    voci: [
      {
        testo:
          "I always wanted to write a book, but the blank page intimidated me. The online guidance is intuitive, the deadlines were met and the quality of the book is excellent.",
        autore: "Tatiana",
        ruolo: "Teacher",
      },
      {
        testo:
          "An excellent guided journey that helped me make my dream come true. Telling my life to professional writers is an experience I warmly recommend.",
        autore: "Ettore",
        ruolo: "Shopkeeper",
      },
      {
        testo:
          "I found a team of serious, motivated people who share my passion. The book they delivered was even better than I expected.",
        autore: "Giorgia",
        ruolo: "Company manager",
      },
    ],
    finaleTitolo: "Your story starts here.",
    finaleTesto:
      "Create your free account, write the first chapter of your life and see what it feels like to watch it become a book. We'll take care of the rest.",
    finaleBtn: "Start for free",
  },
  formule: {
    HYBRID: {
      sottotitolo: "Online and in-person interviews, at one fixed price",
      pagine: "80 pages · 50,000 characters",
      dettagli: [
        "Two 30-minute interviews, online or in person",
        "Option to record a video interview and send photos and documents",
        "Professional writing and editing",
        "Layout and cover included",
        "A5 print run with the first 5 copies included",
        "Delivery within 10 days and copyright registration",
      ],
    },
    PREMIUM_SHORT: {
      sottotitolo: "Hybrid plan with in-depth psychological interviews",
      pagine: "100 pages · 72,000 characters",
      dettagli: [
        "A 60-minute call dedicated to themes, anecdotes and message",
        "4 one-hour writing sessions, online or in person",
        "Custom cover and print format on request",
        "First 5 copies included, delivery within 10 days",
        "Copyright registration and protection",
      ],
    },
    CORPORATE: {
      sottotitolo: "For companies, professionals and freelancers",
      pagine: "200 pages · 150–180,000 characters",
      dettagli: [
        "A tailor-made proposal to tell the story of your business",
        "4 one-hour writing sessions",
        "Your story written by the writers of Scuola Holden",
        "A book that builds trust and credibility",
        "First 5 copies included, copyright registration",
      ],
    },
  },
  listinoPage: {
    label: "Pricing",
    titolo: "Continue your book.",
    intro:
      "The first chapter is free. To turn it into a complete book — written by a professional ghostwriter, printed and registered in your name — choose the plan that suits you best: we'll contact you about payment and to schedule the first interview.",
    scegliFormula: "Choose this plan",
    registratiPer: "Sign up to get started",
    nota: "All plans include a dedicated tutor, digital layout, a browsable edition, the first 5 printed copies, delivery within 10 days of proof approval, and copyright registration.",
  },
  auth: {
    creaTitolo: "Create your account",
    creaIntro:
      "Receive your credentials right away and write the first chapter of your story for free: up to six pages, no strings attached.",
    nome: "Name",
    email: "Email",
    password: "Password",
    registratiBtn: "Sign up free",
    creazione: "Creating…",
    benvenuto: "Welcome",
    credenzialiIntro1: "Your account is ready. These are your credentials: ",
    credenzialiForte: "keep them safe",
    credenzialiIntro2: ", you'll need them to access your Studio.",
    nomeUtente: "Username (email)",
    copia: "Copy",
    copiata: "Copied ✓",
    entraStudio: "Enter your Studio",
    haiAccount: "Already have an account?",
    accediTitolo: "Sign in",
    accediIntro: "Enter your Studio and keep writing your story.",
    accediBtn: "Sign in",
    accesso: "Signing in…",
    nonHaiAccount: "No account yet?",
    registratiLink: "Sign up free",
    erroreRegistrazione: "Something went wrong during sign-up.",
    erroreAccesso: "Something went wrong during sign-in.",
  },
  studio: {
    label: "Your Studio",
    bentornato: "Welcome back",
    intro:
      "This is your writing space. The first chapter — up to six pages — is free: tell us how your story begins. When you want to continue, choose a plan and a professional ghostwriter will bring it to completion.",
    formula: "Plan",
    richiestaRicevuta: "Request received on",
    richiestaSeguito:
      ": we'll contact you about payment and to schedule the first interview.",
    inLavorazione: "In progress",
    ctaTitolo: "Like how it begins?",
    ctaTesto:
      "Your first chapter is just the beginning. Choose the plan that suits you best and our ghostwriters will turn your story into a real book, printed and registered in your name.",
    ctaBtn: "Continue your book ›",
  },
  editor: {
    capitolo: "Chapter one",
    omaggio: "· free",
    scrivi: "Write",
    anteprima: "Preview",
    titoloLabel: "Chapter title",
    titoloPlaceholder: "E.g. Where it all began",
    genereLabel: "Genre",
    storiaLabel: "Your story",
    testoPlaceholder:
      "Once upon a time, there was your life. Start telling it wherever you like: a memory, a person, a day that changed everything…",
    battute: "characters",
    circa: "about",
    pagina: "page",
    pagine: "pages",
    su6: "of 6",
    salva: "Save chapter",
    salvataggio: "Saving…",
    salvato: "Chapter saved ✓",
    senzaTitolo: "Untitled",
    vuoto: "You haven't written anything yet: go back to “Write” and begin your story.",
    erroreSalvataggio: "Something went wrong while saving.",
    pdfBtn: "Download the trial PDF",
    pdfProva: "Trial PDF",
    di: "by",
  },
  errors: {
    credenziali: "Incorrect email or password.",
    datiNonValidi: "Please enter your name and a valid email address.",
    emailEsistente: "An account with this email already exists. Please sign in.",
    sessioneScaduta: "Session expired: please sign in again.",
    troppeBattute: "The free chapter can contain at most {max} characters.",
  },
  generi: ["Autobiography", "Memoir", "Portrait", "Mystery", "Thriller", "Novel"],
};

const DICTS: Record<Lang, Dict> = { it, de, en };

export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}
