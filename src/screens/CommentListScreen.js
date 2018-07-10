import React, { Component } from "react";
import { CommentList } from "../components";

export class CommentListScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount = () => {
		// window.scrollTo(0, 0);
	};

	render = () => {
		const comments = [
			{
				thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ante erat, lobortis ut eleifend a, laoreet sollicitudin neque. Mauris quis enim massa. Integer iaculis id ligula in condimentum. Morbi commodo lectus sed consequat venenatis.",
				timestamp: "20 hours ago",
				author: "RAYMOND WONG"
			},
			{
				thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ante erat, lobortis ut eleifend a, laoreet sollicitudin neque. Mauris quis enim massa. Integer iaculis id ligula in condimentum. Morbi commodo lectus sed consequat venenatis.",
				timestamp: "20 hours ago",
				author: "RAYMOND WONG"
			}
		];
		return <CommentList comments={comments} />;
	};
}
