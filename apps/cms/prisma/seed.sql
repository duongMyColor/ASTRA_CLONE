INSERT INTO UserRole (id)
SELECT 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM UserRole WHERE id = 'ADMIN');

INSERT INTO UserRole (id)
SELECT 'GENERAL'
WHERE NOT EXISTS (SELECT 1 FROM UserRole WHERE id = 'GENERAL');

INSERT INTO UserRole (id)
SELECT 'READ_ONLY'
WHERE NOT EXISTS (SELECT 1 FROM UserRole WHERE id = 'READ_ONLY');

INSERT INTO User (username, role, email, password, isDeleted, enabled, updatedAt)
SELECT 'SuperAdmin', 'ADMIN', 'superadmin@mycolor.com', '6f55e866038870eaf97f7bcfa81ce8e592cddbdb3c13d06e8cdaa57c6b1907ef', false, true, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM User WHERE username = 'SuperAdmin');

-- Insert 'acstaManagement' if it doesn't exist
INSERT INTO IdLastestOfRecord (name, idLastest, updatedAt)
SELECT 'acstaManagement', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM IdLastestOfRecord WHERE name = 'acstaManagement');
-- Insert 'performaceManagement' if it doesn't exist
INSERT INTO IdLastestOfRecord (name, idLastest, updatedAt)
SELECT 'performaceManagement', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM IdLastestOfRecord WHERE name = 'performaceManagement');
-- Insert 'license' if it doesn't exist
INSERT INTO IdLastestOfRecord (name, idLastest, updatedAt)
SELECT 'license', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM IdLastestOfRecord WHERE name = 'license');
-- Insert 'termsOfUse' if it doesn't exist
INSERT INTO IdLastestOfRecord (name, idLastest, updatedAt)
SELECT 'termsOfUse', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM IdLastestOfRecord WHERE name = 'termsOfUse');
-- Insert 'forcedUpdateManagements' if it doesn't exist
INSERT INTO IdLastestOfRecord (name, idLastest, updatedAt)
SELECT 'forcedUpdateManagements', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM IdLastestOfRecord WHERE name = 'forcedUpdateManagements');

-- Insert BootUpdate record if it doesn't exist
INSERT INTO BootUpdate (tableName, updatedAt, createdAt)
SELECT 'acstaManagement', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM BootUpdate WHERE tableName = 'acstaManagement');

INSERT INTO BootUpdate (tableName, updatedAt, createdAt)
SELECT 'aplicationMaster', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM BootUpdate WHERE tableName = 'aplicationMaster');

INSERT INTO BootUpdate (tableName, updatedAt, createdAt)
SELECT 'performaceManagement', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM BootUpdate WHERE tableName = 'performaceManagement');

INSERT INTO BootUpdate (tableName, updatedAt, createdAt)
SELECT 'termsOfUse', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM BootUpdate WHERE tableName = 'termsOfUse');

INSERT INTO BootUpdate (tableName, updatedAt, createdAt)
SELECT 'license', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM BootUpdate WHERE tableName = 'license');
