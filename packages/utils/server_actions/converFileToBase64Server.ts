const convertFileToBase64Server = async (file: File) => {
  const fileArrayBuffer = await file.arrayBuffer();
  const fileBase64 = Buffer.from(fileArrayBuffer).toString('base64');
  return `data:${file.type};base64,${fileBase64}`;
};

export { convertFileToBase64Server };
