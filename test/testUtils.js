const range1toN = (n) => {
  const range = [...Array(n + 1).keys()];
  range.shift();
  return range;
};

module.exports = { range1toN };
