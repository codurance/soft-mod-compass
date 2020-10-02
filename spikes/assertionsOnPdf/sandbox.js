const fs = require('fs');
const path = require('path');
const pdfPath = inLocalDir('./compass-report.pdf');
const pdfData = new Uint8Array(fs.readFileSync(pdfPath));

function inLocalDir(relativeFilePath) {
  return path.join(__dirname, relativeFilePath);
}

function pdf2picSandbox() {
  function convertPage(pageNumber) {
    const { fromPath } = require('pdf2pic');

    const options = {
      density: 1000,
      saveFilename: `compassReportPage_${pageNumber}`,
      savePath: inLocalDir('./images'),
      format: 'png',
      width: 1240,
      height: 1754,
    };
    const storeAsImage = fromPath(pdfPath, options);

    storeAsImage(pageNumber).then((resolve) => {
      console.log('Page 1 is now converted as image');

      return resolve;
    });
  }

  // convertPage(1);
  // convertPage(3);
  // convertPage(9);
  convertPage(10);
  // convertPage(8);
}

function pdfJsSandbox() {
  function NodeCanvasFactory() {}
  NodeCanvasFactory.prototype = {
    create: function NodeCanvasFactory_create(width, height) {
      assert(width > 0 && height > 0, 'Invalid canvas size');
      var canvas = Canvas.createCanvas(width, height);
      var context = canvas.getContext('2d');
      return {
        canvas: canvas,
        context: context,
      };
    },

    reset: function NodeCanvasFactory_reset(canvasAndContext, width, height) {
      assert(canvasAndContext.canvas, 'Canvas is not specified');
      assert(width > 0 && height > 0, 'Invalid canvas size');
      canvasAndContext.canvas.width = width;
      canvasAndContext.canvas.height = height;
    },

    destroy: function NodeCanvasFactory_destroy(canvasAndContext) {
      assert(canvasAndContext.canvas, 'Canvas is not specified');

      // Zeroing the width and height cause Firefox to release graphics
      // resources immediately, which can greatly reduce memory consumption.
      canvasAndContext.canvas.width = 0;
      canvasAndContext.canvas.height = 0;
      canvasAndContext.canvas = null;
      canvasAndContext.context = null;
    },
  };

  const pdfJs = require('pdfjs-dist/es5/build/pdf');

  var Canvas = require('canvas');
  var assert = require('assert').strict;

  // Loading file from file system into typed array.

  // Load the PDF file.
  var loadingTask = pdfJs.getDocument({ data: pdfData });

  loadingTask.promise
    .then(function (pdfDocument) {
      console.log('# PDF document loaded.');

      // Get the first page.
      pdfDocument.getPage(1).then((page) => {
        var viewport = page.getViewport({ scale: 1.0 });
        var canvasFactory = new NodeCanvasFactory();
        var canvasAndContext = canvasFactory.create(
          viewport.width,
          viewport.height
        );
        var renderContext = {
          canvasContext: canvasAndContext.context,
          viewport: viewport,
          canvasFactory: canvasFactory,
        };

        page.render(renderContext).promise.then(() => {
          const image = canvasAndContext.canvas.toBuffer();
          fs.writeFileSync('output.png', image);
        });
      });
    })
    .catch(function (reason) {
      console.log(reason);
    });
}

// pdfLibJsSandbox();
// pdfJsSandbox();
pdf2picSandbox();
