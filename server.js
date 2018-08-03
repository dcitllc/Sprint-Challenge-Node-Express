const express = require("express");
const actionRoutes = require("./routes/actionRoutes");
const projectRoutes = require("./routes/projectRoutes");
const morgan = require("morgan");

const server = express();
//! Always go after express and before any routes.
server.use(express.json());

//* ROUTES
server.use("/actions", actionRoutes);
server.use("/projects", projectRoutes);

server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(8000, () => console.log("\n === API Running... ===\n"));
