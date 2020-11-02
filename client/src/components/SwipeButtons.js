import React, { useContext } from "react";
import "./SwipeButtons.css";

import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";
import Context from "../context";

const SwipeButtons = ({ swipe }) => {
  const { handleButtonClick } = useContext(Context);
  return (
    <div id="swipeButtons">
      <IconButton
        className="swipeButton"
        id="swipeButton_left"
        onClick={() => handleButtonClick("left")}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButton" id="swipeButton_star">
        <StarRateIcon fontSize="large" />
      </IconButton>
      <IconButton
        className="swipeButton"
        id="swipeButton_right"
        onClick={() => handleButtonClick("right")}
      >
        <FavoriteIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default SwipeButtons;
