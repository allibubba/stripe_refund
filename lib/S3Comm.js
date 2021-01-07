const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const s3Bucket = 'test_bucket'
const Params = {
  Bucket: s3Bucket,
  Key: 'refund_log.txt'
}

class S3Comm {
  constructor(message) { 
    this.message = { Body: message, ...Params }
  }
  static write = (message) => {
    s3.putObject(writeData, function (err, data) {
      if (err) {
        throw new LogWriteError(err);
      } else {
        console.log(message.toString());
      }
    });
  }
}
