const qs = require('querystring');
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const response = await fetch(`http://api.unsplash.com/search/photos?query=code`,
    {
        method: 'GET',
        headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_API_TOKEN}`,
        },
    }
  ).then((response) => response.json())
  .catch((error) => console.log(error));

  const firstResult = response.results[0];

  return {
    statusCode: 200,
    headers: {
        'Content-Type': 'text/html',
    },
    // display image 
    body: `<img
        src="${firstResult.urls.regular}"
        alt="${firstResult.alt_description}"
    /><p>Come on you need to code more!</p>`,
  };
};