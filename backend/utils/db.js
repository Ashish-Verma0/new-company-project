const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("database connected successfully");
});

mongoose.connection.on("end", () => {
  console.log("database not connected");
});

const startDatabase = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = startDatabase;
