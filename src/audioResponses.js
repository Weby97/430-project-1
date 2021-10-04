// Credit to the list of songs here:
// https://youtu.be/_UgIUz2APOw - Writer's Block ~ Lofi Chillhop Mix Beats to chill/study/work/relax [Coffee Talk Game OST], Toge Productions
// https://youtu.be/AzV77KFsLn4 - lofi songs for slow days, the bootleg boy
// https://youtu.be/xVf4Zk8CBj0 - (FREE) Lo-fi Type Beat - I Need a Girl, Lee
// https://youtu.be/0BhaDPmEOic - spring vibes • aesthetic music • lofi mix • chill beats to relax/study - Hua Studio

const fs = require('fs'); // pull in the file system module

const writersBlock = fs.readFileSync(`${__dirname}/../client/writers-block.mp3`);
const slowDays = fs.readFileSync(`${__dirname}/../client/slow-days.mp3`);
const girl = fs.readFileSync(`${__dirname}/../client/need-a-girl.mp3`);
const springVibes = fs.readFileSync(`${__dirname}/../client/spring-vibes.mp3`);

const getWritersBlock = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'audio/mpeg',
  });
  response.write(writersBlock);
  response.end();
};

const getSlowDays = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'audio/mpeg',
  });
  response.write(slowDays);
  response.end();
};

const getGirl = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'audio/mpeg',
  });
  response.write(girl);
  response.end();
};

const getSpringVibes = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'audio/mpeg',
  });
  response.write(springVibes);
  response.end();
};

module.exports = {
  getWritersBlock, getSlowDays, getGirl, getSpringVibes,
};
