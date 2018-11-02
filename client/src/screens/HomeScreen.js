import React, { Component } from "react";
import { connect } from "react-redux";
import {
	bgImgJeshootsCom,
	// iconRedux,
	iconSmartphone,
	iconScript,
	iconGallery,
	iconPencil,
	iconApplication,
	iconTimeManagement,
	iconResponsive,
	iconSearch,
	iconPostbox,
	iconPictureDark
} from "../assets";
import {
	// Twitter,
	// Facebook,
	// Instagram,
	// Linkedin,
	// Github,
	Airplay,
	Users,
	ZoomIn,
	Box,
	Copy
} from "react-feather";
import { Loader, LazyLoad } from "../components";
import { ArticleListScreen, UserListScreen } from "screens";
import { ellipsizeTextBox } from "../utils";
import { CombinedContextConsumer } from "utils";
import actions from "redux/actions";

const // socials = [
	// 	{ name: Twitter, href: "https://twitter.com/" },
	// { name: Facebook, href: "https://www.facebook.com/" },
	// { name: Instagram, href: "https://www.instagram.com/" },
	// { name: Linkedin, href: "https://www.linkedin.com/" },
	// { name: Github, href: "https://github.com" }
	// ],
	// team = [
	// 	{
	// 		thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
	// 		title: "John Doe",
	// 		subtitle: "project manager",
	// 		socials: [{ name: Twitter, href: "" }, { name: Linkedin, href: "" }, { name: Github, href: "" }]
	// 	},
	// 	{
	// 		thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
	// 		title: "John Doe",
	// 		subtitle: "project manager",
	// 		socials: [{ name: Twitter, href: "" }, { name: Linkedin, href: "" }, { name: Github, href: "" }]
	// 	},
	// 	{
	// 		thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
	// 		title: "John Doe",
	// 		subtitle: "project manager",
	// 		socials: [{ name: Twitter, href: "" }, { name: Linkedin, href: "" }, { name: Github, href: "" }]
	// 	},
	// 	{
	// 		thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
	// 		title: "John Doe",
	// 		subtitle: "project manager",
	// 		socials: [{ name: Twitter, href: "" }, { name: Linkedin, href: "" }, { name: Github, href: "" }]
	// 	},
	// 	{
	// 		thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
	// 		title: "John Doe",
	// 		subtitle: "project manager",
	// 		socials: [{ name: Twitter, href: "" }, { name: Linkedin, href: "" }, { name: Github, href: "" }]
	// 	},
	// 	{
	// 		thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
	// 		title: "John Doe",
	// 		subtitle: "project manager",
	// 		socials: [{ name: Twitter, href: "" }, { name: Linkedin, href: "" }, { name: Github, href: "" }]
	// 	}
	// ],
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
				"Whatever your interest, you can always find fresh thinking and unique perspectives here. Also, the platform is ad free which encourages many avid readers who are tired of viewing constant ads. It also has a sleek, user friendly design, allowing writers to focus on publishing content and not worry about design/presentation.",
			author: "Daario Naharis"
		},
		{
			description:
				"It is an engaging platform where anybody can document their journey and grow an audience around the things they're passionate about.",
			author: "Oberyn Martell"
		},
		{
			description:
				"This is like a blogging platform that is great to revive your old posts or for gaining some traction if you are still a newbie.",
			author: "Jojen Reed"
		},
		{
			description:
				"If you aspire to be an influnecer, this is one of the places to develop your writing skills and learn how to tailor a message in story-telling.",
			author: "Myrcella Baratheon"
		}
	],
	features = [
		{
			name: Airplay,
			icon: iconResponsive,
			title: "fully responsive",
			description:
				"The website uses flexible grids and layouts to resize the content according to the size of the device that it is being viewed on."
		},
		{
			name: Copy,
			icon: iconPencil,
			title: "Unique Typography",
			description:
				"There is a particular font used to help viewers immediately identify the app, making it easier to more accurately express the service through typography."
		},
		{
			name: Airplay,
			icon: iconGallery,
			title: "Semi-Flat Design",
			description:
				"Not only is the flat design easier for users to comprehend, but it can also load more quickly on websites without complicated or overly-technical elements."
		},
		{
			name: Box,
			icon: iconTimeManagement,
			title: "Fast Loading",
			description:
				"The app ensures a fast and smooth experience for our site visitors and allow users to interact without reloading the page."
		},
		{
			name: Users,
			icon: iconApplication,
			title: "Progressive Web App",
			description:
				"The app comes with PWA features to bring the best of mobile sites and native apps to users. It is reliable, fast, and engaging. It originates from a secure origin and loads regardless of network state."
		},
		{
			name: ZoomIn,
			icon: iconSearch,
			title: "seo friendly",
			description:
				"By using the right keywords in specific website headers and text areas, the service tries to rank higher in popular engines, like Google, for gaining much sought after exposure."
		}
	];

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slideCount: 0,
			translateValue: 0,
			isNewsletterLoading: false,
			errorInputIndex: -1,
			newsletterEmail: "",
			windowHeight: window.innerHeight,
			windowWidth: window.innerWidth,
			hasExpandedSlide: false,
			shouldScrollWindow: false
			// isFetchingArticles: true,
			// isFetchingUsers: true
		};
		this.aboutRef = React.createRef();
		this.mounted = false;
	}

	componentDidUpdate = (prevProps, prevState, snapshot) => {
		// if (prevProps.isFetchingArticles && !this.props.isFetchingArticles)
		// 	this.setState({ isFetchingArticles: false }, this._handleScroll);
		// if (prevProps.isFetchingUsers && !this.props.isFetchingUsers)
		// 	this.setState({ isFetchingUsers: false }, this._handleScroll);
	};

	componentDidMount = () => {
		this.mounted = true;
		this._handleEllipsis(testimonials);
		if (Object.keys(this.props.homeArticles).length) this._scrollTo();
		else window.scrollTo(0, 0);

		window.addEventListener("resize", this._handleResize);
	};

	componentWillUnmount = () => {
		// const { isFetchingArticles, isFetchingUsers } = this.state;
		this.mounted = false;
		// if (isFetchingArticles || isFetchingUsers) {
		// 	clearTimeout(this._scrollTo);
		// }
		window.removeEventListener("resize", this._handleResize);
	};

	_scrollTo = () => {
		const { offsetTop, from } = this.props;
		if (from.length && from[0] === "/login" && offsetTop && offsetTop < this.instance.clientHeight)
			window.scrollTo(0, offsetTop);
	};

	// _handleScroll = () => {
	// 	const { isFetchingArticles, isFetchingUsers } = this.state;
	// 	// const offsetTop = this.instance.getBoundingClientRect().top * -1;
	// 	if (!isFetchingArticles && !isFetchingUsers) {
	// 		setTimeout(this._scrollTo, 500);
	// 	}
	// };

	_handleResize = e => {
		if (this.mounted)
			this.setState(
				(previousState, currentProps) => {
					return {
						windowHeight: window.innerHeight,
						windowWidth: window.innerWidth,
						hasExpandedSlide: previousState.windowWidth < window.innerWidth
					};
				},
				() => this._handleEllipsis(testimonials)
			);
	};

	render = () => {
		const about = [
			{
				icon: iconScript,
				title: "Engage in writing and reading intuitive topics",
				description:
					"There are so many writers, subjects and topics, that you can read and write about almost anything you want and learn something new every day.",
				button: {
					onClick: () => {
						const about = this.aboutRef.current;
						window.scrollTo({
							top: about.offsetTop - 50,
							left: 0,
							behavior: "smooth"
						});
					},
					title: "Keep reading"
				}
			},
			{
				icon: iconSmartphone,
				title: "Share, follow and comment on the go",
				description:
					"The mobile app shall offer instant access by a simple tap, allowing you to consume your content quickly and offering seamless experience.",
				button: {
					onClick: () => {},
					title: "Coming soon"
				}
			}
		];

		return (
			<div className="wrapper" ref={el => (this.instance = el)}>
				{this._renderLandingContent()}
				{/* {this._renderNewsletterContent(socials)} */}
				<ArticleListScreen
					hasHeaderButton={false}
					hasHeaderTabs={false}
					limit={4}
					onFetchMore={() => {
						this.props.history.push({
							pathname: "/blog"
						});
					}}
				/>
				{this._renderFeatureContent(features)}
				{this._renderAboutContent(about)}
				<UserListScreen />
				{/* {this._renderTeamContent(team)} */}
				{this._renderClientContent(testimonials, clients)}
			</div>
		);
	};

	_handleButtonClick = () => {
		window.scrollTo({
			top: this.state.windowHeight - 50,
			left: 0,
			behavior: "smooth"
		});
	};

	_renderLandingContent = () => (
		<CombinedContextConsumer>
			{context => {
				// console.log(context);
				return (
					<LazyLoad
						figure
						className={`landing-content ${context.offsetTop - 100 > 0 ? "shrink" : ""}`}
						style={{
							backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),
							url(${bgImgJeshootsCom})`
						}}
						src={bgImgJeshootsCom}
						background="dark"
					>
						<div className="container">
							<section className="row">
								<article className="landing-message-wrapper column">
									<figcaption className="landing-message">Open content publishing for all industries</figcaption>
									<span className="separator" />
									<h4>Document your insights and grow an audience around the things you are passionate about.</h4>
									<button className="btn" onClick={this._handleButtonClick}>
										Explore
									</button>
								</article>
							</section>
						</div>
					</LazyLoad>
				);
			}}
		</CombinedContextConsumer>
	);

	_handleFormSubmit = event => {
		event.preventDefault();
		// const { newsletterEmail } = this.state;

		this.setState(
			{ isNewsletterLoading: true }
			// , () => console.log(newsletterEmail)
		);
	};

	_renderNewsletterContent = socials => (
		<div className="newsletter-content">
			<section className="container">
				<div className="row">
					<figure>
						<LazyLoad
							src={iconPostbox}
							alt="Newsletter infographic"
							className="newsletter-graphic"
							wrapperClassName="newsletter-img-wrapper"
							background="light"
							defaultImage={iconPictureDark}
						/>
						<figcaption>Subscribe</figcaption>
					</figure>
				</div>
				<form
					name="newsletter-form"
					// id="newsletter-form"
					className="row"
					onSubmit={this._handleFormSubmit}
				>
					<fieldset>
						<legend>Sign up for our newsletter and get notified about the next update.</legend>
						<div className="newsletter-input-wrapper">
							<input
								type="email"
								name="email"
								// id="email"
								className="txt-input"
								placeholder="Put your email address here"
								autoComplete="off"
								required
								value={this.state.newsletterEmail}
								onChange={event => this.setState({ newsletterEmail: event.target.value })}
							/>
							{this.state.errorInputIndex === 0 && <span>Please enter a valid email address</span>}
						</div>
						<div className="newsletter-input-wrapper">
							{this.state.isNewsletterLoading ? <Loader /> : <input type="submit" className="btn" value="sign me up" />}
						</div>
					</fieldset>
				</form>
			</section>
		</div>
	);

	_renderAboutContent = data =>
		data.map((item, index) => (
			<div key={index} className="extended-feature-content" {...(index === 1 ? { ref: this.aboutRef } : {})}>
				<div className="container">
					<section className="row">
						<figure className="column extended-feature-img-wrapper">
							<LazyLoad
								src={item.icon}
								alt="Extended feature infographic"
								className="extended-feature-graphic"
								background={index % 2 !== 0 ? "light" : "darken-light"}
							/>
						</figure>
						<article className="column extended-feature-info-wrapper">
							<h1>{item.title}</h1>
							<p>{item.description}</p>
							<div className="btn-wrapper">
								<button className="btn" onClick={item.button.onClick}>
									{item.button.title}
								</button>
							</div>
						</article>
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
									<LazyLoad
										src={col.thumbnail}
										alt="Card infographic"
										className="client-thumbnail"
										background="light"
									/>
								</div>
							</figure>
						);
					})}
				</article>
			);
		}
		return rows;
	};

	_handleOptionChange = (e, length) => {
		// e.preventDefault();
		const [slideCount, i] = [this.state.slideCount, Number(e.target.value)];

		if (i === slideCount) return;
		else this.setState({ translateValue: -((i / length) * 100), slideCount: i });
	};

	_handleEllipsis = testimonials => {
		for (let index = 1; index <= testimonials.length; index++)
			ellipsizeTextBox("slider-txt-" + index, testimonials[index - 1].description, this.state.hasExpandedSlide);
	};

	_renderClientContent = (testimonials, clients) => (
		<div className="client-content">
			<div className="container">
				<header className="row client-heading-wrapper">
					{/* <h1 className="separator">happy clients</h1> */}
					<h1 className="separator">Happy Reviews</h1>
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
										onChange={e => this._handleOptionChange(e, testimonials.length)}
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
							{testimonials.map((obj, index) => {
								let description = obj.description;
								return (
									<div key={index} className="slider-contents">
										<p className="slider-txt" id={"slider-txt-" + (index + 1)}>
											{description}
										</p>
										<h4 className="slider-caption">{`\u2015 ${obj.author}`}</h4>
									</div>
								);
							})}
						</div>
					</article>
				</section>
			</div>
			{/* <section className="container">{this._handleClientRowsAndCols(clients).map(row => row)}</section> */}
		</div>
	);

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
									<LazyLoad src={col.thumbnail} alt="Card infographic" className="team-thumbnail" />
									<div className="team-card-img-overlay" />
								</div>
								<figcaption className="team-card-info-wrapper">
									<hgroup>
										<h2>{col.title}</h2>
										<h4>{col.subtitle}</h4>
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
						// const Icon = col["name"];
						return (
							<figure key={colKey} className="column feature-card">
								{/* <span className="feature-icon-wrapper"> */}
								{/* <Icon className="feature-icon" /> */}
								<LazyLoad
									src={col.icon}
									alt="Feature infographic"
									className="feature-icon"
									wrapperClassName="feature-icon-wrapper"
									background="light"
								/>
								{/* </span> */}
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
				<a key={index} className="team-social" href={social.href} target="_blank" rel="noopener noreferrer">
					<Icon className="team-icon" />
				</a>
			);
		})}
	</div>
);

const mapStateToProps = ({ articles, users, history }) => {
		return {
			isFetchingArticles: articles.isFetchingArticles,
			articles: articles.articles,
			userArticles: articles.userArticles,
			homeArticles: articles.homeArticles,

			isFetchingUsers: users.isLoadingUsers,

			isPushingHistory: history.isPushingHistory,
			offsetTop: history.offsetTop,
			from: history.from
		};
	},
	mapDispatchToProps = dispatch => {
		return {
			pushHistory: actions.history.pushHistory
		};
	};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);
