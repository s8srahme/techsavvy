import React from "react";
import { iconCaution } from "assets";

export const NotFound = ({ location, history }) => (
	<article className="not-found-content">
		<div className="not-found-img-wrapper">
			<img src={iconCaution} alt="not found graphic" id="not-found-graphic" />
		</div>
		<div className="not-found-message-wrapper">
			<hgroup>
				<h1>404 error</h1>
				{/* <h3>No match for <code>{location.pathname}</code></h3> */}
				<h3 className="not-found-message">Oops! This page does not exist.</h3>
			</hgroup>
			<button className="btn" onClick={() => history.goBack()}>
				go back
			</button>
		</div>
	</article>
);
