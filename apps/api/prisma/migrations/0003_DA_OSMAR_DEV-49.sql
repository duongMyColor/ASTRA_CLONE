-- RedefineTables
PRAGMA defer_foreign_keys = on;
CREATE TABLE "new_AplicationMaster" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appName" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "termsOfUseId" INTEGER NOT NULL,
    "licenseId" INTEGER NOT NULL,
    "assetBundleIOS" TEXT NOT NULL,
    "assetBundleAndroid" TEXT NOT NULL,
    "encryptKey" TEXT NOT NULL,
    "outlineUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AplicationMaster_termsOfUseId_fkey" FOREIGN KEY ("termsOfUseId") REFERENCES "TermsOfUse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AplicationMaster_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "License" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AplicationMaster" ("appName", "assetBundleAndroid", "assetBundleIOS", "createdAt", "encryptKey", "id", "licenseId", "outlineUrl", "packageName", "termsOfUseId", "updatedAt") SELECT "appName", "assetBundleAndroid", "assetBundleIOS", "createdAt", "encryptKey", "id", "licenseId", "outlineUrl", "packageName", "termsOfUseId", "updatedAt" FROM "AplicationMaster";
DROP TABLE "AplicationMaster";
ALTER TABLE "new_AplicationMaster" RENAME TO "AplicationMaster";
CREATE UNIQUE INDEX "AplicationMaster_appName_key" ON "AplicationMaster"("appName");
CREATE UNIQUE INDEX "AplicationMaster_packageName_key" ON "AplicationMaster"("packageName");
PRAGMA foreign_key_check("AplicationMaster");
PRAGMA defer_foreign_keys = off;
