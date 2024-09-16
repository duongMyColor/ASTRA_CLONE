import { RAFile } from '@repo/types/general';
import CryptoJS from 'crypto-js';

const convertFileToBase64 = (file: { rawFile: Blob }) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file.rawFile);
  });

const convertReadableStreamToBase64 = async (body: ReadableStream) => {
  let response = new Response(body);
  let arrayBuffer = await response.arrayBuffer();
  let uint8Array = new Uint8Array(arrayBuffer);

  let binaryString = '';
  uint8Array.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });
  let base64String = btoa(binaryString);
  return `data:image/png;base64,${base64String}`;
};

/**
 * Generate filename with the current date.
 * @param originalFileName filename with extension. Eg: 'lion.jpg'
 * @returns filename with the current date. Eg: '20240124_122254_lion.jpg'
 */
const generateFileName = (originalFileName: string) => {
  const date = new Date();
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}_${hour}${minute}${second}_${originalFileName}`;
};

/**
 * Convert multiple  ReactAdmin based original pictures to base64
 * @param pictures original pictures
 * @returns base64 pictures
 */
const convertRAFiles = async (pictures: RAFile[], isRaw = false) => {
  if (isRaw) {
    return pictures.map((picture) => {
      console.log(':::picture', picture);

      return {
        src: picture.rawFile,
        title: generateFileName(picture.title),
      };
    });
  }

  const newPictures = pictures.filter((p) => p.rawFile instanceof File);
  const formerPictures = pictures.filter((p) => !(p.rawFile instanceof File));

  const base64Pictures = await Promise.all(
    newPictures.map(convertFileToBase64)
  );

  const uploadedPictures = [
    ...base64Pictures.map((dataUrl, index) => ({
      src: dataUrl,
      title: generateFileName(newPictures[index]?.title ?? ''), // Fix: Added nullish coalescing operator to provide a default value
    })),
    ...formerPictures,
  ];

  return uploadedPictures;
};

/**
 * Convert single ReactAdmin based original pictures to base64
 * @param pictures original pictures
 * @returns base64 pictures
 */
const convertRASingleFileWithBase64 = async (picture: RAFile) => {
  const convertedFiles = await convertRAFiles([picture]);

  return convertedFiles[0];
};

const convertRASingleFileWithRaw = async (picture: RAFile) => {
  const convertedFiles = await convertRAFiles([picture], true);
  console.log(':::convertedFiles', convertedFiles);

  return convertedFiles[0];
};

const convertBase64ToObjectUrl = (base64: string) => {
  const arr = base64.split(',');
  const mimeMatch = /:(.*?);/.exec(arr[0] as string);
  const mime = mimeMatch ? mimeMatch[1] : '';
  const bstr = atob(arr[1] as string);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const blob = new Blob([u8arr], { type: mime || '' });
  const url = URL.createObjectURL(blob);

  return url;
};

const CHUNK_SIZE = 1e6;

const encryptFile = (file: File, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const fileContent = event.target?.result as string;
      let encrypted = '';

      for (let i = 0; i < fileContent.length; i += CHUNK_SIZE) {
        const chunk = fileContent.slice(i, i + CHUNK_SIZE);
        encrypted += CryptoJS.AES.encrypt(chunk, password).toString();
      }

      resolve(encrypted);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsText(file);
  });
};

const decryptFile = (file: File | Blob, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const encryptedContent = event.target?.result as string;
      let decrypted = '';

      for (let i = 0; i < encryptedContent.length; i += CHUNK_SIZE) {
        const chunk = encryptedContent.slice(i, i + CHUNK_SIZE);
        const bytes = CryptoJS.AES.decrypt(chunk, password);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        decrypted += originalText;
      }
      resolve(decrypted);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsText(file);
  });
};

const extractFilename = (filePath: string) => {
  const parts = filePath.split('/');
  return parts.pop();
};
export {
  convertFileToBase64,
  generateFileName,
  convertRAFiles,
  convertRASingleFileWithBase64,
  convertBase64ToObjectUrl,
  convertRASingleFileWithRaw,
  encryptFile,
  decryptFile,
  extractFilename,
  convertReadableStreamToBase64,
};
