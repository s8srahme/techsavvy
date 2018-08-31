import React from "react";

export const Loader = ({ shouldClearButton, small }) => (
	<div className={`loader-wrapper ${shouldClearButton && "clear"}`}>
		<div className={`loader ${small && "small"}`} />
	</div>
);
