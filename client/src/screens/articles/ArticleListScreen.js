import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "redux/actions";
import { ArticleList } from "../../components";

class ArticleListScreen extends Component {
	constructor(props) {
		super(props);
		this.mounted = false;
		this.state = {
			isFetchingMoreArticles: false,
			isFetchingMoreUserArticles: false,
			isFetchingAllArticles: false,
			page: 1,
			userPage: 1,
			seed: 1,
			userSeed: 1,
			limit: 10,
			userLimit: 10
		};
	}

	_makeAsyncOperation = operation => {
		return new Promise((resolve, reject) => {
			resolve(operation());
		});
	};

	componentWillMount = () => {
		this.mounted = true;
		const {
			isFetchingArticles,
			isFetchingUserArticles,
			isFetchingHomeArticles,
			limit,
			hasHeaderButton = true,
			hasHeaderTabs = true,
			// articles,
			homeArticles
		} = this.props;

		if (!isFetchingArticles && !isFetchingUserArticles && !isFetchingHomeArticles) {
			window.scrollTo(0, 0);
			if (
				(!hasHeaderButton && !hasHeaderTabs && Object.keys(homeArticles).length === 0) ||
				(hasHeaderButton && hasHeaderTabs)
			) {
				let promisesToMake = [
					this._makeAsyncOperation(async () => {
						const res = await this.props.fetchAll(this.state.seed, this.state.page, limit || this.state.limit);
						return res;
					}),
					...(hasHeaderButton && hasHeaderTabs
						? this._makeAsyncOperation(async () => {
								const res = await this._handleFetchUserArticles();
								return res;
						  })
						: [])
				];
				if (this.mounted) {
					this.setState({ isFetchingAllArticles: true }, () => {
						let promises = Promise.all(promisesToMake);
						promises.then(results => {
							this.mounted && this.setState({ isFetchingAllArticles: false }, () => {});
						});
					});
				}
			}
		}
	};

	componentWillUnmount = () => {
		this.mounted = false;
	};

	_handleFetchUserArticles = async () => {
		const { authenticationData, isLoadingAuthentication, isFetchingUserArticles } = this.props;
		if (!isFetchingUserArticles && !isLoadingAuthentication) {
			return await this.props.fetchAllUserArticles(
				authenticationData._id,
				this.state.userSeed,
				this.state.userPage,
				this.state.userLimit
			);
		}
	};

	componentWillReceiveProps = nextProps => {
		if (
			this.mounted &&
			this.state.isFetchingMoreArticles &&
			this.props.isFetchingMoreArticles &&
			!nextProps.isFetchingMoreArticles
		) {
			this.setState({ isFetchingMoreArticles: false });
		}
		if (
			this.mounted &&
			this.state.isFetchingMoreUserArticles &&
			this.props.isFetchingMoreUserArticles &&
			!nextProps.isFetchingMoreUserArticles
		) {
			this.setState({ isFetchingMoreUserArticles: false });
		}
	};

	_handleFetchMore = event => {
		event.preventDefault();
		this.setState(
			{
				page: this.state.page + 1,
				isFetchingMoreArticles: true
			},
			() => {
				this.props.fetchAll(this.state.seed, this.state.page, 9);
			}
		);
	};

	_handleFetchMoreUserArticles = event => {
		event.preventDefault();
		this.setState(
			{
				userPage: this.state.userPage + 1,
				isFetchingMoreUserArticles: true
			},
			() => {
				this.props.fetchAllUserArticles(this.props.authenticationData._id, this.state.userSeed, this.state.userPage, 9);
			}
		);
	};

	render = () => {
		const {
			articles,
			homeArticles,
			userArticles,
			hasErroredArticles,
			hasErroredHomeArticles,
			hasErroredUserArticles,
			isFetchingArticles,
			isFetchingHomeArticles,
			isFetchingUserArticles,
			articlesError,
			homeArticlesError,
			userArticlesError,
			hasHeaderButton = true,
			hasHeaderTabs = true,
			onFetchMore = null
		} = this.props;
		return (
			<ArticleList
				onFetchUserArticles={this._handleFetchUserArticles}
				onFetchMore={onFetchMore || this._handleFetchMore}
				onFetchMoreUserArticles={this._handleFetchMoreUserArticles}
				articles={articles}
				homeArticles={homeArticles}
				userArticles={userArticles}
				hasErroredArticles={hasErroredArticles}
				hasErroredUserArticles={hasErroredUserArticles}
				hasErroredHomeArticles={hasErroredHomeArticles}
				isFetchingArticles={isFetchingArticles}
				isFetchingUserArticles={isFetchingUserArticles}
				isFetchingHomeArticles={isFetchingHomeArticles}
				isFetchingAllArticles={this.state.isFetchingAllArticles}
				isFetchingMoreArticles={this.state.isFetchingMoreArticles}
				isFetchingMoreUserArticles={this.state.isFetchingMoreUserArticles}
				articlesError={articlesError}
				homeArticlesError={homeArticlesError}
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

			homeArticles: state.articles.homeArticles,
			hasErroredHomeArticles: state.articles.hasErroredHomeArticles,
			isFetchingHomeArticles: state.articles.isFetchingHomeArticles,
			homeArticlesError: state.articles.homeArticlesError,

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
			fetchAll: (seed, page, limit) => {
				return dispatch(actions.articles.fetchAll(seed, page, limit)).then(res => {
					return res;
				});
			},
			fetchAllUserArticles: async (id, seed, page, limit) => {
				const res = await dispatch(actions.articles.fetchAllUserArticles(id, seed, page, limit));
				return res;
			}
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
