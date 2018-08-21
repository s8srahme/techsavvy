import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "redux/actions";
import { ArticleForm } from "../../components";
import { extractId } from "../../utils";

class ArticleFormScreen extends Component {
	componentWillMount = () => {
		window.scrollTo(0, 0);
	};

	componentWillMount = () => {
		const { authenticationData } = this.props;
		if (Object.keys(authenticationData).length) {
			let id = extractId(this.props.match.params.slug);
			this.props.onFetchOne(id);
		}
	};

	componentWillReceiveProps = nextProps => {
		if (this.props !== nextProps) {
			const { isLoadingAuthentication } = nextProps;

			if (this.props.isLoadingAuthentication && !isLoadingAuthentication) {
				let id = extractId(this.props.match.params.slug);
				this.props.onFetchOne(id);
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
					let id = extractId(this.props.match.params.slug);
					onFetchOne(id);
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
			onFetchOne: id => dispatch(actions.articles.fetchOne(id))
		};
	};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArticleFormScreen);
