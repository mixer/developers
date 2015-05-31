import express from "express";

exports.start = (port) => {
  let app = express();
  return app.listen(port);
}

