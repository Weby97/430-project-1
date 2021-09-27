const { shuffle, random } = require('underscore');
const _ = require('underscore');

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type }); // send response headers
  response.write(content); // send content
  response.end(); // close connection
};

const respondJSONMeta = (request, response, status, type, stringResponse) => {
  // ALWAYS GIVE CREDIT - in your code comments and documentation
  // Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
  // Refactored to an arrow function by ACJ
  const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

  const headers = {
    'Content-Type': type,
    'Content-Length': getBinarySize(stringResponse),
  };

  response.writeHead(status, headers);
  response.end();
};

// 5 - this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here
const getRandomJokeJSON = (request, response, max = 1, acceptedTypes, httpMethod) => {
  // Grab from this list
  const jokes = [
    [
      'What do you call a very small valentine?',
      'A valen-tiny!!!',
    ],
    [
      'What did the dog say when he rubbed his tail on the sandpaper?',
      'Ruff, Ruff!!!',
    ],
    [
      "Why don't sharks like to eat clowns?",
      'Because they taste funny!!!',
    ],
    [
      'What did the boy cat say to the girl cat?',
      "You're Purr-fect!!!",
    ],
    [
      "What is a frog's favorite outdoor sport?",
      'Fly Fishing!!!',
    ],
    [
      'I hate jokes about German sausages.',
      'Theyre the wurst...',
    ],
    [
      'Did you hear about the cheese factory that exploded in France?',
      'There was nothing left but de Brie...',
    ],
    [
      'Our wedding was so beautiful ',
      'Even the cake was in tiers...',
    ],
    [
      'Is this pool safe for diving?',
      'It deep ends...',
    ],
    [
      'Dad, can you put my shoes on?',
      'I dont think theyll fit me...',
    ],
    [
      'Can February March?',
      'No, but April May!!!',
    ],
    [
      'What lies at the bottom of the ocean and twitches?',
      'A nervous wreck...',
    ],
    [
      'Im reading a book on the history of glue.',
      'I just cant seem to put it down...',
    ],
    [
      'Dad, can you put the cat out?',
      'I didnt know it was on fire...',
    ],
    [
      'What did the ocean say to the sailboat?',
      'Nothing, it just waved...',
    ],
    [
      'What do you get when you cross a snowman with a vampire?',
      'Frostbite!!!',
    ],
  ];

  // The max amount of jokes in the list (16)
  const jokesMax = jokes.length;

  let max2 = Number(max); // cast `max` to a Number
  max2 = !max2 ? 1 : max2;
  max2 = max2 > jokesMax ? jokesMax : max2;
  max2 = max2 < 1 ? 1 : max2; // if `max` is less than 1 default it to 1

  const randomJokes = [];
  const shuffledJokes = _.shuffle(jokes);

  for (let i = 0; i < max2; i++) {
    // Pick a random joke
    // const number = Math.floor(Math.random() * jokesMax);

    // Set the values equal to the joke at said number
    const q = shuffledJokes[i][0];
    const a = shuffledJokes[i][1];

    // Setting up the JSON format...
    const randomJoke = {
      q,
      a,
    };

    randomJokes.push({ q: randomJoke.q, a: randomJoke.a });
  }

  if (acceptedTypes.includes('text/xml')) {
    let responseXML = '';
    if (max2 > 1) {
      responseXML += `
      <jokes>
        `;
      randomJokes.forEach((e) => {
        responseXML
        += `<joke>
            <q>${e.q}</q>
            <a>${e.a}</a>
          </joke>

        `;
      });
      responseXML += '</jokes>';
    } else {
      responseXML += `
      <joke>
        <q>${randomJokes[0].q}</q>
        <a>${randomJokes[0].a}</a>
      </joke>
        `;
    }

    if (httpMethod === 'HEAD') {
      return respondJSONMeta(request, response, 200, 'text/xml', responseXML);
    }
    // send back the XML to the request
    return respond(request, response, responseXML, 'text/xml');
  }

  const jokeString = JSON.stringify(randomJokes);

  if (httpMethod === 'HEAD') {
    return respondJSONMeta(request, response, 200, 'application/json', jokeString);
  }
  // send back the JSON to the request
  return respond(request, response, jokeString, 'application/json');
};

const getRandomJokeResponse = (request, response, params, acceptedTypes, httpMethod) => {
  getRandomJokeJSON(request, response, params.limit, acceptedTypes, httpMethod);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  getRandomJokeResponse, respondJSONMeta, notFoundMeta,
};
