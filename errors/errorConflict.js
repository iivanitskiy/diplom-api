class ErrorConflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.body = { message };
  }
}

module.exports = ErrorConflict;
