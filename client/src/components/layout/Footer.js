import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Twitter, Facebook, Instagram, Linkedin, Github, Heart, Check } from "react-feather";
import { GA, CombinedContextConsumer } from "utils";
import { Modal } from "components";

const socials = [
		{ name: Twitter, href: "https://twitter.com/" },
		{ name: Facebook, href: "https://www.facebook.com/" },
		{ name: Instagram, href: "https://www.instagram.com/" },
		{ name: Linkedin, href: "https://www.linkedin.com/" },
		{ name: Github, href: "https://github.com" }
	],
	links = [
		{
			name: "blog",
			href: "/blog"
		},
		{
			name: "about",
			href: "/about"
		},
		{
			name: "contact",
			href: "/contact"
		},
		{
			name: "license",
			href: "/license"
		},
		{
			name: "privacy_policy",
			href: "/privacy"
		},
		{
			name: "language",
			onClick: null
		}
	],
	codes = ["en", "bn"];

const LanguagePicker = ({ showModal, onClose }) => {
	return (
		<CombinedContextConsumer>
			{({ preferredLocale, onChangeLanguage, langs }) => {
				// console.log(preferredLocale);
				return (
					<Modal showModal={showModal} onClose={onClose}>
						<div className="language-picker-content">
							<section className="container">
								<header className="row language-picker-heading-wrapper">
									<h2>{langs[preferredLocale].footer.picker.title}</h2>
								</header>
								<ul className="row language-picker-list">
									{codes.map((code, index) => (
										<li
											key={index}
											onClick={() => {
												onChangeLanguage({ code });
												onClose();
											}}
											className="language-picker-item"
										>
											<h3 className={code === preferredLocale ? "active" : ""}>
												{langs[preferredLocale].footer.picker.langs[code]}
											</h3>
											{code === preferredLocale && <Check className="language-picker-item-icon" />}
										</li>
									))}
								</ul>
							</section>
						</div>
					</Modal>
				);
			}}
		</CombinedContextConsumer>
	);
};

class Footer extends Component {
	state = {
		isModalOpen: false
	};

	_handleSocialClick = (event, index) => {
		// event.preventDefault();
		GA.trackEvent(index);
	};

	_handleModalClickIn = () => {
		this.setState({
			isModalOpen: true
		});
	};

	_handleModalClickOut = () => {
		this.setState({
			isModalOpen: false
		});
	};

	render = () => {
		let { location } = this.props;
		return (
			<CombinedContextConsumer>
				{({ context, preferredLocale, langs }) => (
					<div className="footer">
						<div className="container">
							<section className="row">
								<article className="column _55">
									<h2>{langs[preferredLocale].footer.title}</h2>
									<p>{langs[preferredLocale].footer.description}</p>
									<span>
										&copy; {langs[preferredLocale].footer.copyright[0]} <Heart className="footer-icon" />{" "}
										{langs[preferredLocale].footer.copyright[1]} <i>{langs[preferredLocale].footer.copyright[2]}</i>
									</span>
								</article>
								<article className="column _20">
									<ul>
										{links.map((link, index) => {
											let props = {
												onClick: e => {
													if (!link.href) {
														this._handleModalClickIn();
														e.preventDefault();
													} else if (location.pathname === link.href) e.preventDefault();
												}
											};
											return (
												<li key={index}>
													<Link to={{ pathname: link.href }} {...props}>
														{langs[preferredLocale].footer.links[link.name]}
													</Link>
												</li>
											);
										})}
									</ul>
								</article>
								<article className="column _25">
									<span>{langs[preferredLocale].footer.social}</span>
									<div className="footer-socials-wrapper">
										{socials.map((social, index) => {
											const Icon = social["name"];
											return (
												<a
													key={index}
													className="footer-social"
													onClick={event => this._handleSocialClick(event, index)}
													href={social.href}
													target="_blank"
													rel="noopener noreferrer"
												>
													<Icon className="footer-icon" />
												</a>
											);
										})}
									</div>
								</article>
								<LanguagePicker showModal={this.state.isModalOpen} onClose={this._handleModalClickOut} />
							</section>
						</div>
					</div>
				)}
			</CombinedContextConsumer>
		);
	};
}

export default withRouter(Footer);
