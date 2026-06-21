-- CreateTable
CREATE TABLE "Label" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "alcol" REAL NOT NULL DEFAULT 0,
    "acidita" REAL NOT NULL DEFAULT 0,
    "zuccheroResiduo" REAL NOT NULL DEFAULT 0,
    "glicerinaManuale" BOOLEAN NOT NULL DEFAULT false,
    "ingredientiJson" TEXT NOT NULL DEFAULT '[]',
    "riciclaggio" TEXT NOT NULL DEFAULT 'manuale',
    "azienda" TEXT NOT NULL DEFAULT '',
    "paese" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Label_slug_key" ON "Label"("slug");
