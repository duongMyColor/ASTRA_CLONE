-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'READ_ONLY',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "lastLogin" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "UserRole" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KeyToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "publicKey" TEXT,
    "privateKey" TEXT,
    "refreshToken" TEXT,
    "refreshTokensUsed" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "KeyToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AplicationMaster" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appName" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "AcstaManagement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "managementName" TEXT NOT NULL,
    "acstaName" TEXT NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "scanImageUrl" TEXT NOT NULL,
    "acstaBasicInfoId" INTEGER,
    "scanOriginX" REAL,
    "scanOriginY" REAL,
    "scanWidth" REAL,
    "scanHeight" REAL,
    "scanColors" TEXT,
    "modeId" INTEGER,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AcstaManagement_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "AplicationMaster" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PerformaceTypeMaster" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "typeName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PerformaceManagement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "TermsOfUse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memo" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishedDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "License" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memo" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishedDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "IdLastestOfRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "idLastest" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ForcedUpdateManagement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "managementName" TEXT NOT NULL,
    "operateSystem" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "publishedDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KeyToken_userId_key" ON "KeyToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "KeyToken_publicKey_key" ON "KeyToken"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "KeyToken_privateKey_key" ON "KeyToken"("privateKey");

-- CreateIndex
CREATE UNIQUE INDEX "KeyToken_refreshToken_key" ON "KeyToken"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "AplicationMaster_appName_key" ON "AplicationMaster"("appName");
