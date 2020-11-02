const express = require("express");
const recipes = require("./model/recipes.json");
const cors = require("cors");

// App config
const app = express();
app.use(cors());
const port = process.env.PORT || 8001;

// Middlewares

// DB config

// API Endpoints
app.get("/", (req, res) => {
  res.json(recipes.slice(0, 10));
});

// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));
