const express = require("express");
const recipes = require("./model/recipes.json");
const cors = require("cors");
const bodyParser = require("body-parser");

// App config
const app = express();
app.use(cors());
app.use(bodyParser());
const port = process.env.PORT || 8001;

// Middlewares

// DB config

// API Endpoints
app.post("/", (req, res) => {
  const discarded = req.body.discarded;
  console.log(discarded);
  res.json(recipes.filter(({ id }) => !discarded.includes(id)).slice(0, 10));
});

// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));
