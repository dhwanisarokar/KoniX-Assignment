const mongoose = require("mongoose");

const app = require("./app.js");
const config = require("./config/config.js");

mongoose
  .connect(config.mongoose.url)
  .then(() => {
    console.log(`Connected to DB`);
    app.listen(config.port, () => {
      console.log(`Server listing to Port: ${config.port}`);
    });
  })
  .catch((err) => console.log(`Error in Connecting to DB: ${err}`));
