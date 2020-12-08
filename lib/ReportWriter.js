const fs = require('fs');

class ReportWriter {
  constructor(message) { this.message = message; }

  static write = (message) => {
    fs.appendFile('log.txt', message + "\n",  {'flag':'a'}, (err) => {
      if (err) throw err;
      console.log('entry was logged as expected');
    });
  }

