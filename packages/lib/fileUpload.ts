import { existsSync } from 'fs';
import { writeFile, mkdir, readFile as fsReadFile } from 'fs/promises';
import { join } from 'path';
import mime from 'mime-types';

const saveFile = async (
  file: File,
  fileName: string,
  folderPath: string
): Promise<{ filePath: string }> => {
  const fileArrayBuffer = await file.arrayBuffer();

  const destinationDirPath = join(process.cwd(), folderPath);

  if (!existsSync(destinationDirPath)) {
    await mkdir(destinationDirPath, { recursive: true });
  }

  await writeFile(
    join(destinationDirPath, fileName),
    Buffer.from(fileArrayBuffer)
  );

  return { filePath: join(folderPath, fileName) };
};

const getMimeType = (filePath: string): string => {
  const mimeType = mime.lookup(filePath);
  return mimeType || '';
};

const readFile = async (filePath: string): Promise<Buffer> => {
  const fileBuffer = await fsReadFile(filePath);
  return fileBuffer;
};

const readFileToBase64 = async (filePath: string): Promise<string> => {
  const fileBuffer = await readFile(filePath);

  const fileBase64 = fileBuffer.toString('base64');
  return `data:${getMimeType(filePath)};base64,${fileBase64}`;
};

export { saveFile, readFile, readFileToBase64 };
