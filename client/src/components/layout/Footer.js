import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, Linkedin, Github, Heart } from "react-feather";
import GA from "utils";

const socials = [
		{ name: Twitter, href: "" },
		{ name: Facebook, href: "" },
		{ name: Instagram, href: "" },
		{ name: Linkedin, href: "" },
		{ name: Github, href: "" }
	],
	links = [
		{
			name: "Blog",
			href: "/blog"
		},
		{
			name: "About",
			href: "/about"
		},
		{
			name: "Contact",
			href: "/contact"
		},
		{
			name: "License",
			href: "/license"
		},
		{
			name: "Privacy policy",
			href: "/privacy"
		}
	];

export class Footer extends Component {
	_handleClick = (event, index) => {
		event.preventDefault();
		GA.trackEvent(index);
	};

	render = () => {
		return (
			<div className="footer">
				<div className="container">
					<section className="row">
						<article className="column _55">
							<h2>Techsavvy</h2>
							<p>
								Open content publishing for all industries. Enjoy a beautifully simple space to write your thoughts, and
								engage in a wide variety of topics ranging between business, startups, culture, technology, politics,
								and life learning.
							</p>
							<span>
								&copy; 2018 Made with
								<Heart className="footer-icon" />
								by
								<b>NanoSoldierSeven</b>
							</span>
						</article>
						<article className="column _20">
							<ul>
								{links.map((link, index) => {
									return (
										<li key={index}>
											<Link
												to={{
													pathname: link.href
												}}
											>
												{link.name}
											</Link>
										</li>
									);
								})}
							</ul>
						</article>
						<article className="column _25">
							<span>Stay connected</span>
							<div className="footer-socials-wrapper">
								{socials.map((social, index) => {
									const Icon = social["name"];
									return (
										<a key={index} className="footer-social" onClick={event => this._handleClick(event, index)}>
											<Icon className="footer-icon" />
										</a>
									);
								})}
							</div>
						</article>
					</section>
				</div>
			</div>
		);
	};
}
