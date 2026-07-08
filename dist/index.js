#!/usr/bin/env node

// Minimal bundled action that fetches dad jokes
const https = require('https');
const core = require('@actions/core');

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
    core.setOutput('joke', joke);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
