const { shuffle, random } = require('underscore');
const _ = require('underscore');

// Grab from this list for messages to give back
const messages = [
  [
    'Ana Amari',
    '\'Never stop fighting for what you believe in.\'',
  ],
  [
    'Schneider',
    'Don\'t stop before the miracle happens.',
  ],
  [
    'Anonymous1',
    'Growing up throws a lot at you. It\'s important to remember that you are not alone and there will always be resources available to you even in your darkest hour.',
  ],
  [
    'Andy Dwyer, Shoeshinist',
    "I have no idea what I'm doing, but I know I'm doing it well.",
  ],
  [
    'Amy Santiago, \'Brooklyn Nine-Nine\'',
    'You look happy. Let me guess. Your egg sandwich fell on the floor, and they gave it to you for free.',
  ],
  [
    'Yoda, \'Star Wars\'',
    'Do, or do not. There is no \'try\'.',
  ],
  [
    'Rafiki, \'Lion King\'',
    'Oh yes, the past can hurt. But you can either run from it or learn from it.',
  ],
  [
    'Adonis, \'Creed II\'',
    'If we didn\'t do what we loved, we wouldn\'t exist.',
  ],
  [
    'Shrek',
    'After a while, you learn to ignore the names people call you and just trust who you are.',
  ],
  [
    'Anonymous2',
    'Aim high, and hold your head up to the sky!',
  ],
];

const songs = [
  ['Writer\'s Block ~ Lofi Chillhop Mix Beats to chill/study/work/relax [Coffee Talk Game OST]', 'Toge Productions', 'https://youtu.be/_UgIUz2APOw'],
  ['lofi songs for slow days', 'the bootleg boy', 'https://youtu.be/AzV77KFsLn4'],
  ['(FREE) Lo-fi Type Beat - I Need a Girl', 'Lee', 'https://youtu.be/xVf4Zk8CBj0'],
  ['spring vibes • aesthetic music • lofi mix • chill beats to relax/study', 'Hua Studio', 'https://youtu.be/0BhaDPmEOic'],
];

const suggestions = [
  ['Derik', 'https://youtu.be/UakHkEFqiGs'],
  ['Sara', 'https://youtu.be/uDOunE1tJiA'],
];

// Grab from this list for the songs on the app!
const songlist = [];

// Give back the data
const respond = (request, response, content, type, statusCode) => {
  response.writeHead(statusCode, { 'Content-Type': type }); // send response headers
  response.write(content); // send content
  response.end(); // close connection
};

// Give back the headers for the data requested
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

// this will return a random message based off the amount requested
const getLofiMessage = (request, response, params, acceptedTypes, httpMethod) => {
  // this is where message struct was originally

  // The max amount of messages in the list (10)
  const msgMax = messages.length;

  let max2 = Number(params.limit); // cast `max` to a Number
  max2 = !max2 ? 1 : max2;
  max2 = max2 > msgMax ? msgMax : max2;
  max2 = max2 < 1 ? 1 : max2; // if `max` is less than 1 default it to 1

  const randomMessages = [];
  const shuffledMessages = _.shuffle(messages);

  for (let i = 0; i < max2; i++) {
    // Pick a random message
    // const number = Math.floor(Math.random() * msgMax);

    // Set the values equal to the joke at said number
    const name = shuffledMessages[i][0];
    const message = shuffledMessages[i][1];

    // Setting up the JSON format...
    const randomMessage = {
      name,
      message,
    };

    randomMessages.push({ name: randomMessage.name, message: randomMessage.message });
  }

  if (acceptedTypes.includes('text/xml')) {
    let responseXML = '';
    if (max2 > 1) {
      responseXML += `
      <messages>
        `;
      randomMessages.forEach((e) => {
        responseXML
        += `<quote>
            <message>${e.message}</message>
            <name>${e.name}</name>
          </quote>

        `;
      });
      responseXML += '</messages>';
    } else {
      responseXML += `
      <quote>
        <message>${randomMessages[0].message}</message>
        <name>${randomMessages[0].name}</name>
      </quote>
        `;
    }

    if (httpMethod === 'HEAD') {
      return respondJSONMeta(request, response, 200, 'text/xml', responseXML);
    }
    // send back the XML to the request
    return respond(request, response, responseXML, 'text/xml', 200);
  }

  const messageString = JSON.stringify(randomMessages);

  if (httpMethod === 'HEAD') {
    return respondJSONMeta(request, response, 200, 'application/json', messageString);
  }
  // send back the JSON to the request
  return respond(request, response, messageString, 'application/json', 200);
};

