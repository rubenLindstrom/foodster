const express = require("express");
const recipes = require("./model/recipes.json");
const cors = require("cors");
const bodyParser = require("body-parser");

// App config
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8001;

// Middlewares

// DB config

// API Endpoints
app.post("/", (req, res) => {
  const { discarded, whitelist, blacklist } = req.body;
  res.json(
    recipes
      .filter(
        ({ id, ingredients }) =>
          (!discarded || !discarded.includes(id)) &&
          (!blacklist ||
            !blacklist.length ||
            !ingredients.some((i) => blacklist.includes(i))) &&
          (!whitelist ||
            !whitelist.length ||
            ingredients.some((i) => whitelist.includes(i)))
      )
      .slice(0, 10)
  );
});

// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));
