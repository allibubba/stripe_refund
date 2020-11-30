const { Transform } = require('stream');

class BatchUpdateStream extends Transform {
  constructor(args = {}) {
    super({ objectMode: true, ...(args || {}) });
    this.batchSize = (args.batchSize) ? args.batchSize : 100;
    this.updateAction = (args.updateAction) ? args.updateAction : null;
    this.batch = [];
  }

  _transform(record, encoding, callback) {
    this.batch.push(record);
    if (this.shouldSaveBatch) {
      this.processRecords()
        .then(() => callback());
      return;
    }
    callback();
  }

  _flush(callback) {
    if (this.batch.length) {
      this.processRecords()
        .then(() => callback());
        return;
    }
    callback();
  }

  pushRecords(records) {
    records.forEach(r => this.push(r));
  }

  get shouldSaveBatch() {
    return this.batch.length >= this.batchSize;
  }

  async processRecords() {
    for (let index = 0; index < this.batch.length; index++) {
      let record = this.batch[index];
      console.log(`processing records ${index + 1}/${this.batch.length} ${record.klaviyo_id}`);
      /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
       CAN BULK/BATCH PRE-PROCESS HERE.
      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
     if(this.updateAction && typeof this.updateAction === 'function') record = await this.updateAction(record);
    }
    const records = await this.saveBatch();
    this.pushRecords(records);
    return records;
  }

  async saveBatch() {
    const records = this.batch;
    this.batch = [];
    for (let index = 0; index < records.length; index++) {
      const record = records[index];
      console.log(`SAVING records ${index + 1}/${records.length} ${record.klaviyo_id}`);
      /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
        CAN BULK/BATCH PROCESS HERE.
      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    }
    return new Promise(resolve => {
      setTimeout( () => resolve(records), 100);
    });
  }

}

module.exports = BatchUpdateStream;