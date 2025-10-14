export function isCuitValid(cuit) {
  if (typeof cuit !== 'string' || cuit.length !== 11 || !/^\d+$/.test(cuit)) {
    return false;
  }

  const multipliers = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  const cuitArray = cuit.split('').map(Number);
  
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += cuitArray[i] * multipliers[i];
  }

  const remainder = sum % 11;
  let verifierDigit = 11 - remainder;

  if (verifierDigit === 11) {
    verifierDigit = 0;
  } else if (verifierDigit === 10) {
    return false;
  }
  
  return cuitArray[10] === verifierDigit;
}