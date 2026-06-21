-- CreateTable
CREATE TABLE "WineStory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "labelId" TEXT NOT NULL,
    "annata" TEXT NOT NULL DEFAULT '',
    "denominazione" TEXT NOT NULL DEFAULT '',
    "vitigno" TEXT NOT NULL DEFAULT '',
    "zonaProduzione" TEXT NOT NULL DEFAULT '',
    "vigneto" TEXT NOT NULL DEFAULT '',
    "vinificazione" TEXT NOT NULL DEFAULT '',
    "affinamento" TEXT NOT NULL DEFAULT '',
    "noteDegustazione" TEXT NOT NULL DEFAULT '',
    "temperaturaServizio" TEXT NOT NULL DEFAULT '',
    "abbinamenti" TEXT NOT NULL DEFAULT '',
    "certificazioni" TEXT NOT NULL DEFAULT '',
    "storiaVino" TEXT NOT NULL DEFAULT '',
    "raccontoCantina" TEXT NOT NULL DEFAULT '',
    "premiJson" TEXT NOT NULL DEFAULT '[]',
    "testoSocialBreve" TEXT NOT NULL DEFAULT '',
    "testoSitoLungo" TEXT NOT NULL DEFAULT '',
    "immagineBottiglia" TEXT NOT NULL DEFAULT '',
    "immagineEtichetta" TEXT NOT NULL DEFAULT '',
    "immagineVigneto" TEXT NOT NULL DEFAULT '',
    "immagineCantina" TEXT NOT NULL DEFAULT '',
    "lingua" TEXT NOT NULL DEFAULT 'it',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WineStory_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "WineStory_labelId_key" ON "WineStory"("labelId");
