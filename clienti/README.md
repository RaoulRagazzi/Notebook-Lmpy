# Archivio clienti Splendoria

Qui vive il materiale di lavorazione di ogni cliente: una cartella per cliente,
dalla prima intervista al manoscritto pronto per la stampa.

## Struttura

```
clienti/
  CLAUDE.md            ← istruzioni operative per il ghostwriter (Claude)
  _modello/            ← cartella modello: copiala per ogni nuovo cliente
  mario-rossi/         ← esempio: un cliente
    scheda-cliente.md      dati, formula acquistata, diario di lavorazione
    capitoli/              il materiale scritto dal cliente (dal suo Studio)
      capitolo-01.md
    interviste/            appunti e trascrizioni delle interviste
    bozza/
      manoscritto.md       la bozza del libro scritta dal ghostwriter
      manoscritto.pdf      il PDF di prova generato dallo script
```

## Come arriva qui il materiale del cliente

Il primo capitolo che il cliente scrive nel suo Studio si esporta dal database
del sito con:

```bash
node scripts/esporta-cliente.mjs email@cliente.it
```

Lo script crea (o aggiorna) la cartella del cliente con la scheda e il
capitolo. Le interviste e gli altri materiali si aggiungono a mano nelle
cartelle `interviste/` e `capitoli/`.

## Il PDF di prova

Da qualsiasi file Markdown (bozza o capitolo) si genera il PDF impaginato in
formato A5:

```bash
node scripts/genera-pdf.mjs clienti/mario-rossi/bozza/manoscritto.md
```

Il PDF viene salvato accanto al file di partenza. Il cliente può inoltre
scaricare da solo il PDF di prova del suo primo capitolo, direttamente
dall'anteprima nel suo Studio.

## Riservatezza

Il contenuto di queste cartelle è materiale personale dei clienti: il
repository deve restare privato e i testi non vanno copiati altrove.
