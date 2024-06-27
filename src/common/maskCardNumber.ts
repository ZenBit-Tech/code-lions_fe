const numberOfDigits = {
  ZERO: 0,
  FOUR: 4,
};

function maskCardNumber(cardNumber: string | undefined): string {
  if (!cardNumber) {
    return '';
  }

  const lastFourDigits = cardNumber.slice(-numberOfDigits.FOUR);

  const maskedDigits = cardNumber
    .slice(0, -numberOfDigits.FOUR)
    .replace(/\d/g, '*');

  const maskedNumber = `${maskedDigits} ${lastFourDigits}`;

  return maskedNumber;
}

export default maskCardNumber;
