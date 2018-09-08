import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "redux/actions";
import { ArticleList } from "../../components";

class ArticleListScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFetchingMoreArticles: false,
			isFetchingMoreUserArticles: false,
			page: 1,
			userPage: 1,
			seed: 1,
			userSeed: 1,
			limit: 10,
			userLimit: 10,
			offsetTop: 0,
			userOffsetTop: 0
		};
	}

	componentWillMount = () => {
		const {
			authenticationData,
			isLoadingAuthentication,
			isFetchingArticles,
			isFetchingUserArticles,
			limit,
			hasHeaderTabs = true
		} = this.props;
		// console.log(this.props, "componentWillMount");

		if (!isFetchingArticles) {
			// this.setState(
			// 	{
			// 		page: 1,
			// 		seed: 1,
			// 		limit: limit || 10
			// 	},
			// 	() => {
			window.scrollTo(0, 0);
			this.props.fetchAll(this.state.seed, this.state.page, limit || this.state.limit);
			// 	}
			// );
		}
		if (hasHeaderTabs && !isFetchingUserArticles && !isLoadingAuthentication) {
			// window.scrollTo(0, 0);
			this.props.fetchAllUserArticles(
				authenticationData._id,
				this.state.userSeed,
				this.state.userPage,
				this.state.userLimit
			);
		}
	};

	componentWillReceiveProps = nextProps => {
		let { hasHeaderTabs = true } = this.props;
		if (hasHeaderTabs && this.props.isLoadingAuthentication && !nextProps.isLoadingAuthentication) {
			// window.scrollTo(0, 0);
			this.props.fetchAllUserArticles(
				nextProps.authenticationData._id,
				this.state.userSeed,
				this.state.userPage,
				this.state.userLimit
			);
		}
		if (this.state.isFetchingMoreArticles && this.props.isFetchingMoreArticles && !nextProps.isFetchingMoreArticles) {
			this.setState({ isFetchingMoreArticles: false }, () => {
				// console.log(this.state.offsetTop);
				window.scrollTo({
					top: this.state.offsetTop,
					left: 0,
					behavior: "instant"
				});
			});
		}
		if (
			this.state.isFetchingMoreUserArticles &&
			this.props.isFetchingMoreUserArticles &&
			!nextProps.isFetchingMoreUserArticles
		) {
			this.setState({ isFetchingMoreUserArticles: false }, () => {
				// console.log(this.state.userOffsetTop);
				window.scrollTo({
					top: this.state.userOffsetTop,
					left: 0,
					behavior: "instant"
				});
			});
		}
	};

	_handleFetchMore = event => {
		event.preventDefault();
		this.setState(
			{
				page: this.state.page + 1,
				isFetchingMoreArticles: true,
				offsetTop: window.pageYOffset
			},
			() => {
				// console.log(this.state.offsetTop);
				this.props.fetchAll(this.state.seed, this.state.page, this.state.limit);
			}
		);
	};

	_handleFetchMoreUserArticles = event => {
		event.preventDefault();
		this.setState(
			{
				userPage: this.state.userPage + 1,
				isFetchingMoreUserArticles: true,
				userOffsetTop: window.pageYOffset
			},
			() => {
				// console.log(this.state.userOffsetTop);
				this.props.fetchAllUserArticles(
					this.props.authenticationData._id,
					this.state.userSeed,
					this.state.userPage,
					this.state.userLimit
				);
			}
		);
	};

	render = () => {
		const {
			articles,
			userArticles,
			hasErroredArticles,
			hasErroredUserArticles,
			isFetchingArticles,
			isFetchingUserArticles,
			articlesError,
			userArticlesError,
			hasHeaderButton = true,
			hasHeaderTabs = true,
			onFetchMore = null
		} = this.props;
		// const posts = [
		// 	{
		// 		thumbnail: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg",
		// 		title: "City Lights in New York",
		// 		subtitle: "The city that never sleeps.",
		// 		description:
		// 			"New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.",
		// 		timestamp: "6 mins ago",
		// 		category: "tech",
		// 		author: "Andy Tran",
		// 		slug: slugify("City Lights in New York")
		// 	},
		// 	{
		// 		thumbnail:
		// 			"https://i.amz.mshcdn.com/-Tvnq3kgcjiELKDZkWWGBnWIwLo=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F728735%2Fd76babe8-b91a-45e0-aa46-2a3028ef2a94.jpg",
		// 		title: "iPhone X's notch probably won't get smaller or disappear anytime soon",
		// 		subtitle: "Still can't bring yourself to accept the iPhone X's notch? ",
		// 		description:
		// 			"Sorry, buddy, but I have some bad news for you: Apple's unlikely to make any major changes to controversial cutout in the display, despite new rumors suggesting future iPhones might come with a smaller notch or remove it entirely.",
		// 		timestamp: "20 hours ago",
		// 		category: "tech",
		// 		author: "RAYMOND WONG",
		// 		slug: slugify("iPhone X's notch probably won't get smaller or disappear anytime soon")
		// 	},
		// 	{
		// 		thumbnail:
		// 			"https://i.amz.mshcdn.com/e7CcQOUVZ11v8ZxZMpY7b5utGiY=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F722728%2F18aba02e-ce15-4af5-a077-6946cbd81fb4.jpg",
		// 		title: "iPhone 9? iPhone XI? Apple's next big thing should just drop the numbers",
		// 		subtitle:
		// 			"No more numbers, no more upgrade treadmills: When Apple launches its new lineup of iPhones, there's only one thing it should call them, and that thing is 'iPhone.'",
		// 		description:
		// 			"We already have a MacBook, an iPad, and an iPod Touch, but Apple continues to develop its most popular device through a series of numbered, annual updates.",
		// 		timestamp: "6 mins ago",
		// 		category: "tech",
		// 		author: "DAMON BERES",
		// 		slug: slugify("iPhone 9? iPhone XI? Apple's next big thing should just drop the numbers")
		// 	},
		// 	{
		// 		thumbnail:
		// 			"https://i.amz.mshcdn.com/-TXIaACwILA8VZlEfIDEIe08ZcA=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F729118%2F290cc6a2-12bc-4198-b153-ba9651eeb095.jpeg",
		// 		title: "This Samsung smart TV deal is HUGE — both in screen size and discount",
		// 		subtitle:
		// 			"All products featured here are selected by Mashable's commerce team and meet our rigorous standards for awesomeness.",
		// 		description:
		// 			"Smart TVs were selling like hotcakes (seriously, who eats hotcakes?) during Black Friday, Cyber Monday, and Super Bowl sales. Except all of those hot TV events are over — does that mean that if you missed those, you're stuck paying full price until Thanksgiving?",
		// 		timestamp: "6 mins ago",
		// 		category: "tech",
		// 		author: "LEAH STODART",
		// 		slug: slugify("This Samsung smart TV deal is HUGE — both in screen size and discount")
		// 	}
		// ];
		return (
			<ArticleList
				onFetchMore={onFetchMore || this._handleFetchMore}
				onFetchMoreUserArticles={this._handleFetchMoreUserArticles}
				articles={articles}
				userArticles={userArticles}
				hasErroredArticles={hasErroredArticles}
				hasErroredUserArticles={hasErroredUserArticles}
				isFetchingArticles={isFetchingArticles}
				isFetchingUserArticles={isFetchingUserArticles}
				isFetchingMoreArticles={this.state.isFetchingMoreArticles}
				isFetchingMoreUserArticles={this.state.isFetchingMoreUserArticles}
				articlesError={articlesError}
				userArticlesError={userArticlesError}
				hasHeaderButton={hasHeaderButton}
				hasHeaderTabs={hasHeaderTabs}
			/>
		);
	};
}

