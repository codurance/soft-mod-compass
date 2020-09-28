const { toMatchImageSnapshot } = require('jest-image-snapshot');
const fs = require('fs');

expect.extend({ toMatchImageSnapshot });

describe('Image Regression', function () {
  it('should match the candidate image', () => {
    const image = fs.readFileSync('sandbox/expected.png');
    expect(image).toMatchImageSnapshot({
      failureThreshold: 0.1,
      failureThresholdType: 'percent',
    });
  });
});
