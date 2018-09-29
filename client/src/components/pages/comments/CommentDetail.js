import React, { Component } from "react";
import moment from "moment";
import { ChevronDown, Edit2, Delete } from "react-feather";
import { Dropdown, Loader } from "../..";
import { iconMale } from "../../../assets";

export class CommentDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoadingUpdate: false,
			isLoadingDelete: false,
			isEditing: false,
			description: "",
			isLoadingSubmit: false,
			errorInputIndex: -1,
			errorInputMessage: ""
		};
	}

	componentWillMount = () => {
		const { commentData } = this.props;
		this.setState({ description: commentData.text });
	};

	componentWillReceiveProps = nextProps => {
		if (this.props !== nextProps) {
			if (!nextProps.isEditingActive) this._handleEditClickOut();
			if (Object.keys(nextProps.commentData).length && !nextProps.isFetchingUpdateData)
				this.setState({ description: nextProps.commentData.text });
		}
	};

	_handleDeleteClick = () => {
		const { onDelete, commentData, onDropdownClick } = this.props;
		this.setState({ isLoadingDelete: true }, () => {
			onDelete(commentData._id, {
				onSuccessCb: () => {
					this.setState(
						{
							isLoadingDelete: false,
							errorInputIndex: -1,
							errorInputMessage: ""
						},
						() => {
							onDropdownClick(-1);
						}
					);
				},
				onFailureCb: err => {
					this.setState({
						isLoadingDelete: false,
						errorInputIndex: 0,
						errorInputMessage: err.response.commentData.message || "There was a problem deleting the user"
					});
				}
			});
		});
	};

	_handleEditClickIn = async () => {
		const { index, onDropdownClick, onEditClick } = this.props;
		await onEditClick(index);
		this.setState({ isEditing: true }, () => {
			onDropdownClick(-1);
		});
	};

	_handleEditClickOut = () => {
		this.setState({ isEditing: false });
	};

	_handleChange = event => {
		this.setState({ description: event.target.value });
	};

	_handleSubmit = event => {
		const { onEditClick, onUpdate, commentData } = this.props;
		const { description } = this.state;
		// console.log("A response was submitted: " + this.state.description);
		event.preventDefault();
		this.setState({ isLoadingSubmit: true }, () => {
			onUpdate(
				commentData._id,
				{ text: description },
				{
					onSuccessCb: () => {
						this.setState(
							{
								isLoadingSubmit: false,
								description: "",
								errorInputIndex: -1,
								errorInputMessage: ""
							},
							() => {
								this._handleEditClickOut();
								onEditClick(-1);
							}
						);
					},
					onFailureCb: err => {
						this.setState({
							isLoadingSubmit: false,
							errorInputIndex: 1,
							errorInputMessage: err.response.data.message || "There was a problem updating the comment"
						});
					}
				}
			);
		});
	};

	render = () => {
		const { index, commentData, isDropdownActive, onDropdownClick, authenticationData } = this.props,
			{
				isEditing,
				errorInputIndex,
				errorInputMessage,
				isLoadingSubmit,
				description,
				isLoadingDelete,
				isLoadingUpdate
			} = this.state;
		return (
			<div className="row">
				<article className="column comment-card">
					<header className="comment-card-heading-wrapper">
						<div className="comment-card-img-wrapper">
							<img
								src={commentData.image_url ? commentData.image_url : iconMale}
								alt="Card infographic"
								className="comment-thumbnail"
							/>
							<div className="comment-card-img-overlay" />
						</div>
						<div className="comment-card-title-wrapper">
							<h3>{commentData.author_id.name ? commentData.author_id.name : "unnamed author"}</h3>
							<time>{moment(commentData.created_at).fromNow()}</time>
						</div>
						{commentData.author_id._id === authenticationData._id && (
							<div className="comment-card-dropdown-wrapper">
								<div className="comment-card-dropdown-btn" onClick={() => onDropdownClick(index)}>
									<ChevronDown className="comment-card-dropdown-icon" />
								</div>
								{isDropdownActive && (
									// <ul className="comment-card-dropdown-list">
									// 	<li onClick={() => this._handleEditClickIn() } className="comment-card-dropdown-item">
									// 		Edit
									// 	</li>
									// 	<li onClick={() => {}} className="comment-card-dropdown-item">
									// 		Delete
									// 	</li>
									// </ul>
									<Dropdown
										shouldDropdownShrink={false}
										items={[
											{
												icon: Edit2,
												title: "Edit",
												isLoadingSelf: isLoadingUpdate,
												isLoadingSibling: isLoadingDelete,
												onClick: () => this._handleEditClickIn()
											},
											{
												icon: Delete,
												title: "Delete",
												isLoadingSelf: isLoadingDelete,
												isLoadingSibling: isLoadingUpdate,
												onClick: this._handleDeleteClick
											}
										]}
									/>
								)}
							</div>
						)}
					</header>
					{!isEditing ? (
						<p>{commentData.text}</p>
					) : (
						<form
							// action=""
							// method="post"
							// name="comment-form"
							id="comment-form"
							// className=""
							onSubmit={this._handleSubmit}
						>
							<textarea
								className="txt-area"
								id="message"
								name="message"
								value={description}
								onChange={this._handleChange}
								placeholder="Remember, be nice!"
							/>
							<div className="comment-inputs-wrapper">
								{isLoadingSubmit ? (
									<Loader />
								) : (
									<div className="comment-inputs">
										<input type="submit" className="btn" value="post" />
										<input type="button" className="btn" value="cancel" onClick={this._handleEditClickOut} />
									</div>
								)}
								{errorInputIndex === 1 && <span>{errorInputMessage}</span>}
							</div>
						</form>
					)}
					{errorInputIndex === 0 && <span>{errorInputMessage}</span>}
				</article>
			</div>
		);
	};
}
