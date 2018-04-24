import React, { Component } from "react";
import { NewsList } from "../components";
import { slugify } from "../utils";

export class BlogListScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount = () => {
		window.scrollTo(0, 0);
	};

	render = () => {
		const posts = [
			{
				thumbnail: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg",
				title: "City Lights in New York",
				subtitle: "The city that never sleeps.",
				description:
					"New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.",
				timestamp: "6 mins ago",
				category: "tech",
				author: "Andy Tran",
				slug: slugify("City Lights in New York")
			},
			{
				thumbnail:
					"https://i.amz.mshcdn.com/-Tvnq3kgcjiELKDZkWWGBnWIwLo=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F728735%2Fd76babe8-b91a-45e0-aa46-2a3028ef2a94.jpg",
				title: "iPhone X's notch probably won't get smaller or disappear anytime soon",
				subtitle: "Still can't bring yourself to accept the iPhone X's notch? ",
				description:
					"Sorry, buddy, but I have some bad news for you: Apple's unlikely to make any major changes to controversial cutout in the display, despite new rumors suggesting future iPhones might come with a smaller notch or remove it entirely.",
				timestamp: "20 hours ago",
				category: "tech",
				author: "RAYMOND WONG",
				slug: slugify("iPhone X's notch probably won't get smaller or disappear anytime soon")
			},
			{
				thumbnail:
					"https://i.amz.mshcdn.com/e7CcQOUVZ11v8ZxZMpY7b5utGiY=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F722728%2F18aba02e-ce15-4af5-a077-6946cbd81fb4.jpg",
				title: "iPhone 9? iPhone XI? Apple's next big thing should just drop the numbers",
				subtitle:
					"No more numbers, no more upgrade treadmills: When Apple launches its new lineup of iPhones, there's only one thing it should call them, and that thing is 'iPhone.'",
				description:
					"We already have a MacBook, an iPad, and an iPod Touch, but Apple continues to develop its most popular device through a series of numbered, annual updates.",
				timestamp: "6 mins ago",
				category: "tech",
				author: "DAMON BERES",
				slug: slugify("iPhone 9? iPhone XI? Apple's next big thing should just drop the numbers")
			},
			{
				thumbnail:
					"https://i.amz.mshcdn.com/-TXIaACwILA8VZlEfIDEIe08ZcA=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F729118%2F290cc6a2-12bc-4198-b153-ba9651eeb095.jpeg",
				title: "This Samsung smart TV deal is HUGE — both in screen size and discount",
				subtitle:
					"All products featured here are selected by Mashable's commerce team and meet our rigorous standards for awesomeness.",
				description:
					"Smart TVs were selling like hotcakes (seriously, who eats hotcakes?) during Black Friday, Cyber Monday, and Super Bowl sales. Except all of those hot TV events are over — does that mean that if you missed those, you're stuck paying full price until Thanksgiving?",
				timestamp: "6 mins ago",
				category: "tech",
				author: "LEAH STODART",
				slug: slugify("This Samsung smart TV deal is HUGE — both in screen size and discount")
			}
		];
		return (
			<main className="wrapper">
				<NewsList data={posts} style={{ padding: "11.4rem 0 6.4rem" }} />
			</main>
		);
	};
}
