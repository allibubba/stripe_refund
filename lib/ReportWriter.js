const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');

class ReportWriter {
  constructor(message) {
    this.stream = csv.format({ headers: true });
    this.message = message;

    var outputFile = 'results.csv';
    var outoutPath = path.resolve(__dirname, `/tmp/${outputFile}`);
    var writeStream = fs.createWriteStream( outoutPath, { encoding: 'utf-8', flags: 'w+' } );
    writeStream.on('error', function(e) { console.error(e); });
    this.stream.pipe(writeStream).on('finish', function () {
      console.log('DONE WRITING TO FILE.');
    });
  }


  write = () => {
    this.stream.write(this.message);
  }

  end = () => {
    this.stream.end();
  }
}
module.exports = ReportWriter;
