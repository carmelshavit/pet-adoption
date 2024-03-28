const rand = (a, b) => {
  const value = Math.ceil(Math.random() * 100);
  return a + b + value;
};

module.exports = {
  rand,
};
