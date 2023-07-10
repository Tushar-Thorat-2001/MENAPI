const { contacts } = require("../constants");

const erroHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case contacts.VALIDTION_ERROR:
      res.json({
        title: "VALIDTION_ERROR",
        message: err.message,
        stackTrace: err.stack,
      });

      break;
    case contacts.NOT_FOUND:
      res.json({
        title: "NotFoound",
        message: err.message,
        stackTrace: err.stack,
      });
    case contacts.UNAUTHORITZED:
      res.json({
        title: "UNAUTHORITZED",
        message: err.message,
        stackTrace: err.stack,
      });
    case contacts.SERVER_ERROR:
      res.json({
        title: "server_error",
        message: err.message,
        stackTrace: err.stack,
      });

    default:
      console.log("NO_ERROR ALL GOOD");
      break;
  }
};

module.exports = erroHandler;
