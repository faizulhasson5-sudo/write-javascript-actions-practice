#!/usr/bin/env node

// Simple action that fetches dad jokes using fetch API (Node.js 18+)
async function getJoke() {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Writing JavaScript action GitHub Skills exercise.'
    }
  });
  const data = await response.json();
  return data.joke;
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
