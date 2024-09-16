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
-- PRAGMA foreign_key_check("ForcedUpdateManagement");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "BootUpdate_tableName_key" ON "BootUpdate"("tableName");

-- CreateIndex
CREATE UNIQUE INDEX "AplicationMaster_packageName_key" ON "AplicationMaster"("packageName");
