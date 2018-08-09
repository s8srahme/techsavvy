import React from "react";
import { Camera } from "react-feather";
import { Loader } from "../..";

export class UserEditing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPassword: "",
			newPassword: "",
			// confirmPassword: "",
			isOldPasswordRequired: false,
			isNewPasswordRequired: false,
			// email: "",
			// username: "",
			firstName: "",
			lastName: "",
			location: "",
			bio: "",
			errorInputIndex: -1,
			errorInputMessage: "",
			isLoading: false,
			selectedFile: null,
			userImage: null
		};
	}

	componentWillMount = () => {
		const { data } = this.props;
		if (data.image_url) this.setState({ userImage: data.image_url });
	};

	_validatePasswords = (oldPassword, newPassword) => {
		const illegalChars = /[\W_]/;

		if (oldPassword.length < 7) {
			this.setState({ errorInputIndex: 4, errorInputMessage: "Password must contain a minimum of 8 characters" });
			return false;
		} else if (illegalChars.test(oldPassword)) {
			this.setState({ errorInputIndex: 4, errorInputMessage: "Password must contain only letters and numbers" });
			return false;
		} else if (newPassword.length < 7) {
			this.setState({ errorInputIndex: 5, errorInputMessage: "Password must contain a minimum of 8 characters" });
			return false;
		} else if (illegalChars.test(newPassword)) {
			this.setState({ errorInputIndex: 5, errorInputMessage: "Password must contain only letters and numbers" });
			return false;
		}
		this.setState({ errorInputIndex: -1, errorInputMessage: "" });
		return true;
	};

	_handleFormSubmit = event => {
		event.preventDefault();
		const { oldPassword, newPassword, bio } = this.state;

		if (bio && (bio.length < 50 || bio.length > 300)) {
			this.setState({
				errorInputIndex: 3,
				errorInputMessage: "Bio description should be between 50 and 300 characters"
			});
			return;
		} else if (oldPassword && newPassword) {
			if (oldPassword === newPassword) {
				this.setState({
					errorInputIndex: 5,
					errorInputMessage: "New password must be different from your previous password"
				});
				return;
			} else if (!this._validatePasswords(oldPassword, newPassword)) return;
		}

		this.setState({ errorInputIndex: -1, errorInputMessage: "", isLoading: true }, () => console.log(this.state));

		// this.props.history.push(`/blog/${post.slug}`);
	};

	_handleFileChange = event => {
		if (event.target.files && event.target.files[0]) {
			this.setState({ selectedFile: event.target.files[0] }, () => {
				let reader = new FileReader();
				reader.onload = e => {
					this.setState({ userImage: e.target.result });
				};
				reader.readAsDataURL(this.state.selectedFile);
			});
		}
	};

	_triggerFileInput = () => this.fileInput.click();

	_renderForm = () => {
		const {
			isLoading,
			oldPassword,
			newPassword,
			isOldPasswordRequired,
			isNewPasswordRequired,
			// email,
			firstName,
			lastName,
			// username,
			location,
			bio
		} = this.state;
		return (
			<form name="user-form" id="user-form" className="row" onSubmit={this._handleFormSubmit}>
				<fieldset>
					<legend>Basic information</legend>
					<div className="user-form-inputs-wrapper">
						<div className="user-form-input-wrapper">
							<input
								type="text"
								name="first-name"
								id="first-name"
								className="txt-input"
								placeholder="first name"
								autoComplete="off"
								// required
								value={firstName}
								onChange={event => this.setState({ firstName: event.target.value })}
							/>
							{/* {this.state.errorInputIndex === 0 && <span>Please enter your first name</span>} */}
						</div>
						<div className="user-form-input-wrapper">
							<input
								type="text"
								name="last-name"
								id="last-name"
								className="txt-input"
								placeholder="last name"
								autoComplete="off"
								// required
								value={lastName}
								onChange={event => this.setState({ lastName: event.target.value })}
							/>
							{/* {this.state.errorInputIndex === 1 && <span>Please enter your last name</span>} */}
						</div>
					</div>
					<div className="user-form-input-wrapper">
						<input
							type="text"
							name="location"
							id="location"
							className="txt-input"
							placeholder="location"
							autoComplete="off"
							// required
							value={location}
							onChange={event => this.setState({ location: event.target.value })}
						/>
						{/* {this.state.errorInputIndex === 2 && <span>Please enter your location</span>} */}
					</div>
					<div className="user-form-input-wrapper">
						<textarea
							className="txt-area inverse"
							id="bio"
							name="bio"
							value={bio}
							placeholder="short bio"
							// required
							onChange={event => this.setState({ bio: event.target.value })}
						/>
						{this.state.errorInputIndex === 3 && <span>{this.state.errorInputMessage}</span>}
					</div>
				</fieldset>
				<fieldset>
					<legend>Change password</legend>
					<div className="user-form-inputs-wrapper">
						<div className="user-form-input-wrapper">
							<input
								type="password"
								name="old-password"
								id="old-password"
								className="txt-input"
								placeholder="old password"
								autoComplete="off"
								required={isOldPasswordRequired}
								value={oldPassword}
								onChange={event =>
									this.setState({ oldPassword: event.target.value }, () => {
										if (this.state.oldPassword) this.setState({ isNewPasswordRequired: true });
										else this.setState({ isNewPasswordRequired: false });
									})
								}
							/>
							{this.state.errorInputIndex === 4 && <span>{this.state.errorInputMessage}</span>}
						</div>
						<div className="user-form-input-wrapper">
							<input
								type="password"
								name="new-password"
								id="new-password"
								className="txt-input"
								placeholder="new password"
								autoComplete="off"
								required={isNewPasswordRequired}
								value={newPassword}
								onChange={event =>
									this.setState({ newPassword: event.target.value }, () => {
										if (this.state.newPassword) this.setState({ isOldPasswordRequired: true });
										else this.setState({ isOldPasswordRequired: false });
									})
								}
							/>
							{this.state.errorInputIndex === 5 && <span>{this.state.errorInputMessage}</span>}
						</div>
					</div>
				</fieldset>
				<div className="user-form-btn-wrapper">
					{isLoading ? (
						<div className="user-form-loader-wrapper">
							<Loader />
						</div>
					) : (
						<input type="submit" className="btn" value="save" />
					)}
				</div>
			</form>
		);
	};

	render = () => {
		const { data } = this.props;
		return (
			<div className="wrapper">
				<div className="news-masthead">
					<figure
						className="news-featured-image"
						style={{
							backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0.1)),
			url("${data.featured_image_url}")`
						}}
					/>
				</div>
				<div className="user-editing-content">
					<section className="container">
						<header className="row">
							<figure className="column user-heading-wrapper">
								<div className="user-img-wrapper" onClick={this._triggerFileInput}>
									<img src={this.state.userImage} alt="" className="user-thumbnail" />
									<div className="user-img-overlay">
										<Camera className="user-img-overlay-icon" />
									</div>
									<input
										ref={fileInput => (this.fileInput = fileInput)}
										type="file"
										onChange={this._handleFileChange}
									/>
								</div>
							</figure>
						</header>
						{this._renderForm()}
					</section>
				</div>
			</div>
		);
	};
}
