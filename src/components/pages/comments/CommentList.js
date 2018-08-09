import React, { Component } from "react";
import { CommentEditing, CommentDetail } from "../..";

export class CommentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeDropdownIndex: -1,
			activeEditingIndex: -1
		};
	}

	_handleDropdownClick = index => {
		this.setState({ activeDropdownIndex: this.state.activeDropdownIndex === index ? -1 : index });
	};

	_handleEditClick = index => {
		this.setState({ activeEditingIndex: index });
	};

	render = () => {
		const { comments } = this.props,
			{ activeDropdownIndex, activeEditingIndex } = this.state;
		return (
			<section
				className="comment-content"
				onClick={() => {
					if (activeDropdownIndex !== -1) this._handleDropdownClick(-1);
				}}
			>
				<div className="container">
					<div className="row">
						<hgroup className="column comment-heading-wrapper">
							<h2>Responses</h2>
							<h4>Join the discussion and tell us your opinion.</h4>
						</hgroup>
					</div>
					<CommentEditing
						index={0}
						data={comments[0]}
						onEditClick={this._handleEditClick}
						isEditingActive={0 === activeEditingIndex ? true : false}
					/>
					{comments.map((comment, i) => (
						<CommentDetail
							key={i}
							index={i + 1}
							data={comment}
							onDropdownClick={this._handleDropdownClick}
							isDropdownActive={i + 1 === activeDropdownIndex ? true : false}
							onEditClick={this._handleEditClick}
							isEditingActive={i + 1 === activeEditingIndex ? true : false}
						/>
					))}
				</div>
			</section>
		);
	};
}
