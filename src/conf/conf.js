const conf = {
  apiKey: String(import.meta.env.VITE_API_KEY),
};
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video
// console.log(process.env.VITE_API_KEY);
export default conf;
