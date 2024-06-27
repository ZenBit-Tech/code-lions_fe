const numberOfWords = {
  ONE: 1,
  TWO: 2,
};

function getInitials(input: string) {
  const words = input.split(' ');

  if (words.length === numberOfWords.ONE) {
    const firstLetter = words[0][0].toUpperCase();

    return firstLetter + firstLetter;
  } else {
    const firstWordInitial = words[0][0].toUpperCase();
    const secondWordInitial = words[1][0].toUpperCase();

    return firstWordInitial + secondWordInitial;
  }
}

export default getInitials;
