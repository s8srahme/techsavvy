import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
	Menu,
	User,
	// Settings,
	Power
} from "react-feather";
import { UserFormScreen } from "screens";
import { Loader, LazyLoad } from "components";
import { Dropdown } from "..";
import { iconMale } from "assets";
import { AppContext } from "../../AppProvider";

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
			isDropdownActive: false
		};
	}

	// componentWillMount = () => {
	// 	const state = this.props.location.state;
	// 	if (state && state.isModalOpen) {
	// 		this.setState({ isModalOpen: state.isModalOpen });
	// 	}
	// };

	componentWillReceiveProps = nextProps => {
		if (this.props !== nextProps) {
			const state = nextProps.location.state;
			if (state && state.isModalOpen) {
				this.setState({ isModalOpen: state.isModalOpen });
			}
		}
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
		this.setState({
			isModalOpen: false
		});
	};

	_handleDropdownClick = () => {
		this.setState({ isDropdownActive: !this.state.isDropdownActive });
	};

	_renderDropdownContent = (user, isLoading) => {
		if (isLoading)
			return (
				<AppContext.Consumer>
					{context => (
						<div className={`header-dropdown-wrapper ${context.offsetTop > 100 ? "shrink" : ""}`}>
							<Loader inverse={context.offsetTop <= 100} />
						</div>
					)}
				</AppContext.Consumer>
			);
		return (
			<AppContext.Consumer>
				{context => (
					<div className={`header-dropdown-wrapper ${context.offsetTop > 100 ? "shrink" : ""}`}>
						<span className={`${context.offsetTop > 100 ? "shrink" : ""}`}>
							{Object.keys(user).length ? user.name.toLowerCase() : "sign in"}
						</span>
						<div
							className={`header-dropdown-img-wrapper ${context.offsetTop > 100 ? "shrink" : ""}`}
							onClick={Object.keys(user).length ? this._handleDropdownClick : this._handleModalClickIn}
						>
							<LazyLoad
								src={Object.keys(user).length && user.image_url ? user.image_url : iconMale}
								alt="Header infographic"
								className="header-thumbnail"
								defaultImage={iconMale}
							/>
							<div className="header-dropdown-img-overlay" />
						</div>
						{JSON.stringify(user) !== "{}" &&
							this.state.isDropdownActive && (
								<Dropdown
									shouldDropdownShrink={context.offsetTop > 100}
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
										// {
										// 	icon: Settings,
										// 	title: "Settings",
										// 	isLoadingSelf: false,
										// 	isLoadingSibling: this.props.isLoadingLogout,
										// 	onClick: () => {
										// 		this.setState({ isDropdownActive: false });
										// 	}
										// },
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
				)}
			</AppContext.Consumer>
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
		const { user = {}, isLoadingUser, isOnline } = this.props;

		return (
			<AppContext.Consumer>
				{context => (
					<div
						className={`header-content ${context.offsetTop > 100 ? "shrink" : ""}${
							location.pathname === "/" ? " transparent" : ""
						}`}
					>
						<div className={`header-status-wrapper ${isOnline ? "" : "offline"}`}>
							<p>No internet connection found. App is running in offline mode.</p>
						</div>
						<header className={`header-wrapper ${context.offsetTop > 100 ? "shrink" : ""}`}>
							<figure className={`header-logo-wrapper ${context.offsetTop > 100 ? "shrink" : ""}`}>
								<div className="header-icon-wrapper">
									<Menu
										className={`header-icon ${context.offsetTop > 100 ? "shrink" : ""}`}
										onClick={this._toggleMenu}
									/>
								</div>
								<figcaption className={`header-logo ${context.offsetTop > 100 ? "shrink" : ""}`}>Techsavvy</figcaption>
								{this._renderDropdownContent(user)}
							</figure>
							<nav
								className={`${this.state.isMenuVisible && "collapse"} ${
									context.offsetTop > 100 && this.state.isMenuVisible ? "shrink" : ""
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
											className={`header-link ${context.offsetTop > 100 ? "shrink" : ""}`}
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
				)}
			</AppContext.Consumer>
		);
	};
}

export default withRouter(Header);
