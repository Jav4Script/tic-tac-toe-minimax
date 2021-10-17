export default class ValidationError extends Error {
  public details: object = {};

  constructor(message = 'ValidationError') {
    super(message);
  }
}
