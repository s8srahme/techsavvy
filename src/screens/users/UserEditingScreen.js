import React, { Component } from "react";
import { UserEditing } from "../../components";
import { bgImgEmptyStreet } from "../../assets/images";

export class UserEditingScreen extends Component {
	componentWillMount = () => {
		// console.log(this.props.match);
		window.scrollTo(0, 0);
	};

	render = () => {
		const // userId = this.props.match.params.id,
		user = {
			_id: "5b091dc6c1b03443f86693fa",
			name: "Dan Abramov",
			username: "gaearon",
			featured_image_url: bgImgEmptyStreet,
			bio:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare enim sem, id ornare nulla sodales ut. Praesent facilisis, est nec vehicula lacinia, ex ex rhoncus diam, quis condimentum mauris lectus quis turpis. Integer quis nisl eu justo mollis vulputate ut et dolor.",
			admin: false,
			location: "London, UK",
			image_url: "https://avatars1.githubusercontent.com/u/810438?s=460&v=4",
			created_at: "2018-06-10T09:58:29.000Z",
			updated_at: "2018-06-10T09:58:29.000Z",
			email: "dan.abramov@me.com",
			followers: ["5b166d7475f00d26a70a9bbb"],
			following: ["5b166b564a03b6266f0ca5b6"],
			articles: ["5b0fd31d79dd9bf39f57cf43"]
		};

		// console.log(userId);
		return <UserEditing data={user} />;
	};
}
