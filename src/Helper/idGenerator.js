const options = {
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
};

const generateRandomNumber = (size) => {
  return Math.floor(Math.random() * size);
};

export const idGenerator = () => {
  let id = "";

  for (let i = 0; i < 6; i++) {
    if (i < 2) {
      const number = generateRandomNumber(options.letters.length);
      id += options.letters[number];
    } else {
      const number = generateRandomNumber(options.numbers.length);
      id += options.numbers[number];
    }
  }
  return id;
};
