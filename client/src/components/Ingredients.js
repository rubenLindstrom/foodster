import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Ingredients.css";
import Context from "../context";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles({
	button: {
		padding: 4
	},
	buttonGroup: {
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0
	},
	icon: {
		fontSize: "1.75rem"
	},
	checkmarkIcon: {
		color: "#2ecc71"
	},
	crossIcon: {
		color: "#e74c3c"
	},
	card: {
		display: "flex",
		alignItems: "center",
		flex: 1,
		alignItems: "center",
		fontWeight: "bold",
		margin: "0 6px"
	},
	ingredient: {
		marginLeft: 6
	}
});

const Ingredients = () => {
	const {
		whitelist,
		blacklist,
		handleBlacklist,
		handleWhitelist,
		recipes,
		discarded
	} = useContext(Context);

	const classes = useStyles();
	const ingredients = recipes?.[discarded.length]?.ingredients;
	return (
		<div id="ingredients">
			{ingredients && (
				<div className="ingredients-inner">
					<ul>
						{ingredients.map((i) => {
							const PositiveIcon = whitelist.includes(i)
								? CheckCircleIcon
								: CheckCircleOutlineIcon;
							const NegativeIcon = blacklist.includes(i)
								? CancelIcon
								: HighlightOffIcon;
							return (
								<li key={i}>
									<Card className={classes.card}>
										<ButtonGroup
											className={classes.buttonGroup}
										>
											<Button
												className={classes.button}
												onClick={() =>
													handleWhitelist(i)
												}
											>
												<PositiveIcon
													fontSize="default"
													className={`${classes.icon} ${classes.checkmarkIcon}`}
												/>
											</Button>
											<Button
												className={classes.button}
												onClick={() =>
													handleBlacklist(i)
												}
											>
												<NegativeIcon
													fontSize="default"
													className={`${classes.icon} ${classes.crossIcon}`}
												/>
											</Button>
										</ButtonGroup>
										<p className={classes.ingredient}>
											{i}
										</p>
									</Card>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Ingredients;
