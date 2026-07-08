#!/usr/bin/env node

// Simple bundled action that fetches dad jokes using built-in https module
const https = require('https');
const { setOutput, setFailed } = require('@actions/core');

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
    setOutput('joke', joke);
  } catch (error) {
    setFailed(error.message);
  }
}

run();
