// import {
//   expect
// } from 'chai';

import chai, {expect} from 'chai';
import sinon from 'sinon';
import ReportWriter from '../../lib/ReportWriter';

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('ReportWriter', () => {
  let reportWriterInstance;

  context('success', () => {
    it('initializes', async () => {
      reportWriterInstance = new ReportWriter("test");
      expect(reportWriterInstance.message).to.equal("test");
    });

    it('writes', () => {
      let message = "never gonna give you up"
      reportWriterInstance = new ReportWriter(message)
      reportWriterInstance.write('0001');
      reportWriterInstance.end()
      expect(reportWriterInstance.message).to.equal(message);
    });
  });
});
