import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "redux/actions";
import { ArticleDetail } from "../../components";
import { CommentListScreen } from "..";
// import { extractId } from "../../utils";

class ArticleDetailScreen extends Component {
	componentWillMount = () => {
		const { isFetchingArticle } = this.props;

		if (!isFetchingArticle) {
			// let id = extractId(this.props.match.params.slug);
			let urlSlug = this.props.match.params.slug;
			this.props.onFetchOne(urlSlug);
			window.scrollTo(0, 0);
		}
	};

	render = () => {
		return (
			<div>
				<ArticleDetail {...this.props} />
				{this.props.articleData.author_id && <CommentListScreen />}
			</div>
		);
	};
}

const mapStateToProps = ({ comments, articles, authentication }) => {
		return {
			authenticationData: authentication.user,
			isLoadingAuthentication: authentication.isLoadingUser,

			articleData: articles.article,
			hasErroredArticle: articles.hasErroredArticle,
			articleError: articles.articleError,
			isFetchingArticle: articles.isFetchingArticle,

			onDeleteArticleData: articles.onDeleteData,
			onDeleteArticleError: articles.onDeleteError,
			isFetchingDeleteArticleData: articles.isFetchingDeleteData,

			onDeleteAllCommentsData: comments.onDeleteAllData,
			onDeleteAllCommentsError: comments.onDeleteAllError,
			isFetchingDeleteAllCommentsData: comments.isFetchingDeleteAllData
		};
	},
	mapDispatchToProps = dispatch => {
		return {
			onFetchOne: urlSlug => dispatch(actions.articles.fetchOne(urlSlug)),
			onDeleteArticle: (id, cb) => dispatch(actions.articles.remove(id, cb)),
			onDeleteComments: id => dispatch(actions.comments.removeAll(id))
		};
	};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArticleDetailScreen);
