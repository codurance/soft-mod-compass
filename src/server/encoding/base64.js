const encode = (string) => {
  return Buffer.from(string).toString('base64');
};

module.exports = encode;
