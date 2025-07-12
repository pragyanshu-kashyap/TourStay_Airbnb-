module.exports=(fn) => {
  // This function takes another function (fn) as an argument and returns a new function that wraps the original function.
  return (req, res, next) => {
    // The returned function takes three parameters: req, res, and next.
    fn(req, res, next).catch(next);
    // It calls the original function (fn) with the provided parameters and catches any errors that occur during its execution.
    // If an error occurs, it passes the error to the next middleware in the Express.js stack using next().
  };
}