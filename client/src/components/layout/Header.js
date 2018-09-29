import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu, User, Settings, Power } from "react-feather";
import { UserFormScreen } from "screens";
import { Loader } from "components";
import { Dropdown } from "..";
import { iconMale } from "assets";

class Header extends Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			isMenuVisible: false,
			isModalOpen: false,
			offsetTop: 0,
			isDropdownActive: false
		};
	}

	// componentWillMount = () => {
	// 	const state = this.props.location.state;
	// 	if (state && state.isModalOpen) {
	// 		this.setState({ isModalOpen: state.isModalOpen });
	// 	}
	// };

	componentDidMount = () => {
		// console.log(this.props.location);
		window.addEventListener("scroll", this._handleScroll);
	};

	componentWillReceiveProps = nextProps => {
		if (this.props !== nextProps) {
			const state = nextProps.location.state;
			if (state && state.isModalOpen) {
				this.setState({ isModalOpen: state.isModalOpen });
			}
		}
	};

	componentWillUnmount = () => {
		window.removeEventListener("scroll", this._handleScroll);
	};

	_handleScroll = e => {
		this.setState({ offsetTop: window.pageYOffset }, () => {
			// console.log(this.state.offsetTop);
		});
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
		const state = this.props.location.state;
		if (state && state.isModalOpen) {
			this.props.history.replace({ pathname: "/", state: {} });
		}
		this.setState(
			{
				isModalOpen: false
			}
			// () => {}
		);
	};

	_handleDropdownClick = () => {
		this.setState({ isDropdownActive: !this.state.isDropdownActive });
	};

	_renderDropdownContent = (user, isLoading) => {
		if (isLoading)
			return (
				<div className={`header-dropdown-wrapper ${this.state.offsetTop > 0 ? "shrink" : ""}`}>
					<Loader />
				</div>
			);
		return (
			<div className={`header-dropdown-wrapper ${this.state.offsetTop > 0 ? "shrink" : ""}`}>
				<span className={`${this.state.offsetTop > 0 ? "shrink" : ""}`}>
					{Object.keys(user).length ? user.name.toLowerCase() : "sign in"}
				</span>
				<div
					className={`header-dropdown-img-wrapper ${this.state.offsetTop > 0 ? "shrink" : ""}`}
					onClick={Object.keys(user).length ? this._handleDropdownClick : this._handleModalClickIn}
				>
					<img
						src={Object.keys(user).length && user.image_url ? user.image_url : iconMale}
						alt="Header infographic"
						className="header-thumbnail"
					/>
					<div className="header-dropdown-img-overlay" />
				</div>
				{JSON.stringify(user) !== "{}" &&
					this.state.isDropdownActive && (
						<Dropdown
							shouldDropdownShrink={this.state.offsetTop > 0}
							items={[
								{
									icon: User,
									title: "Profile",
									isLoadingSelf: false,
									isLoadingSibling: this.props.isLoadingLogout,
									onClick: () => {
										this.setState({ isDropdownActive: false }, () => {
											if (this.props.location.pathname !== `/user/${user._id}`)
												this.props.history.push(`/user/${user._id}`);
										});
									}
								},
								{
									icon: Settings,
									title: "Settings",
									isLoadingSelf: false,
									isLoadingSibling: this.props.isLoadingLogout,
									onClick: () => {
										this.setState({ isDropdownActive: false });
									}
								},
								{
									icon: Power,
									title: "Sign out",
									isLoadingSelf: this.props.isLoadingLogout,
									isLoadingSibling: false,
									onClick: () => {
										this.props.onLogout(() => {
											this.setState({ isDropdownActive: false }, () => {
												this.props.onClear();
												this.props.history.push("/");
											});
										});
									}
								}
							]}
						/>
					)}
			</div>
		);
	};

	render = () => {
		const {
			// match,
			location
			// history
		} = this.props;
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
			// 	path: location.pathname,
			// 	onClick: this._handleModalClickIn
			// }
		];
		// console.log(location.pathname);
		const { user = {}, isLoadingUser } = this.props;

		return (
			<div
				className={`header-content ${this.state.offsetTop > 0 ? "shrink" : ""} ${location.pathname === "/" &&
					"transparent"}`}
			>
				<header className={`header-wrapper ${this.state.offsetTop > 0 ? "shrink" : ""}`}>
					<figure className={`header-logo-wrapper ${this.state.offsetTop > 0 ? "shrink" : ""}`}>
						<div className="header-icon-wrapper">
							<Menu className={`header-icon ${this.state.offsetTop > 0 ? "shrink" : ""}`} onClick={this._toggleMenu} />
						</div>
						<figcaption className={`header-logo ${this.state.offsetTop > 0 ? "shrink" : ""}`}>Techsavvy</figcaption>
						{this._renderDropdownContent(user)}
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
										// state: { prevPath: location.pathname }
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
					{this._renderDropdownContent(user, isLoadingUser)}
					<UserFormScreen showModal={this.state.isModalOpen} onClose={this._handleModalClickOut} />
				</header>
			</div>
		);
	};
}

export default withRouter(Header);
