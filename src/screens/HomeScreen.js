import React, { Component } from "react";
import { bgImgRegentStreet, iconRedux, iconSmartphone, iconAnalytics } from "../assets";
import { Twitter, Facebook, Instagram, Linkedin, Github, Airplay, Users, ZoomIn, Box, Copy } from "react-feather";
import { NewsList } from "../components";
import { slugify } from "../utils";

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slideCount: 0,
			translateValue: 0,
			offsetTop: 0
			// windowHeight: window.innerHeight,
			// windowWidth: window.innerWidth
		};
	}

	// _handleResize = e => {
	// 	this.setState({
	// 		windowHeight: window.innerHeight,
	// 		windowWidth: window.innerWidth
	// 	});
	// };

	componentDidMount = () => {
		// 	window.addEventListener("resize", this._handleResize);
	};

	componentWillUnmount = () => {
		// window.removeEventListener("resize", this._handleResize);
		window.scrollTo(0, 0);
	};

	render = () => {
		const news = [
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
				// {
				// 	thumbnail:
				// 		"https://i.amz.mshcdn.com/e7CcQOUVZ11v8ZxZMpY7b5utGiY=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F722728%2F18aba02e-ce15-4af5-a077-6946cbd81fb4.jpg",
				// 	title: "iPhone 9? iPhone XI? Apple's next big thing should just drop the numbers",
				// 	subtitle:
				// 		"No more numbers, no more upgrade treadmills: When Apple launches its new lineup of iPhones, there's only one thing it should call them, and that thing is 'iPhone.'",
				// 	description:
				// 		"We already have a MacBook, an iPad, and an iPod Touch, but Apple continues to develop its most popular device through a series of numbered, annual updates.",
				// 	timestamp: "6 mins ago",
				// 	category: "tech",
				// 	author: "DAMON BERES",
				// 	slug: slugify("iPhone 9? iPhone XI? Apple's next big thing should just drop the numbers")
				// }
			],
			socials = [
				{ name: Twitter, href: "" },
				{ name: Facebook, href: "" },
				{ name: Instagram, href: "" },
				{ name: Linkedin, href: "" },
				{ name: Github, href: "" }
			],
			team = [
				{
					thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
					title: "John Doe",
					subtitle: "project manager",
					socials: [{ name: Twitter, href: "" }, { name: Linkedin, href: "" }, { name: Github, href: "" }]
				},
				{
					thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
					title: "John Doe",
					subtitle: "project manager",
					socials: [{ name: Twitter, href: "" }, { name: Linkedin, href: "" }, { name: Github, href: "" }]
				},
				{
					thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
					title: "John Doe",
					subtitle: "project manager",
					socials: [{ name: Twitter, href: "" }, { name: Linkedin, href: "" }, { name: Github, href: "" }]
				},
				{
					thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
					title: "John Doe",
					subtitle: "project manager",
					socials: [{ name: Twitter, href: "" }, { name: Linkedin, href: "" }, { name: Github, href: "" }]
				},
				{
					thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
					title: "John Doe",
					subtitle: "project manager",
					socials: [{ name: Twitter, href: "" }, { name: Linkedin, href: "" }, { name: Github, href: "" }]
				},
				{
					thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
					title: "John Doe",
					subtitle: "project manager",
					socials: [{ name: Twitter, href: "" }, { name: Linkedin, href: "" }, { name: Github, href: "" }]
				}
			],
			clients = [
				{
					thumbnail: "https://png.icons8.com/color/1600/nodejs.png"
				},
				{
					thumbnail: "https://png.icons8.com/color/1600/nodejs.png"
				},
				{
					thumbnail: "https://png.icons8.com/color/1600/nodejs.png"
				},
				{
					thumbnail: "https://png.icons8.com/color/1600/nodejs.png"
				},
				{
					thumbnail: "https://png.icons8.com/color/1600/nodejs.png"
				}
				// {
				// 	thumbnail: "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png"
				// }
			],
			testimonials = [
				{
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ante erat, lobortis ut eleifend a, laoreet sollicitudin neque. Mauris quis enim massa. Integer iaculis id ligula in condimentum. Morbi commodo lectus sed consequat venenatis. Praesent non gravida orci, non vestibulum leo. Nullam at mauris ac lorem varius pellentesque at a orci.",
					author: "Andy Tran"
				},
				{
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ante erat, lobortis ut eleifend a, laoreet sollicitudin neque. Mauris quis enim massa. Integer iaculis id ligula in condimentum. Morbi commodo lectus sed consequat venenatis. Praesent non gravida orci, non vestibulum leo. Nullam at mauris ac lorem varius pellentesque at a orci.",
					author: "Andy Tran"
				},
				{
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ante erat, lobortis ut eleifend a, laoreet sollicitudin neque. Mauris quis enim massa. Integer iaculis id ligula in condimentum. Morbi commodo lectus sed consequat venenatis. Praesent non gravida orci, non vestibulum leo. Nullam at mauris ac lorem varius pellentesque at a orci.",
					author: "Andy Tran"
				},
				{
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ante erat, lobortis ut eleifend a, laoreet sollicitudin neque. Mauris quis enim massa. Integer iaculis id ligula in condimentum. Morbi commodo lectus sed consequat venenatis. Praesent non gravida orci, non vestibulum leo. Nullam at mauris ac lorem varius pellentesque at a orci.",
					author: "Andy Tran"
				}
			],
			features = [
				{
					name: Airplay,
					title: "fully responsive",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum orci quis gravida tincidunt. Curabitur id augue ornare, mattis metus quis, feugiat elit."
				},
				{
					name: ZoomIn,
					title: "seo friendly",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum orci quis gravida tincidunt. Curabitur id augue ornare, mattis metus quis, feugiat elit."
				},
				{
					name: Copy,
					title: "drag & drop",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum orci quis gravida tincidunt. Curabitur id augue ornare, mattis metus quis, feugiat elit."
				},
				{
					name: Airplay,
					title: "retina display",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum orci quis gravida tincidunt. Curabitur id augue ornare, mattis metus quis, feugiat elit."
				},
				{
					name: Box,
					title: "out of the box",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum orci quis gravida tincidunt. Curabitur id augue ornare, mattis metus quis, feugiat elit."
				},
				{
					name: Users,
					title: "24/7 support",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum orci quis gravida tincidunt. Curabitur id augue ornare, mattis metus quis, feugiat elit."
				}
			],
			about = [
				{
					icon: iconAnalytics,
					title: "Explore interesting ideas and perspectives",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum orci quis gravida tincidunt. Curabitur id augue ornare, mattis metus quis, feugiat elit.",
					routeName: ""
				},
				{
					icon: iconSmartphone,
					title: "Share your stories on-the-go",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum orci quis gravida tincidunt. Curabitur id augue ornare, mattis metus quis, feugiat elit.",
					routeName: ""
				}
			],
			works = [
				{
					thumbnail: "http://gdj.graphicdesignjunction.com/wp-content/uploads/2017/07/app-ui-ux-design-4.jpg",
					title: "Surfer Paradise",
					category: "mobile app",
					routeName: ""
				},
				{
					thumbnail: "http://gdj.graphicdesignjunction.com/wp-content/uploads/2017/07/app-ui-ux-design-4.jpg",
					title: "Surfer Paradise",
					category: "mobile app",
					routeName: ""
				},
				{
					thumbnail: "http://gdj.graphicdesignjunction.com/wp-content/uploads/2017/07/app-ui-ux-design-4.jpg",
					title: "Surfer Paradise",
					category: "mobile app",
					routeName: ""
				},
				{
					thumbnail: "http://gdj.graphicdesignjunction.com/wp-content/uploads/2017/07/app-ui-ux-design-4.jpg",
					title: "Surfer Paradise",
					category: "mobile app",
					routeName: ""
				},
				{
					thumbnail: "http://gdj.graphicdesignjunction.com/wp-content/uploads/2017/07/app-ui-ux-design-4.jpg",
					title: "Surfer Paradise",
					category: "mobile app",
					routeName: ""
				}
			];
		return (
			<main
				className="wrapper"
				// ref={n => (this.node = n)}
			>
				{this._renderLandingContent()}
				{this._renderContactContent(socials)}
				<NewsList data={news} />
				{this._renderFeatureContent(features)}
				{this._renderAboutContent(about)}
				{this._renderWorksContent(works)}
				{this._renderTeamContent(team)}
				{this._renderClientContent(testimonials, clients)}
			</main>
		);
	};

	_renderLandingContent = () => (
		<figure
			className="landing-content"
			style={{
				backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)),
			url(${bgImgRegentStreet})`,
				paddingTop: `${this.state.offsetTop > 0 ? "8.2rem" : "5rem"}`
			}}
		>
			<div className="landing-img-wrapper">
				{/* <img src="https://dummyimage.com/250x250/ffffff/333333.png" alt="landing graphic" id="landing-graphic" /> */}
				<img src={iconRedux} alt="landing graphic" id="landing-graphic" />
			</div>
			<div className="landing-message-wrapper">
				<figcaption className="landing-message">I Make Creative, Clever, React Apps. Simple.</figcaption>
				<a className="btn inverse">let's rock</a>
			</div>
		</figure>
	);

	_renderContactContent = socials => (
		<div className="contact-content">
			<section className="container">
				<header className="row contact-heading-wrapper">
					<h1>Do not miss a thing</h1>
				</header>
				<form action="" name="contact-form" id="contact-form" className="row">
					<fieldset>
						<legend>Be the first to find out about our news, updates and announcements.</legend>
						{/* <label for="name">Email</label> */}
						<div className="contact-inputs-wrapper">
							<input
								type="email"
								// name="email"
								id="email"
								className="txt-input"
								placeholder="Your email"
								autoComplete="off"
								required
							/>
							<input type="submit" className="btn" value="Subscribe" />
						</div>
						{/* <span>Please enter a valid address.</span> */}
					</fieldset>
				</form>
				<footer className="row">
					<span>Stay connected</span>
					<div className="contact-socials-wrapper">
						{socials.map((social, index) => {
							const Icon = social["name"];
							return (
								<a key={index} className="contact-social">
									<Icon
										className="contact-icon"
										// color={"red"}
										// size={48}
										// onClick={() => {
										// 	alert("it's working");
										// }}
									/>
								</a>
							);
						})}
					</div>
				</footer>
			</section>
		</div>
	);

	_renderAboutContent = data =>
		data.map((item, index) => (
			<div key={index} className="about-content">
				<div className="container">
					<section className="row">
						<article className="column about-info-wrapper">
							<h2>{item.title}</h2>
							<p>{item.description}</p>
							<div className="btn-wrapper">
								<a className="btn">learn more</a>
							</div>
						</article>
						<figure className="column about-img-wrapper">
							<img src={item.icon} alt="about infographic" className="about-graphic" />
						</figure>
					</section>
				</div>
			</div>
		));

	_handleClientRowsAndCols = data => {
		let rows = [];

		for (let rowKey = 0; rowKey < data.length; rowKey = rowKey + 5) {
			let cols = data.slice(rowKey, rowKey + 5);
			rows.push(
				<article key={rowKey} className="row client-cards-wrapper">
					{cols.map((col, colKey) => {
						return (
							<figure key={colKey} className="column client-card">
								<div className="client-card-img-wrapper">
									<img src={col.thumbnail} alt="card infographic" className="client-thumbnail" />
								</div>
							</figure>
						);
					})}
				</article>
			);
		}
		return rows;
	};

	_handleOptionChange = (e, arr) => {
		e.preventDefault();
		const [slideCount, i] = [this.state.slideCount, e.target.value];

		if (i === slideCount) return;
		else this.setState({ translateValue: -((i / arr.length) * 100), slideCount: i });
	};

	_renderClientContent = (testimonials, clients) => (
		<div className="client-content">
			<div className="container">
				<header className="row client-heading-wrapper">
					<h1 className="separator">happy clients</h1>
				</header>
				<section className="row client-testimonial">
					<article className="slider column">
						<div className="slider-control-group">
							{testimonials.map((obj, i) => {
								// console.log(this.state.slideCount === i);
								return (
									<input
										key={i}
										className="radio-btn"
										type="radio"
										value={i}
										// name="slider"
										// title="slide1"
										checked={this.state.slideCount === i}
										onChange={e => this._handleOptionChange(e, testimonials)}
									/>
								);
							})}
						</div>
						<div
							className="slider-contents-wrapper"
							style={{
								transform: `translateX(${this.state.translateValue}%)`,
								width: `${100 * testimonials.length}%`
							}}
						>
							{testimonials.map((obj, index) => (
								<div key={index} className="slider-contents">
									<p className="slider-txt">{obj.description}</p>
									<span className="slider-caption">{obj.author}</span>
								</div>
							))}
						</div>
					</article>
				</section>
			</div>
			<section className="container">{this._handleClientRowsAndCols(clients).map(row => row)}</section>
		</div>
	);

	_renderWorksContent = works => (
		<div className="work-content">
			<div className="container">
				<header className="row work-heading-wrapper">
					<h1 className="separator">latest works</h1>
				</header>
				{this._handleWorkRowsAndCols(works).map(row => row)}
			</div>
		</div>
	);

	_handleWorkRowsAndCols = data => {
		let rows = [];
		for (let rowKey = 0, index = 0; index < data.length; rowKey++, index = index + 3) {
			let cols = data.slice(index, index + 3);
			rows.push(
				<section key={rowKey} className="row work-cards-wrapper">
					{cols.map((col, colKey) => (
						<figure key={colKey} className="column work-card">
							<div className="work-card-img-wrapper">
								<img src={col.thumbnail} alt="card infographic" className="work-thumbnail" />
							</div>
							<figcaption className="work-card-info-wrapper">
								<span>{col.category}</span>
								<h3>{col.title}</h3>
							</figcaption>
						</figure>
					))}
				</section>
			);
		}
		return rows;
	};

	_handleTeamRowsAndCols = data => {
		let rows = [];
		for (let rowKey = 0; rowKey < data.length; rowKey = rowKey + 4) {
			let cols = data.slice(rowKey, rowKey + 4);
			rows.push(
				<article key={rowKey} className="row">
					{cols.map((col, colKey) => {
						return (
							<figure key={colKey} className="column team-card">
								<div className="team-card-img-wrapper">
									<img src={col.thumbnail} alt="card infographic" className="team-thumbnail" />
									<div className="team-card-img-overlay" />
								</div>
								<figcaption className="team-card-info-wrapper">
									<hgroup>
										<h2>{col.title}</h2>
										<span>{col.subtitle}</span>
									</hgroup>
									{/* <p>{col.description}</p> */}
									<Socials data={col.socials} />
								</figcaption>
							</figure>
						);
					})}
				</article>
			);
		}
		return rows;
	};

	_renderTeamContent = data => (
		<div className="team-content">
			<div className="container">
				<header className="row team-heading-wrapper">
					<h1 className="separator">meet the team</h1>
				</header>
				<section className="team-cards-wrapper">{this._handleTeamRowsAndCols(data).map(row => row)}</section>
			</div>
		</div>
	);

	_renderFeatureContent = data => (
		<div className="feature-content">
			<div className="container">
				<header className="row feature-heading-wrapper">
					<h1 className="separator">Exclusive Features</h1>
				</header>
				{this._handleFeatureRowsAndCols(data).map(row => row)}
			</div>
		</div>
	);

	_handleFeatureRowsAndCols = data => {
		let rows = [];
		for (let rowKey = 0; rowKey < data.length; rowKey = rowKey + 3) {
			let cols = data.slice(rowKey, rowKey + 3);
			rows.push(
				<section key={rowKey} className="row feature-cards-wrapper">
					{cols.map((col, colKey) => {
						const Icon = col["name"];
						return (
							<figure key={colKey} className="column feature-card">
								<span className="feature-icon-wrapper">
									<Icon className="feature-icon" />
								</span>
								<figcaption className="feature-card-info-wrapper">
									<h3>{col.title}</h3>
									<p>{col.description}</p>
								</figcaption>
							</figure>
						);
					})}
				</section>
			);
		}
		return rows;
	};
}

const Socials = ({ data }) => (
	<div className="team-socials-wrapper">
		{data.map((social, index) => {
			const Icon = social["name"];
			return (
				<a key={index} className="team-social">
					<Icon className="team-icon" />
				</a>
			);
		})}
	</div>
);
