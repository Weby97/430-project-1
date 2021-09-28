const fs = require('fs'); // pull in the file system module

const lofiImage = fs.readFileSync(`${__dirname}/../client/lofi-image.png`);

const getLofiImage = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'image/png',
  });
  response.write(lofiImage);
  response.end();
};

module.exports = {
  getLofiImage,
};
