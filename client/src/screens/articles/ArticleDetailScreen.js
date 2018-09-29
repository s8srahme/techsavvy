import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "redux/actions";
import { ArticleDetail } from "../../components";
import { CommentListScreen } from "..";
import { extractId } from "../../utils";

class ArticleDetailScreen extends Component {
	componentWillMount = () => {
		const { isFetchingArticle } = this.props;

		if (!isFetchingArticle) {
			// let id = extractId(this.props.slug);
			let id = extractId(this.props.match.params.slug);
			this.props.onFetchOne(id);
			window.scrollTo(0, 0);
		}
	};

	render = () => {
		let id = extractId(this.props.match.params.slug);
		return (
			<div>
				<ArticleDetail {...this.props} />
				{this.props.articleData.author_id && <CommentListScreen articleId={id} />}
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
			onFetchOne: id => dispatch(actions.articles.fetchOne(id)),
			onDeleteArticle: (id, cb) => dispatch(actions.articles.remove(id, cb)),
			onDeleteComments: id => dispatch(actions.comments.removeAll(id))
		};
	};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArticleDetailScreen);
