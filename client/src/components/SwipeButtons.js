import React, { useContext } from "react";
import "./SwipeButtons.css";

import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";
import Context from "../context";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const SwipeButtons = ({ swipe }) => {
	const {
		handleButtonClick,
		bookmarks,
		handleBookmark,
		recipes,
		discarded
	} = useContext(Context);

	const Bookmark = bookmarks.includes(recipes?.[discarded.length]?.id)
		? BookmarkIcon
		: BookmarkBorderIcon;

	return (
		<div id="swipeButtons">
			<IconButton
				className="swipeButton"
				id="swipeButton_left"
				onClick={() => handleButtonClick("left")}
			>
				<CloseIcon fontSize="large" />
			</IconButton>
			<IconButton
				className="swipeButton"
				id="swipeButton_star"
				onClick={() => handleBookmark(recipes?.[discarded.length]?.id)}
			>
				<Bookmark fontSize="large" />
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
