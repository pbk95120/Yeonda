export const getRandomCode = (length: number) => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  let time = new Date(new Date().getTime() + 5 * 60000).toISOString().slice(0, 19).replace('T', ' ');
  return [code, time];
};
