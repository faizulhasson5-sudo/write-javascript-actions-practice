#!/usr/bin/env node

// Simple action that fetches dad jokes using only built-in Node.js modules
const https = require('https');

function getJoke() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'icanhazdadjoke.com',
      path: '/',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Writing JavaScript action GitHub Skills exercise.'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const joke = JSON.parse(data).joke;
          resolve(joke);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  try {
    const joke = await getJoke();
    console.log(joke);
    // Set output using GitHub Actions environment file
    const fs = require('fs');
    const outputPath = process.env.GITHUB_OUTPUT;
    if (outputPath) {
      fs.appendFileSync(outputPath, `joke=${joke}\n`);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
