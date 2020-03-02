class ErrorValidation extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 422;
  }
}

module.exports = ErrorValidation;
