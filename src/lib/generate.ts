export const generateUUID = (length: number = 10): string => {
  const char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "";
  for (let i = 0; i <= length; i++) {
    result += char[Math.floor(Math.random() * char.length)];
  }
  return result;
};
