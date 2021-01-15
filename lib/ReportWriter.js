const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');

class ReportWriter {
  constructor(message = null) {

    var outputFile = 'results.csv';
    var outputFilePath = path.resolve(__dirname, `../tmp/${outputFile}`);

    fs.unlink(outputFilePath, (err) => {
      if (err) throw err;
      console.log(`successfully deleted /tmp/${outputFile}`);
    });

    const stream = fs.createWriteStream( outputFilePath, { encoding: 'utf-8', flags: 'w+' } );
    stream.on('error', function(e) {
      console.error(e);
    });

    this.csvOutputStream = csv.format({ headers: true });
    this.csvOutputStream.pipe(stream).on('finish', function () {
      console.log('DONE WRITING TO FILE.');
    });

  }

  formatMessage = (str) => {
    if( str == "object" && typeof str.metadata == "object" ){
      str.metadata = JSON.stringify(str.metadata);
    }
    return str
  }

  write = (str) => {
    this.csvOutputStream.write(this.formatMessage(str));
  }

  end = () => {
    this.csvOutputStream.end();
  }
}
module.exports = new ReportWriter();
