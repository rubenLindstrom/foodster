import React, { useContext, useRef } from "react";
import "./TinderCards.css";
import { PacmanLoader } from "react-spinners";
import { convertMinutesToTime } from "../util";

import Context from "../context";
import TinderCard from "react-tinder-card";

const TinderCards = () => {
	const { recipes, handleSwipe, cardRefs, setCurrentRecipe } = useContext(
		Context
	);
	const clickTimeStamp = useRef(0);

	const reverseList = (arr) => {
		const newArr = arr.slice();
		newArr.reverse();
		return newArr;
	};

	const handleMouseDownOnCard = (e) => {
		console.log("Mouse down");
		clickTimeStamp.current = e.timeStamp;
	};
	const handleMouseUpOnCard = (id) => (e) => {
		console.log("Mouse up");
		if (e.timeStamp - clickTimeStamp.current < 500) setCurrentRecipe(id);
	};

	return (
		<div id="tinderCards">
			{recipes ? (
				<div className="tinderCards__cardContainer">
					{reverseList(recipes).map(
						({ name, imageURL, time, id }, idx) => (
							<TinderCard
								className="swipe"
								key={id}
								preventSwipe={["up", "down"]}
								onSwipe={(dir) => handleSwipe(dir, id)}
								ref={cardRefs[idx]}
							>
								<div
									// onMouseDown={handleMouseDownOnCard}
									// onMouseUp={handleMouseUpOnCard(id)}
									style={{
										backgroundImage: `url(${imageURL})`
									}}
									className="card"
								>
									<div className="bottom">
										<h3>{name}</h3>
										<p>
											<span role="img" aria-label="clock">
												&#128336;
											</span>{" "}
											{convertMinutesToTime(time)}
										</p>
									</div>
								</div>
							</TinderCard>
						)
					)}
				</div>
			) : (
				<PacmanLoader color="#ffff00" />
			)}
		</div>
	);
};

export default TinderCards;
