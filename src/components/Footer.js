import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, Linkedin, Github, Heart } from "react-feather";

export class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render = () => {
		const socials = [
				{ name: Twitter, href: "" },
				{ name: Facebook, href: "" },
				{ name: Instagram, href: "" },
				{ name: Linkedin, href: "" },
				{ name: Github, href: "" }
			],
			links = [
				{
					name: "About us",
					href: ""
				},
				{
					name: "Blog",
					href: ""
				},
				{
					name: "Jobs",
					href: ""
				},
				{
					name: "Contact us",
					href: ""
				},
				{
					name: "Privacy policy",
					href: ""
				},
				{
					name: "Disclaimer",
					href: ""
				}
			];

		return (
			<div className="footer">
				<div className="container">
					<section className="row">
						<article className="column _55">
							<h2>Techsavvy</h2>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum orci quis gravida tincidunt.
								Curabitur id augue ornare, mattis metus quis, feugiat elit.
							</p>
							<span>
								&copy; 2018 Made with<Heart className="footer-icon" />by TheBlackSheep
							</span>
						</article>
						<article className="column _20">
							<ul>
								{links.map((link, index) => (
									<li key={index}>
										<a>{link.name}</a>
									</li>
								))}
							</ul>
						</article>
						<article className="column _25">
							<span>Stay connected</span>
							<div className="footer-socials-wrapper">
								{socials.map((social, index) => {
									const Icon = social["name"];
									return (
										<a key={index} className="footer-social">
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
