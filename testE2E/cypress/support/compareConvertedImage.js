const path = require('path');
const resemble = require('resemblejs');
const image1 = path.join(__dirname, '../support/images/compass.png');
const diffPath = path.join(__dirname, '../support/images/diff.png');
const pixelmatch = require('pixelmatch');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const img1 = PNG.sync.read(fs.readFileSync(image1));
const { width, height } = img1;
const diff = new PNG({ width, height });

async function compareConvertedImage(img) {
  const img2 = PNG.sync.read(fs.readFileSync(img));
  console.log('Image 1', img1.data);
  console.log('image passed in', img2.data);
  const result = pixelmatch(img1.data, img2.data, diff.data, 1240, 1754, {
    threshold: 0.1,
    includeAA: true,
  });
  console.log('Does result have pixel diff?', result);
  fs.writeFileSync(diffPath, PNG.sync.write(diff));
  return result;
}

module.exports = compareConvertedImage;
