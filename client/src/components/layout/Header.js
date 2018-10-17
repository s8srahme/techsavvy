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
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import actions from "redux/actions";
import _ from "lodash";
import queryString from "query-string";

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
];

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
			isDropdownActive: false,
			isOnline: true
		};
		this.mounted = false;
	}

	componentDidMount = () => {
		if (this.props.location.pathname === "/login") {
			if (JSON.parse(localStorage.getItem("user"))) this.props.history.goBack();
			else this.setState({ isModalOpen: true });
		}
		this.mounted = true;
		this._updateOnlineStatus();

		window.addEventListener("online", this._updateOnlineStatus);
		window.addEventListener("offline", this._updateOnlineStatus);
	};

	componentWillMount = () => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user && user.token) {
			this.props.getOne({ id: "self" });
		}
	};

	componentWillUnmount = () => {
		this.mounted = false;
		window.removeEventListener("online");
		window.removeEventListener("offline");
	};

	componentWillReceiveProps = nextProps => {
		if (
			this.props.location.pathname !== nextProps.location.pathname &&
			this.props.location.pathname !== "/login" &&
			!this.props.isPushingHistory
		) {
			let { pathname } = this.props.location,
				offsetTop = window.pageYOffset;
			this.props.pushHistory({ from: pathname, offsetTop });
			if (nextProps.location.pathname === "/login") {
				if (JSON.parse(localStorage.getItem("user"))) this.props.history.goBack();
				else this.setState({ isModalOpen: true });
			}
		}
	};

	_updateOnlineStatus = event => {
		if (this.mounted) this.setState({ isOnline: navigator.onLine });
	};

	_toggleMenu = () => {
		if (this.mounted) this.setState({ isMenuVisible: !this.state.isMenuVisible });
	};

	// _toggleModal = () => {
	// 	if (this.mounted) this.setState({
	// 		isModalOpen: !this.state.isModalOpen
	// 	});
	// };

	_handleModalClickIn = () => {
		if (this.mounted)
			this.setState({
				isModalOpen: true
			});
	};

	_handleModalClickOut = shouldRedirect => {
		if (this.mounted)
			this.setState(
				{
					isModalOpen: false
				},
				() => {
					const { from, location, history } = this.props;
					if (location.pathname === "/login") {
						if (shouldRedirect) {
							const values = queryString.parse(this.props.location.search);
							history.push(_.isEmpty(values) ? "/" : values.redirect);
						} else if (from.length) history.goBack();
						else history.push("/");
					}
				}
			);
	};

	_handleDropdownClick = () => {
		if (this.mounted) this.setState({ isDropdownActive: !this.state.isDropdownActive });
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
												if (this.mounted)
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
										// 		if (this.mounted) this.setState({ isDropdownActive: false });
										// 	}
										// },
										{
											icon: Power,
											title: "Sign out",
											isLoadingSelf: this.props.isLoadingLogout,
											isLoadingSibling: false,
											onClick: this._handleLogout
										}
									]}
								/>
							)}
					</div>
				)}
			</AppContext.Consumer>
		);
	};

	_handleLogout = () => {
		this.props.logout(() => {
			if (this.mounted)
				this.setState({ isDropdownActive: false }, () => {
					this.props.clearUser();
					if (this.props.location.pathname.includes("/blog") || this.props.location.pathname.includes("/user"))
						this.props.history.push("/");
				});
		});
	};

	render = () => {
		const { location, user = {}, isLoadingUser } = this.props;
		const { isOnline } = this.state;

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

const mapStateToProps = ({ articles, users, authentication, history }) => ({
		isFetchingArticles: articles.isFetchingArticles,

		isFetchingUsers: users.isLoadingUsers,
		user: authentication.user,
		isLoadingUser: authentication.isLoadingUser,
		hasErroredUser: authentication.hasErroredUser,
		userError: authentication.userError,

		isLoadingLogout: authentication.isLoadingLogout,
		hasErroredLogout: authentication.hasErroredLogout,
		logoutError: authentication.logoutError,

		isModalOpen: history.isModalOpen,
		from: history.from,
		offsetTop: history.offsetTop,
		isPushingHistory: history.isPushingHistory
	}),
	mapDispatchToProps = dispatch =>
		bindActionCreators(
			{
				getOne: actions.authentication.getOne,
				logout: actions.authentication.logout,
				clearUser: () => dispatch => {
					dispatch({ type: "CLEAR_ONE" });
					dispatch({ type: "CLEAR_SELF" });
				},
				pushHistory: actions.history.pushHistory,
				clearHistory: actions.history.clear
			},
			dispatch
		);

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Header)
);
