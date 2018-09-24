import React, { Component } from "react";
import { CommentList } from "../components";
import { connect } from "react-redux";
import actions from "redux/actions";

class CommentListScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFetchingMoreComments: false,
			page: 1,
			seed: 1,
			limit: 10,
			offsetTop: 0
		};
	}

	componentWillMount = () => {
		const { isFetchingComments, limit, articleId, onFetchAll } = this.props;

		if (!isFetchingComments) {
			// this.setState(
			// 	{
			// 		page: 1,
			// 		seed: 1,
			// 		limit: limit || 10
			// 	},
			// 	() => {
			window.scrollTo(0, 0);
			onFetchAll(articleId, this.state.seed, this.state.page, limit || this.state.limit);
			// 	}
			// );
		}
	};

	componentWillReceiveProps = nextProps => {
		if (this.state.isFetchingMoreComments && this.props.isFetchingMoreComments && !nextProps.isFetchingMoreComments) {
			this.setState({ isFetchingMoreComments: false }, () => {
				// console.log(this.state.offsetTop);
				window.scrollTo({
					top: this.state.offsetTop,
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
				isFetchingMoreComments: true,
				offsetTop: window.pageYOffset
			},
			() => {
				// console.log(this.state.offsetTop);
				this.props.onFetchAll(this.props.articleId, this.state.seed, this.state.page, this.state.limit);
			}
		);
	};

	render = () => {
		const {
			onUpdate,
			isFetchingUpdateData,
			onCreate,
			// isFetchingCreateData,
			onDelete,
			// isFetchingDeleteData,
			authenticationData,
			isLoadingAuthentication,
			comments,
			hasErroredComments,
			isFetchingComments,
			commentsError,
			articleId,
			// onDeleteAllData,
			// onDeleteAllError,
			isFetchingDeleteAllData
		} = this.props;
		// const comments = [
		// 	{
		// 		thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
		// 		description:
		// 			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ante erat, lobortis ut eleifend a, laoreet sollicitudin neque. Mauris quis enim massa. Integer iaculis id ligula in condimentum. Morbi commodo lectus sed consequat venenatis.",
		// 		timestamp: "20 hours ago",
		// 		author: "RAYMOND WONG"
		// 	},
		// 	{
		// 		thumbnail: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg",
		// 		description:
		// 			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ante erat, lobortis ut eleifend a, laoreet sollicitudin neque. Mauris quis enim massa. Integer iaculis id ligula in condimentum. Morbi commodo lectus sed consequat venenatis.",
		// 		timestamp: "20 hours ago",
		// 		author: "RAYMOND WONG"
		// 	}
		// ];
		return (
			<CommentList
				articleId={articleId}
				authenticationData={authenticationData}
				isLoadingAuthentication={isLoadingAuthentication}
				comments={comments}
				onFetchMore={this._handleFetchMore}
				hasErroredComments={hasErroredComments}
				isFetchingComments={isFetchingComments}
				isFetchingMoreComments={this.state.isFetchingMoreComments}
				commentsError={commentsError}
				onUpdate={onUpdate}
				isFetchingUpdateData={isFetchingUpdateData}
				onCreate={onCreate}
				// isFetchingCreateData={isFetchingCreateData}
				onDelete={onDelete}
				// isFetchingDeleteData={isFetchingDeleteData}
				// onDeleteAllData={onDeleteAllData}
				// onDeleteAllError={onDeleteAllError}
				isFetchingDeleteAllData={isFetchingDeleteAllData}
			/>
		);
	};
}

const mapStateToProps = state => {
		return {
			authenticationData: state.authentication.user,
			isLoadingAuthentication: state.authentication.isLoadingUser,

			comments: state.comments.comments,
			hasErroredComments: state.comments.hasErroredComments,
			isFetchingComments: state.comments.isFetchingComments,
			commentsError: state.comments.commentsError,

			isFetchingMoreComments: state.comments.isFetchingMoreComments,
			hasErroredMoreComments: state.comments.hasErroredMoreComments,
			moreCommentsError: state.comments.moreCommentsError,

			onCreateData: state.comments.onCreateData,
			isFetchingCreateData: state.comments.isFetchingCreateData,
			onCreateError: state.comments.onCreateError,

			onUpdateData: state.comments.onUpdateData,
			isFetchingUpdateData: state.comments.isFetchingUpdateData,
			onUpdateError: state.comments.onUpdateError,

			onDeleteData: state.comments.onDeleteData,
			isFetchingDeleteData: state.comments.isFetchingDeleteData,
			onDeleteError: state.comments.onDeleteError,

			onDeleteAllData: state.comments.onDeleteAllData,
			onDeleteAllError: state.comments.onDeleteAllError,
			isFetchingDeleteAllData: state.comments.isFetchingDeleteAllData
		};
	},
	mapDispatchToProps = dispatch => {
		return {
			onFetchAll: (id, seed, page, limit) => dispatch(actions.comments.fetchAll(id, seed, page, limit)),
			onUpdate: (id, updateData, cbs) => dispatch(actions.comments.update(id, updateData, cbs)),
			onDelete: (id, cbs) => dispatch(actions.comments.remove(id, cbs)),
			onCreate: (createData, cbs) => dispatch(actions.comments.create(createData, cbs))
		};
	};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CommentListScreen);
