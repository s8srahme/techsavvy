import React, { Component } from "react";
import { NewsView } from "../components";
import { CommentListScreen } from ".";
import { slugify } from "../utils";

export class BlogViewScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount = () => {
		// window.scrollTo(0, 0);
	};

	render = () => {
		const post = {
				featured_image_url:
					"https://i.amz.mshcdn.com/-Tvnq3kgcjiELKDZkWWGBnWIwLo=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F728735%2Fd76babe8-b91a-45e0-aa46-2a3028ef2a94.jpg",
				title: "iPhone X's notch probably won't get smaller or disappear anytime soon",
				// subtitle: "Still can't bring yourself to accept the iPhone X's notch?",
				description: `<p>Still can't bring yourself to accept the <a href="https://mashable.com/category/iphone-x/">iPhone X's</a> notch?</p>
			<p>Sorry, buddy, but I have some bad news for you: Apple's unlikely to make any major changes to controversial cutout in the display, despite new rumors suggesting future iPhones might come with a smaller notch or remove it entirely.</p>
			<p>Korean website ET News, a popular source that often publishes industry and supply chain-related information relating to Apple or Samsung, has a <a href="http://english.etnews.com/20180307200001" target="_blank"> new report</a> claiming this year's new iPhones will all come with a smaller notch and even thinner side bezels around the display.</p>
			<p>The report corroborates <a href="https://mashable.com/2017/11/13/iphone-2018-lcd-screen/">previous rumors</a> that Apple will introduce three new iPhones: a more affordable 6-inch LCD-based iPhone, a 5.8-inch successor to the iPhone X with upgraded internal components, and a gigantic version of that iPhone, with a 6.5-inch display.</p>
			<p>All three are expected to come with notches even though 5.8 and 6.5-inch models will be the only two with OLED screens.</p>
			<p>ET News also says 2019's iPhones might come with screens without any notches at all. They'll still reportedly come with Face ID, but no notch.</p>
			<p>Everything about this report strikes me as wishful thinking.</p>
			<p>I'm all for a smaller notch or no notch at all so we can all get phones with true "all-screen" displays, but it feels too soon for Apple to make any sweeping changes to the existing iPhone X design.</p>
			<p>The iPhone X's notch exists for good reasons:<br />
			1) it houses the many parts that make up the sophisticated TrueDepth Camera system and<br/>
			2) it's a bold and <a href="https://mashable.com/2017/10/31/iphone-x-notch-different/">immediately recognizable</a> design choice that distinguishes it from competing Android phones.</p>
			<p>Apple's bound to figure out how to shrink the TrueDepth Camera system or combine the various parts into a fewer components, which could result in a smaller notch, but I have my doubts it'll happen that soon.</p>
			<p>Take a look at what's actually housed in the iPhone X's notch below. It's a lot of stuff. These parts aren't easily shrinkable.</p>
			<img src="https://i.amz.mshcdn.com/gH7DKYVvZ-3HN0rqKnv2yzku89c=/fit-in/1200x9600/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F728769%2Fe755206f-821a-463a-8a5e-705bb8620c9c.png" alt="The iPhone X's notch isn't houses many the selfie camera, various sensors for Face ID, and the earpiece." />
			<p>Now, think about how long it took for Apple to go from iPhones with bezels above and below the screens to just the notch. Yeah, it took ten years. And in that time, did the iPhone's top bezel, which again contains many important sensors, the FaceTime camera, and earpiece, shrink in any noticeable way? Nope. It was still a bulbous "forehead".</p>`,
				timestamp: "20 hours ago",
				category: "tech",
				slug: slugify("iPhone X's notch probably won't get smaller or disappear anytime soon"),
				author_name: "RAYMOND WONG",
				author_image_url: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg"
			},
			// eslint-disable-next-line no-unused-vars
			slug = this.props.slug;
		return (
			<main>
				<NewsView data={post} />
				<CommentListScreen />
			</main>
		);
	};
}
