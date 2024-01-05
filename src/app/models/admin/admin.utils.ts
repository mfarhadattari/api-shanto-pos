// ------------------>> Generate User Name <<-------------
export const generateUsername = (email: string) => {
  const username = email.split('@')[0];
  const fourDigit = Math.round(Math.random() * 10000);

  return `${username}${fourDigit}`;
};
