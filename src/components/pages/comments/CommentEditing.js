import React, { Component } from "react";

export class CommentEditing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: "",
			isEditing: false
		};
	}

	componentWillReceiveProps = nextProps => {
		if (!nextProps.isEditingActive) this._handleEditClickOut();
	};

	_handleChange = event => {
		this.setState({ description: event.target.value });
	};

	_handleSubmit = event => {
		const { onEditClick } = this.props;
		// console.log("A response was submitted: " + this.state.description);
		event.preventDefault();
		this.setState({ description: "" }, () => {
			this._handleEditClickOut();
			onEditClick(-1);
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
					false
			};
		});
	};

	render = () => {
		const { data } = this.props,
			{ isEditing } = this.state;
		return (
			<div className="row">
				<article className="column comment-card">
					<header className="comment-card-heading-wrapper">
						<div className="comment-card-img-wrapper">
							<img src={data.thumbnail} alt="card infographic" className="comment-thumbnail" />
							<div className="comment-card-img-overlay" />
						</div>
						{isEditing ? (
							<div className="comment-card-title-wrapper">
								<h3>{data.author}</h3>
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
								className="txt-area"
								id="message"
								name="message"
								value={this.state.description}
								onChange={this._handleChange}
								placeholder="Remember, be nice!"
							/>
							<div className="comment-inputs-wrapper">
								<input type="submit" className="btn" value="post" />
								<input type="button" className="btn" value="cancel" onClick={this._handleEditClickOut} />
							</div>
						</form>
					)}
				</article>
			</div>
		);
	};
}
