import React, { Component } from "react";
import { CommentEditing, CommentDetail, Loader } from "../..";

export class CommentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeDropdownIndex: -1,
			activeEditingIndex: -1,
			isFetchingComments: true
			// comments: {}
		};
	}

	_handleDropdownClick = index => {
		this.setState({ activeDropdownIndex: this.state.activeDropdownIndex === index ? -1 : index });
	};

	_handleEditClick = index => {
		this.setState({ activeEditingIndex: index });
	};

	componentWillReceiveProps = nextProps => {
		if (this.props !== nextProps) {
			if (this.state.isFetchingComments && this.props.isFetchingComments && !nextProps.isFetchingComments) {
				this.setState({
					isFetchingComments: false
					//  comments: nextProps.comments
				});
			}
			//  else if (
			// 	(this.props.isFetchingCreateData && !nextProps.isFetchingCreateData) ||
			// 	(this.props.isFetchingMoreComments && !nextProps.isFetchingMoreComments) ||
			// 	(this.props.isFetchingDeleteData && !nextProps.isFetchingDeleteData)
			// ) {
			// 	this.setState({ comments: nextProps.comments });
			// }
		}
	};

	// shouldComponentUpdate = (nextProps, nextState) => {
	// 	if (
	// 		this.props.isFetchingCreateData !== nextProps.isFetchingCreateData ||
	// 		JSON.stringify(this.state.comments) !== JSON.stringify(nextState.comments)
	// 	)
	// 		return true;
	// 	return false;
	// };

	render = () => {
		const {
				onUpdate,
				isFetchingUpdateData,
				onCreate,
				onDelete,
				comments,
				// hasErroredComments,
				// isFetchingComments,
				// commentsError,
				onFetchMore,
				isFetchingMoreComments,
				isLoadingAuthentication,
				authenticationData,
				articleId
			} = this.props,
			{ activeDropdownIndex, activeEditingIndex } = this.state;
		let commentsData = Object.keys(comments).length && comments.data ? comments.data.comments : [];

		return this.state.isFetchingComments || isLoadingAuthentication ? (
			<div className="wrapper">
				<div className={"news-loader-content darken pull"}>
					<Loader />
				</div>
			</div>
		) : (
			<section
				className="comment-content"
				// onClick={() => {
				// 	if (activeDropdownIndex !== -1) this._handleDropdownClick(-1);
				// }}
			>
				<div className="container">
					<div className="row">
						<hgroup className="column comment-heading-wrapper">
							<h2>Responses</h2>
							<h4>Join the discussion and tell us your opinion.</h4>
						</hgroup>
					</div>
					<CommentEditing
						articleId={articleId}
						onCreate={onCreate}
						index={0}
						authenticationData={authenticationData}
						onEditClick={this._handleEditClick}
						isEditingActive={0 === activeEditingIndex ? true : false}
					/>
					{commentsData.map((comment, i) => (
						<CommentDetail
							articleId={articleId}
							key={i}
							index={i + 1}
							authenticationData={authenticationData}
							commentData={comment}
							onDropdownClick={this._handleDropdownClick}
							isDropdownActive={i + 1 === activeDropdownIndex ? true : false}
							onEditClick={this._handleEditClick}
							isEditingActive={i + 1 === activeEditingIndex ? true : false}
							onDelete={onDelete}
							onUpdate={onUpdate}
							isFetchingUpdateData={isFetchingUpdateData}
						/>
					))}
					{commentsData.length && comments.meta.page !== comments.meta.pages ? (
						<div className="row comment-btn-wrapper">
							{isFetchingMoreComments ? (
								<Loader />
							) : (
								<button className="btn" onClick={onFetchMore}>
									show more
								</button>
							)}
						</div>
					) : null}
				</div>
			</section>
		);
	};
}
