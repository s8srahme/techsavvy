import React, { Component } from "react";
import { iconMale } from "../../../assets";
import { Loader } from "components";

export class CommentEditing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: "",
			isEditing: false,
			isLoadingSubmit: false,
			errorInputIndex: -1,
			errorInputMessage: ""
		};
	}

	componentWillReceiveProps = nextProps => {
		if (this.props !== nextProps) {
			if (!nextProps.isEditingActive) this._handleEditClickOut();
		}
	};

	_handleChange = event => {
		this.setState({ description: event.target.value });
	};

	_handleSubmit = event => {
		const { onEditClick, onCreate, articleId, authenticationData } = this.props;
		const { description } = this.state;
		// console.log("A response was submitted: " + this.state.description);
		event.preventDefault();
		this.setState({ isLoadingSubmit: true }, () => {
			onCreate(
				{ text: description, article_id: articleId, author_id: authenticationData._id },
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
							errorInputIndex: 0,
							errorInputMessage:
								err.response.data.message || "There was a problem adding the information to the database"
						});
					}
				}
			);
		});
	};

	_handleEditClickIn = async () => {
		const { index, onEditClick } = this.props;
		await onEditClick(index);
		this.setState({ isEditing: true });
	};

	_handleEditClickOut = () => {
		this.setState((prevState, props) => {
			return {
				isEditing:
					// !prevState.isEditing
					false,
				errorInputIndex: -1,
				errorInputMessage: "",
				description: ""
			};
		});
	};

	render = () => {
		const { authenticationData } = this.props,
			{ isEditing, isLoadingSubmit } = this.state;
		return (
			<div className="row">
				<article className="column comment-card">
					<header className="comment-card-heading-wrapper">
						<div className="comment-card-img-wrapper">
							<img
								src={authenticationData.image_url ? authenticationData.image_url : iconMale}
								alt="card infographic"
								className="comment-thumbnail"
							/>
							<div className="comment-card-img-overlay" />
						</div>
						{isEditing ? (
							<div className="comment-card-title-wrapper">
								<h3>{authenticationData.name}</h3>
							</div>
						) : (
							<div className="comment-card-clickable-title-wrapper" onClick={this._handleEditClickIn}>
								<h3>Write a response...</h3>
							</div>
						)}
					</header>
					{isEditing && (
						<form id="comment-form" onSubmit={this._handleSubmit}>
							<textarea
								required
								className="txt-area"
								id="message"
								name="message"
								value={this.state.description}
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
								{this.state.errorInputIndex === 0 && <span>{this.state.errorInputMessage}</span>}
							</div>
						</form>
					)}
				</article>
			</div>
		);
	};
}
