import React from "react";

export const Loader = ({ shouldClearButton, inverse, small }) => (
	<div className={`loader-wrapper ${shouldClearButton ? "clear" : ""}`}>
		<div className={`loader ${small ? "small" : ""} ${inverse ? "inverse" : ""}`} />
	</div>
);
