import React, { Component } from "react";
import { ChevronDown } from "react-feather";

class CommentEditing extends Component {
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

class CommentView extends Component {
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
								<ul className="comment-card-dropdown-list">
									<li onClick={() => this._handleEditClickIn()} className="comment-card-dropdown-item">
										Edit
									</li>
									<li onClick={() => {}} className="comment-card-dropdown-item">
										Delete
									</li>
								</ul>
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
						<CommentView
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
