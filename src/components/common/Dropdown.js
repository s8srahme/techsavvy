import React from "react";
import { Loader } from "..";

export const Dropdown = ({ items, shouldDropdownShrink }) => (
	<div className={`dropdown-list-wrapper ${shouldDropdownShrink ? "shrink" : ""}`}>
		<div className="arrow-up" />
		<ul className="dropdown-list">
			{items.map((item, i) => {
				const Icon = item["icon"];
				return (
					<li
						key={i}
						className="dropdown-item"
						{...!item.isLoadingSelf && !item.isLoadingSibling && { onClick: item.onClick }}
					>
						<span>{item.title}</span>
						{item.isLoadingSelf ? <Loader shouldClearButton small /> : <Icon className="dropdown-item-icon" />}
					</li>
				);
			})}
		</ul>
	</div>
);
