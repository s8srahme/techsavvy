import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, User, Settings, Power } from "react-feather";
import { UserFormScreen } from "../screens";
import { Dropdown } from ".";
import { iconMale } from "../assets";
export class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMenuVisible: false,
			isModalOpen: false,
			offsetTop: 0,
			isDropdownActive: true,
			isSignedIn: true
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

	_handleDropdownClick = () => {
		this.setState({ isDropdownActive: !this.state.isDropdownActive });
	};

	_renderDropdownContent = user => (
		<div className={`header-dropdown-wrapper ${this.state.offsetTop > 0 ? "shrink" : ""}`}>
			<span className={`${this.state.offsetTop > 0 ? "shrink" : ""}`}>
				{user ? user.name.toLowerCase() : "sign in"}
			</span>
			<div
				className={`header-dropdown-img-wrapper ${this.state.offsetTop > 0 ? "shrink" : ""}`}
				onClick={user ? this._handleDropdownClick : this._handleModalClickIn}
			>
				<img src={user ? user.image_url : iconMale} alt="header infographic" className="header-thumbnail" />
				<div className="header-dropdown-img-overlay" />
			</div>
			{user &&
				this.state.isDropdownActive && (
					<Dropdown
						shouldDropdownShrink={this.state.offsetTop > 0}
						items={[
							{
								icon: User,
								title: "Profile",
								onClick: () => {
									this.props.history.push(`/user/${user._id}`);
								}
							},
							{ icon: Settings, title: "Settings", onClick: () => {} },
							{
								icon: Power,
								title: "Sign out",
								onClick: () => {
									this.setState({ isSignedIn: false });
								}
							}
						]}
					/>
				)}
		</div>
	);

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
			}
			// {
			// 	name: "join us",
			// 	path: this.props.location.pathname,
			// 	onClick: this._handleModalClickIn
			// }
		];
		// console.log(this.props.location.pathname);
		const user = {
			_id: "5b091dc6c1b03443f86693fa",
			name: "Dan Abramov",
			username: "gaearon",
			image_url: "https://avatars1.githubusercontent.com/u/810438?s=460&v=4"
		};

		return (
			<div
				className={`header-content ${this.state.offsetTop > 0 ? "shrink" : ""} ${this.props.location.pathname === "/" &&
					"transparent"}`}
			>
				<header className={`header-wrapper ${this.state.offsetTop > 0 ? "shrink" : ""}`}>
					<figure className={`header-logo-wrapper ${this.state.offsetTop > 0 ? "shrink" : ""}`}>
						<div className="header-icon-wrapper">
							<Menu className={`header-icon ${this.state.offsetTop > 0 ? "shrink" : ""}`} onClick={this._toggleMenu} />
						</div>
						<figcaption className={`header-logo ${this.state.offsetTop > 0 ? "shrink" : ""}`}>Techsavvy</figcaption>
						{this._renderDropdownContent(this.state.isSignedIn ? user : undefined)}
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
					{this._renderDropdownContent(this.state.isSignedIn ? user : undefined)}
					<UserFormScreen showModal={this.state.isModalOpen} onClose={this._handleModalClickOut} />
				</header>
			</div>
		);
	};
}
