-- DropIndex
DROP INDEX "AplicationMaster_appName_key";

-- CreateTable
CREATE TABLE "BootUpdate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ForcedUpdateManagement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appMasterId" INTEGER NOT NULL,
    "managementName" TEXT NOT NULL,
    "operateSystem" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "publishedDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ForcedUpdateManagement_appMasterId_fkey" FOREIGN KEY ("appMasterId") REFERENCES "AplicationMaster" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ForcedUpdateManagement" ("createdAt", "id", "managementName", "operateSystem", "publishedDate", "updatedAt", "version") SELECT "createdAt", "id", "managementName", "operateSystem", "publishedDate", "updatedAt", "version" FROM "ForcedUpdateManagement";
DROP TABLE "ForcedUpdateManagement";
ALTER TABLE "new_ForcedUpdateManagement" RENAME TO "ForcedUpdateManagement";
CREATE TABLE "new_PerformaceManagement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "performanceTypeMasterId" INTEGER NOT NULL,
    "assetBundleIOS" TEXT NOT NULL,
    "acstaId" INTEGER NOT NULL,
    "assetBundleAndroid" TEXT NOT NULL,
    "encryptKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PerformaceManagement_performanceTypeMasterId_fkey" FOREIGN KEY ("performanceTypeMasterId") REFERENCES "PerformaceTypeMaster" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PerformaceManagement_acstaId_fkey" FOREIGN KEY ("acstaId") REFERENCES "AcstaManagement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PerformaceManagement" ("acstaId", "assetBundleAndroid", "assetBundleIOS", "createdAt", "encryptKey", "id", "isDeleted", "name", "performanceTypeMasterId", "updatedAt") SELECT "acstaId", "assetBundleAndroid", "assetBundleIOS", "createdAt", "encryptKey", "id", "isDeleted", "name", "performanceTypeMasterId", "updatedAt" FROM "PerformaceManagement";
DROP TABLE "PerformaceManagement";
ALTER TABLE "new_PerformaceManagement" RENAME TO "PerformaceManagement";
PRAGMA foreign_key_check("ForcedUpdateManagement");
PRAGMA foreign_key_check("PerformaceManagement");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "BootUpdate_tableName_key" ON "BootUpdate"("tableName");
