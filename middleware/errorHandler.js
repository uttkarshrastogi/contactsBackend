const { HTTP_STATUS_CODES } = require("../constant");

const errorHandler = (err, req, res, next) => {
  console.log(err)
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
      case HTTP_STATUS_CODES.BAD_REQUEST:
        console.log(statusCode)
        res.json({title:"validation failed", message: err.message, stackTrace: err.stack });
        break;
      case HTTP_STATUS_CODES.UNAUTHORIZED:
        res.json({title:"UNAUTHORIZED", message: err.message, stackTrace: err.stack });
        break;
      case HTTP_STATUS_CODES.FORBIDDEN:
        res.json({title:"FORBIDDEN", message: err.message, stackTrace: err.stack });
        break;
      case HTTP_STATUS_CODES.NOT_FOUND:
        res.json({title:"NOT FOUND", message: err.message, stackTrace: err.stack });
        break;
      case HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR:
        res.json({title:"INTERNAL SERVER ERROR", message: err.message, stackTrace: err.stack });
        break;
    
      default:
        break;
    }

  };
  
  module.exports = errorHandler;
  