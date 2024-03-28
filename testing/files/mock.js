const { rand } = require("./rand");

const doCalc = (num) => {
  const randValue = rand(num, 100); //110 | 150 | 200;
  const sum = num + 100;

  return {
    result: sum,
    randValue: randValue,
    valid: randValue - sum > 50 ? "valid" : "not-valid",
  };
};

module.exports = {
  doCalc,
};
