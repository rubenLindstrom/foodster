import React, { useState, useContext, useEffect, useMemo } from "react";
import "./SingleRecipe.css";
import Context from "../context";
import { convertMinutesToTime } from "../util";

import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import PersonIcon from "@material-ui/icons/Person";

const SingleRecipe = () => {
	const [overlayOpen, setOverlayOpen] = useState(false);
	const { recipes, currentRecipe, bookmarks, handleBookmark } = useContext(
		Context
	);

	const randomizeUnit = () => {
		const suffix = ["ml", "l", "g", "dl", "st."];
		const number = Math.floor(Math.random() * 4) + 1;
		return `${number} ${suffix[Math.floor(Math.random() * suffix.length)]}`;
	};

	const units = useMemo(
		() =>
			Array.apply(
				null,
				Array(
					recipes?.find(({ id }) => id == currentRecipe)?.ingredients
						.length || 0
				)
			).map(randomizeUnit),
		[currentRecipe]
	);
	const servingSize = useMemo(() => Math.floor(Math.random() * 5) + 1, [
		currentRecipe
	]);

	useEffect(() => {
		if (currentRecipe) setTimeout(() => setOverlayOpen(true), 100);
	}, [currentRecipe]);

	useEffect(() => {
		console.log(units);
	}, [units]);

	const Bookmark = bookmarks.includes(currentRecipe)
		? BookmarkIcon
		: BookmarkBorderIcon;

	if (!currentRecipe) return null;

	const { imageURL, name, ingredients, steps, time } = recipes?.find(
		({ id }) => id == currentRecipe
	);

	return (
		<div
			id="singleRecipe"
			className={`pink-background${overlayOpen && " open"}`}
		>
			<div className="top-bar">
				<IconButton onClick={() => setOverlayOpen(false)}>
					<CloseIcon />
				</IconButton>
				<IconButton onClick={() => handleBookmark(currentRecipe)}>
					<Bookmark />
				</IconButton>
			</div>
			<div
				className="img-wrapper"
				style={{
					backgroundImage: `url(${imageURL})`
				}}
			></div>
			<div className="recipe-wrapper">
				<h2>{name}</h2>
				<p className="dish-info">
					<span role="img" aria-label="clock" className="clock-icon">
						&#128336;
					</span>{" "}
					{convertMinutesToTime(time)}
					<PersonIcon />
					{servingSize}
				</p>
				<br />

				<strong>Ingredients</strong>
				<ul>
					{ingredients.map((i, idx) => (
						<li key={i}>
							{units[idx]} {i}
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
