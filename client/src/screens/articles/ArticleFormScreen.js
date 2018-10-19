import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "redux/actions";
import { ArticleForm } from "../../components";

class ArticleFormScreen extends Component {
	componentWillMount = () => {
		const { authenticationData, isFetchingArticle } = this.props;

		if (Object.keys(authenticationData).length && !isFetchingArticle) {
			let urlSlug = this.props.match.params.slug;
			this.props.onFetchOne(urlSlug);
			window.scrollTo(0, 0);
		}
	};

	componentWillReceiveProps = nextProps => {
		if (this.props !== nextProps) {
			const { isLoadingAuthentication } = nextProps;

			if (this.props.isLoadingAuthentication && !isLoadingAuthentication) {
				let urlSlug = this.props.match.params.slug;
				this.props.onFetchOne(urlSlug);
			}
		}
	};

	render = () => {
		const {
			onFetchOne,

			isLoadingAuthentication,
			authenticationData,

			articleData,
			hasErroredArticle,
			articleError,
			isFetchingArticle,

			onUpdate,
			onUpdateData,
			isFetchingUpdateData,
			onUpdateError
		} = this.props;

		return (
			<ArticleForm
				history={this.props.history}
				onFetchOne={() => {
					let urlSlug = this.props.match.params.slug;
					this.props.onFetchOne(urlSlug);
					onFetchOne(urlSlug);
				}}
				isLoadingAuthentication={isLoadingAuthentication}
				authenticationData={authenticationData}
				onUpdate={onUpdate}
				onUpdateData={onUpdateData}
				isFetchingUpdateData={isFetchingUpdateData}
				onUpdateError={onUpdateError}
				articleData={articleData}
				hasErroredArticle={hasErroredArticle}
				articleError={articleError}
				isFetchingArticle={isFetchingArticle}
			/>
		);
	};
}

const mapStateToProps = ({ articles, authentication }) => {
		return {
			authenticationData: authentication.user,
			isLoadingAuthentication: authentication.isLoadingUser,

			articleData: articles.article,
			hasErroredArticle: articles.hasErroredArticle,
			articleError: articles.articleError,
			isFetchingArticle: articles.isFetchingArticle,

			onUpdateData: articles.onUpdateData,
			onUpdateError: articles.onUpdateError,
			isFetchingUpdateData: articles.isFetchingUpdateData
		};
	},
	mapDispatchToProps = dispatch => {
		return {
			onUpdate: (id, updateData) => dispatch(actions.articles.update(id, updateData)),
			onFetchOne: urlSlug => dispatch(actions.articles.fetchOne(urlSlug))
		};
	};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArticleFormScreen);
