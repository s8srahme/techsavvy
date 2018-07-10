import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "react-feather";
import { UserFormScreen } from "../screens";

export class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMenuVisible: false,
			isModalOpen: false
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

	// _toggleModal = () => {
	// 	this.setState({
	// 		isModalOpen: !this.state.isModalOpen
	// 	});
	// };

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
		const links = [
			{
				name: "home",
				path: "/"
			},
			{
				name: "blog",
				path: "/blog"
			},
			{
				name: "about",
				path: "/about"
			},
			{
				name: "contact",
				path: "/contact"
			},
			{
				name: "join us",
				path: this.props.location.pathname,
				onClick: this._handleModalClickIn
			}
		];

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
					{links.map((obj, i) => {
						let props = {};
						if (obj.onClick)
							props = {
								onClick: () => {
									obj.onClick();
									this._toggleMenu();
								}
							};
						else props = { onClick: this._toggleMenu };

						return (
							<Link
								to={{
									pathname: obj.path
									// state: { prevPath: this.props.location.pathname }
								}}
								key={i}
								className={`header-link ${this.state.offsetTop > 0 ? "shrink" : ""}`}
								{...props}
							>
								{obj.name}
							</Link>
						);
					})}
				</nav>
				<UserFormScreen showModal={this.state.isModalOpen} onClose={this._handleModalClickOut} />
			</header>
		);
	};
}