// this will return a certain amount of suggestions from our suggestion list
const getSuggestions = (request, response, params, acceptedTypes, httpMethod) => {
  // The max amount of messages in the list (10)
  const msgMax = suggestions.length;

  let max2 = Number(params.limit); // cast `max` to a Number
  max2 = !max2 ? 1 : max2;
  max2 = max2 > msgMax ? msgMax : max2;
  max2 = max2 < 1 ? 1 : max2; // if `max` is less than 1 default it to 0

  const randomMessages = [];
  const shuffledMessages = _.shuffle(suggestions);

  for (let i = 0; i < max2; i++) {
    // Pick a random message
    // Set the values equal to the joke at said number
    const name = shuffledMessages[i][0];
    const link = shuffledMessages[i][1];

    // Setting up the JSON format...
    const randomMessage = {
      name,
      link,
    };

    randomMessages.push({ name: randomMessage.name, link: randomMessage.link });
  }

  if (acceptedTypes.includes('text/xml')) {
    let responseXML = '';
    if (max2 > 1) {
      responseXML += `
      <suggestions>
        `;
      randomMessages.forEach((e) => {
        responseXML
        += `<suggestion>
            <link>${e.link}</link>
            <name>${e.name}</name>
          </suggestion>

        `;
      });
      responseXML += '</suggestions>';
    } else {
      responseXML += `
      <suggestion>
        <link>${randomMessages[0].link}</link>
        <name>${randomMessages[0].name}</name>
      </suggestion>
        `;
    }

    if (httpMethod === 'HEAD') {
      return respondJSONMeta(request, response, 200, 'text/xml', responseXML);
    }
    // send back the XML to the request
    return respond(request, response, responseXML, 'text/xml', 200);
  }

  const messageString = JSON.stringify(randomMessages);

  if (httpMethod === 'HEAD') {
    return respondJSONMeta(request, response, 200, 'application/json', messageString);
  }
  // send back the JSON to the request
  return respond(request, response, messageString, 'application/json', 200);
};

// return a 404 response header
const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

// this will add people and their message to the message array for show in the read section
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and message are both required',
  };

  if (!body.name || !body.message) {
    responseJSON.id = 'missingParams';
    return respond(request, response, JSON.stringify(responseJSON), 'application/json', 400);
  }

  let responseCode = 201;
  let existingName = false;
  let index;

  for (let i = 0; i < messages.length; i++) {
    if (messages[i][0] === body.name) {
      existingName = true;
      index = i;
    }
  }

  if (existingName) {
    responseCode = 204;
    messages[index][1] = body.message;
  } else {
    messages.push([body.name, body.message]);
  }

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully!';
    return respond(request, response, JSON.stringify(responseJSON), 'application/json', responseCode);
  }

  return respondJSONMeta(request, response, responseCode, 'application/json', JSON.stringify(responseJSON));
};

const addSuggestion = (request, response, body) => {
  const responseJSON = {
    message: 'Your Name and Song Link are both required',
  };

  if (!body.name || !body.link) {
    responseJSON.id = 'missingParams';
    return respond(request, response, JSON.stringify(responseJSON), 'application/json', 400);
  }

  let responseCode = 201;
  let existingName = false;
  let index;

  for (let i = 0; i < suggestions.length; i++) {
    if (suggestions[i][0] === body.name) {
      existingName = true;
      index = i;
    }
  }

  if (existingName) {
    responseCode = 204;
    suggestions[index][1] = body.link;
  } else {
    suggestions.push([body.name, body.link]);
  }

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully!';
    return respond(request, response, JSON.stringify(responseJSON), 'application/json', responseCode);
  }

  return respondJSONMeta(request, response, responseCode, 'application/json', JSON.stringify(responseJSON));
};

// This will return the array of users and their responses
const getUsers = (request, response) => respond(request, response, JSON.stringify(messages), 'application/json', 200);

const getSongs = (request, response) => respond(request, response, JSON.stringify(songs), 'application/json', 200);

module.exports = {
  getLofiMessage,
  respondJSONMeta,
  notFoundMeta,
  addUser,
  getUsers,
  getSongs,
  addSuggestion,
  getSuggestions,
};
