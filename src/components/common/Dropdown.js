import React from "react";

export const Dropdown = ({ items, shouldDropdownShrink }) => (
	<div className={`dropdown-list-wrapper ${shouldDropdownShrink ? "shrink" : ""}`}>
		<div className="arrow-up" />
		<ul className="dropdown-list">
			{items.map((item, i) => {
				const Icon = item["icon"];
				return (
					<li key={i} className="dropdown-item" onClick={item.onClick}>
						<span>{item.title}</span>
						<Icon className="dropdown-item-icon" />
					</li>
				);
			})}
		</ul>
	</div>
);
