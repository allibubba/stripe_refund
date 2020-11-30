const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');

const defaultErrorHandler = (error) => {
  console.log('💰: ---------------------------------------');
  console.error(error, error.stack);
  console.log('💰: ---------------------------------------');
  // log to file
  process.exit(1);
};

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const klaviyo = new Klaviyo({
  apiKey: process.env.KLAVIYO_API_KEY,
});


const main = () =>
  new Promise((resolve, reject) => {
    let rowCount = 0;

    // INPUT FILE
    const file = path.resolve(__dirname, `input-file.csv`);
  });

// RUN PROGRAM MAIN
main()
  .then((results) => {
    console.log('finished i guess ... ', results);
  })
  .catch(defaultErrorHandler);
