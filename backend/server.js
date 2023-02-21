const app = require("./app");
const startDatabase = require("./utils/db");

const port = process.env.PORT || 8080;

const startServer = () => {
  startDatabase();
  app.listen(port, () => {
    console.log(`server is running on port:${port}`);
  });
};

startServer();
