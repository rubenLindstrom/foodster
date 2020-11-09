import React, { useState, useContext, useEffect } from "react";
import "./SingleRecipe.css";
import Context from "../context";
import { convertMinutesToTime } from "../util";

import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import PersonIcon from "@material-ui/icons/Person";

const SingleRecipe = () => {
  const [bookmarked, setBookmarked] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const { recipes, currentRecipe } = useContext(Context);

  useEffect(() => {
    if (currentRecipe) setTimeout(() => setOverlayOpen(true), 100);
  }, [currentRecipe]);

  const Bookmark = bookmarked ? BookmarkIcon : BookmarkBorderIcon;
  if (!currentRecipe) return null;
  const { imageURL, name, ingredients, steps, time } = recipes.find(
    ({ id }) => id == currentRecipe
  );

  const randomizeUnit = () => {
    const units = ["ml", "l", "g", "dl", "st."];
    const number = Math.floor(Math.random() * 4) + 1;
    return `${number} ${units[Math.floor(Math.random() * units.length)]}`;
  };

  return (
    <div
      id="singleRecipe"
      className={`pink-background${overlayOpen && " open"}`}
    >
      <div className="top-bar">
        <IconButton onClick={() => setOverlayOpen(false)}>
          <CloseIcon />
        </IconButton>
        <IconButton onClick={() => setBookmarked((prevstate) => !prevstate)}>
          <Bookmark />
        </IconButton>
      </div>
      <div
        className="img-wrapper"
        style={{
          backgroundImage: `url(${imageURL})`,
        }}
      ></div>
      <div className="recipe-wrapper">
        <h2>{name}</h2>
        <p class="dish-info">
          <span role="img" aria-label="clock" class="clock-icon">
            &#128336;
          </span>{" "}
          {convertMinutesToTime(time)}
          <PersonIcon />
          {Math.floor(Math.random() * 5) + 1}
        </p>
        <br />

        <strong>Ingredients</strong>
        <ul>
          {ingredients.map((i) => (
            <li>
              {randomizeUnit()} {i}
            </li>
          ))}
        </ul>
        <br />
        <hr />
        <br />
        <ol>
          {steps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SingleRecipe;
