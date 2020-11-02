import React from "react";
import "./App.css";

import Header from "./components/Header";
import TinderCards from "./components/TinderCards";
import Ingredients from "./components/Ingredients";
import SwipeButtons from "./components/SwipeButtons";
import SingleRecipe from "./components/SingleRecipe";

const App = () => (
  <div className="App">
    <Header />
    <div className="container pink-background">
      <TinderCards />
      <Ingredients />
      <SwipeButtons />
      <SingleRecipe />
    </div>
  </div>
);

export default App;
