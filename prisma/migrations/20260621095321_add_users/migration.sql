/*
  Warnings:

  - Added the required column `userId` to the `Label` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "nome" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Label" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Label_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Label" ("acidita", "alcol", "azienda", "createdAt", "glicerinaManuale", "id", "ingredientiJson", "nome", "paese", "riciclaggio", "slug", "zuccheroResiduo") SELECT "acidita", "alcol", "azienda", "createdAt", "glicerinaManuale", "id", "ingredientiJson", "nome", "paese", "riciclaggio", "slug", "zuccheroResiduo" FROM "Label";
DROP TABLE "Label";
ALTER TABLE "new_Label" RENAME TO "Label";
CREATE UNIQUE INDEX "Label_slug_key" ON "Label"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
