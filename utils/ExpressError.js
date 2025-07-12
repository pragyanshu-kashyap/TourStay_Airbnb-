//we will make our own error class to handle errors, just for practise purposes
class ExpressError extends Error { // this line defines a custom error class that extends the built-in Error class in JavaScript.
    // The ExpressError class will be used to create error objects that can be passed to the next() function in Express.js.

  // this class will be used to create error objects with a message and a status code.
  constructor( statusCode,message) {
    super(); // this line calls the constructor of the parent class (Error) to initialize the error object.
    // super() is necessary to ensure that the error object is properly initialized with the message and stack trace.
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ExpressError;