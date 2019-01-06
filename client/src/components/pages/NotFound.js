import React from "react";
import { iconCaution } from "assets";

export const NotFound = ({ location, history, hasError }) => (
	<article className="not-found-content">
		<div className="not-found-img-wrapper">
			<img src={iconCaution} alt="Not-found graphic" id="not-found-graphic" />
		</div>
		<div className="not-found-message-wrapper">
			<hgroup>
				<h1>404 error</h1>
				<h3 className="not-found-message">{`Oops! ${
					hasError ? "Something went wrong." : "This page does not exist."
				}`}</h3>
				{/* <h4>No match for <code>{location.pathname}</code></h4> */}
			</hgroup>
			<button className="btn" onClick={() => (hasError ? history.push("/") : history.goBack())}>
				{`go ${hasError ? "home" : "back"}`}
			</button>
		</div>
	</article>
);
