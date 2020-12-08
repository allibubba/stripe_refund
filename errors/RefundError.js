class CoreError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class StripeCommError extends CoreError {
  constructor(id, error) {
    super(`Comm error sending ${id}, rueslts in foreign error ${error.type}.`);
    this.data = { id, error };
  }
}

class LogWriteError extends CoreError {
  constructor(error) {
    super(`Unable to write to log ${error}.`);
  }
}

module.exports =  StripeCommError
