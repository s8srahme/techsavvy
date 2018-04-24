import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "react-feather";

export class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMenuVisible: false
		};
	}

	_handleScroll = e => {
		this.setState({ offsetTop: window.pageYOffset }, () => {
			// console.log(this.state.offsetTop);
		});
	};

	componentDidMount = () => {
		window.addEventListener("scroll", this._handleScroll);
	};

	componentWillUnmount = () => {
		window.removeEventListener("scroll", this._handleScroll);
	};

	_toggleMenu = () => {
		this.setState({ isMenuVisible: !this.state.isMenuVisible });
	};

	render = () => {
		const { links } = this.props;
		return (
			<header className={`header ${this.state.offsetTop > 0 ? "shrink" : ""}`}>
				<figure className={`header-logo-wrapper ${this.state.offsetTop > 0 ? "shrink" : ""}`}>
					<figcaption className={`header-logo ${this.state.offsetTop > 0 ? "shrink" : ""}`}>lonelyblock</figcaption>
					{/* <figcaption className={`header-text ${this.state.offsetTop > 0 ? "shrink" : ""}`} onClick={this._toggleMenu}>
				menu
			</figcaption> */}
					<div className="header-icon-wrapper" onClick={this._toggleMenu}>
						<Menu className={`header-icon ${this.state.offsetTop > 0 ? "shrink" : ""}`} />
					</div>
				</figure>
				<nav
					className={`${this.state.isMenuVisible && "collapse"} ${
						this.state.offsetTop > 0 && this.state.isMenuVisible ? "shrink" : ""
					} header-nav`}
				>
					{links.map((obj, i) => (
						<Link to={obj.path} key={i} className={`header-link ${this.state.offsetTop > 0 ? "shrink" : ""}`}>
							{obj.name}
						</Link>
					))}
				</nav>
			</header>
		);
	};
}
