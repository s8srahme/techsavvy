import React, { Component } from "react";
import { bgImgCorinneKutz } from "../assets";
import { LazyLoad } from "../components";
import { CombinedContextConsumer } from "utils";

export class AboutScreen extends Component {
	componentWillMount = () => {
		window.scrollTo(0, 0);
	};

	render = () => (
		<CombinedContextConsumer>
			{({ preferredLocale, onChangeLanguage, langs }) => {
				// console.log(preferredLocale);
				return (
					<div className="about-content">
						<div className="container">
							<section className="row">
								<div className="column">
									<LazyLoad
										figure
										className="about-img-wrapper"
										overlayClassName="push"
										style={{
											backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0.1)),
			url("${bgImgCorinneKutz}")`
										}}
										src={bgImgCorinneKutz}
										background="darken-light"
									/>
								</div>
								<article className={"column about-info-wrapper"}>
									<div>
										<h1 className="separator">about techsavvy</h1>
										<p>
											Techsavvy is where you may wanna come if you like to read a story or share your insights on any
											topic ranging between business, startups, culture, technology, politics, and life learning. Think
											of it as a free and open platform, where anyone can publish content with an easy to use editor,
											follow your favourite writers, interact with them through clapping on their articles, and even
											leave meaningful responses.
											<br />
											Not really a unique project? Of course, it isn't. I, aka <b>NanoSoldier7</b>, developed it as a
											pet project while I was trying to find a sure and fun way to learn today’s software tech and
											better understand my motivation towards it. Not only have I enjoyed making it, I figured that the
											effort behind it would come in handy at building stronger professional relationships using modern
											development stacks, such as MERN.
											<br />
											There are more exciting features coming up soon. So stay in touch.
										</p>
									</div>
								</article>
							</section>
						</div>
					</div>
				);
			}}
		</CombinedContextConsumer>
	);
}
