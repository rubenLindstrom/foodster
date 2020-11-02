import React, { useState, useMemo, useEffect } from "react";
import api from "./serivce";

const initialState = {
  recipes: null,
  blacklist: [],
  whitelist: [],
  discarded: [],
  currentRecipe: null,
};

const Context = React.createContext(initialState);

// To fix ingredients, maybe the state should keep track of current recipe --> change overlayOpen
export const ContextProvider = ({ children }) => {
  const [currentRecipe, setCurrentRecipe] = useState(
    initialState.currentRecipe
  );
  const [recipes, setRecipes] = useState(initialState.recipes);
  const [blacklist, setBlacklist] = useState(initialState.blacklist);
  const [whitelist, setWhitelist] = useState(initialState.whitelist);
  const [discarded, setDiscarded] = useState(initialState.discarded);
  const cardRefs = useMemo(
    () =>
      Array(recipes?.length || 0)
        .fill(0)
        .map(() => React.createRef()),
    [recipes]
  );

  useEffect(() => {
    api.getRecipes().then(setRecipes);
  }, []);

  useEffect(() => {
    if (recipes && discarded.length === recipes.length)
      api
        .getRecipes()
        .then((recipes) =>
          setRecipes((prevRecipes) => prevRecipes.concat(recipes))
        );
  }, [discarded]);

  const handleSwipe = (dir, id) =>
    (dir === "right" ? handleSwipeRight : handleSwipeLeft)(id);

  const handleSwipeRight = (id) => {
    setCurrentRecipe(id);
    setDiscarded((prevDiscarded) => [id, ...prevDiscarded]);
  };

  const handleSwipeLeft = (id) => {
    setDiscarded((prevDiscarded) => [id, ...prevDiscarded]);
  };

  const handleBlacklist = (i) => {
    if (blacklist.includes(i))
      setBlacklist((prevstate) => prevstate.filter((e) => e !== i));
    else setBlacklist((prevstate) => [i, ...prevstate]);
  };
  const handleWhitelist = (i) => {
    if (whitelist.includes(i))
      setWhitelist((prevstate) => prevstate.filter((e) => e !== i));
    else setWhitelist((prevstate) => [i, ...prevstate]);
  };

  const handleButtonClick = (dir) => {
    const cardsLeft = recipes.filter(
      (recipe) => !discarded.includes(recipe.id)
    );
    if (cardsLeft.length) {
      const toBeSwiped = cardsLeft[cardsLeft.length - 1].id;
      const index = recipes.findIndex(({ id }) => id === toBeSwiped);
      cardRefs[index].current.swipe(dir);
    }
  };

  return (
    <Context.Provider
      value={{
        currentRecipe,
        setCurrentRecipe,
        recipes,
        whitelist,
        blacklist,
        cardRefs,
        handleSwipe,
        handleBlacklist,
        handleWhitelist,
        handleButtonClick,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