const mapStateToProps = state => {
		return {
			authenticationData: state.authentication.user,
			isLoadingAuthentication: state.authentication.isLoadingUser,

			articles: state.articles.articles,
			hasErroredArticles: state.articles.hasErroredArticles,
			isFetchingArticles: state.articles.isFetchingArticles,
			articlesError: state.articles.articlesError,

			userArticles: state.articles.userArticles,
			hasErroredUserArticles: state.articles.hasErroredUserArticles,
			isFetchingUserArticles: state.articles.isFetchingUserArticles,
			userArticlesError: state.articles.userArticlesError,

			isFetchingMoreArticles: state.articles.isFetchingMoreArticles,
			hasErroredMoreArticles: state.articles.hasErroredMoreArticles,
			moreArticlesError: state.articles.moreArticlesError,

			isFetchingMoreUserArticles: state.articles.isFetchingMoreUserArticles,
			hasErroredMoreUserArticles: state.articles.hasErroredMoreUserArticles,
			moreUserArticlesError: state.articles.moreUserArticlesError
		};
	},
	mapDispatchToProps = dispatch => {
		return {
			fetchAll: (seed, page, limit) => dispatch(actions.articles.fetchAll(seed, page, limit)),
			fetchAllUserArticles: (id, seed, page, limit) =>
				dispatch(actions.articles.fetchAllUserArticles(id, seed, page, limit))
		};
	},
	ConnectedComponent = connect(
		mapStateToProps,
		mapDispatchToProps
	)(ArticleListScreen);

class WrappedComponent extends Component {
	render = () => {
		return <ConnectedComponent {...this.props} />;
	};
}

export default WrappedComponent;
