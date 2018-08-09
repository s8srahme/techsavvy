import React, { Component } from "react";
import { ChevronDown, Edit2, Delete } from "react-feather";
import { Dropdown } from "../..";

export class CommentDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			description: ""
		};
	}

	componentDidMount = () => {
		const { data } = this.props;
		this.setState({ description: data.description });
	};

	componentWillReceiveProps = nextProps => {
		if (!nextProps.isEditingActive) this._handleEditClickOut();
	};

	_handleEditClickIn = async () => {
		const {
			index,
			// onDropdownClick,
			onEditClick
		} = this.props;
		await onEditClick(index);
		this.setState({ isEditing: true }, () => {
			// onDropdownClick(-1);
		});
	};

	_handleEditClickOut = () => {
		this.setState({ isEditing: false });
	};

	_handleChange = event => {
		this.setState({ description: event.target.value });
	};

	_handleSubmit = event => {
		const { onEditClick } = this.props;
		// console.log("A response was submitted: " + this.state.description);
		event.preventDefault();
		this._handleEditClickOut();
		onEditClick(-1);
	};

	render = () => {
		const { index, data, isDropdownActive, onDropdownClick } = this.props,
			{ isEditing } = this.state;
		return (
			<div className="row">
				<article className="column comment-card">
					<header className="comment-card-heading-wrapper">
						<div className="comment-card-img-wrapper">
							<img src={data.thumbnail} alt="card infographic" className="comment-thumbnail" />
							<div className="comment-card-img-overlay" />
						</div>
						<div className="comment-card-title-wrapper">
							<h3>{data.author}</h3>
							<time>{data.timestamp}</time>
						</div>
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
									shouldDropdownShrink={this.state.offsetTop > 0}
									items={[
										{ icon: Edit2, title: "Edit", onClick: () => this._handleEditClickIn() },
										{ icon: Delete, title: "Delete", onClick: () => {} }
									]}
								/>
							)}
						</div>
					</header>
					{!isEditing ? (
						<p>{data.description}</p>
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
								value={this.state.description}
								onChange={this._handleChange}
								placeholder="Remember, be nice!"
							/>
							<div className="comment-inputs-wrapper">
								<input type="submit" className="btn" value="post" />
								<input type="button" className="btn" value="cancel" onClick={() => this._handleEditClickOut()} />
							</div>
						</form>
					)}
				</article>
			</div>
		);
	};
}
