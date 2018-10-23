import React from "react";
import { Camera } from "react-feather";
import { Loader, LazyLoad } from "../..";
import { bgImgEmptyStreet } from "assets/images";
import { iconMale } from "../../../assets";

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
			isLoadingUser: false,
			isLoadingUpdateData: false,
			selectedFile: null,
			userImage: ""
		};
	}

	componentDidUpdate = (prevProps, prevState, snapshot) => {
		if (this.props !== prevProps) {
			const { userData, isLoadingUpdateData } = this.props;
			if (prevProps.isLoadingUpdateData && !isLoadingUpdateData) {
				if (this.props.onUpdateError) {
					this.setState({
						isLoadingUpdateData: false,
						errorInputIndex: 6,
						errorInputMessage: this.props.onUpdateError.response.data.message || "There was a problem updating the user"
					});
				} else {
					this.setState({ isLoadingUpdateData: false, errorInputIndex: -1, errorInputMessage: "" }, () => {
						this.props.history.goBack();
						this.props.onGetOneAuthentication();
					});
				}
			} else if (!this.state.isLoadingUpdateData && Object.keys(userData).length) {
				let stateData = {},
					names = userData.name.split(" ");

				stateData.isLoadingUser = false;
				stateData.userImage = userData.image_url;
				stateData.firstName = names[0];
				stateData.lastName = names.length > 1 ? names[1] : "";
				stateData["bio"] = userData.bio ? userData.bio : "";
				stateData["location"] = userData.location ? userData.location : "";

				this.setState(prevState => stateData);
			}
		}
	};

	// componentWillReceiveProps = nextProps => {
	// 	if (this.props !== nextProps) {
	// 		const { userData, isLoadingUpdateData } = nextProps;
	// 		if (this.props.isLoadingUpdateData && !isLoadingUpdateData) {
	// 			if (nextProps.onUpdateError) {
	// 				this.setState({
	// 					isLoadingUpdateData: false,
	// 					errorInputIndex: 6,
	// 					errorInputMessage: nextProps.onUpdateError.response.data.message || "There was a problem updating the user"
	// 				});
	// 			} else {
	// 				this.setState({ isLoadingUpdateData: false, errorInputIndex: -1, errorInputMessage: "" }, () => {
	// 					this.props.history.goBack();
	// 					this.props.onGetOneAuthentication();
	// 				});
	// 			}
	// 		} else if (!this.state.isLoadingUpdateData && Object.keys(userData).length) {
	// 			let stateData = {},
	// 				names = userData.name.split(" ");

	// 			stateData.isLoadingUser = false;
	// 			stateData.userImage = userData.image_url;
	// 			stateData.firstName = names[0];
	// 			stateData.lastName = names.length > 1 ? names[1] : "";
	// 			stateData["bio"] = userData.bio ? userData.bio : "";
	// 			stateData["location"] = userData.location ? userData.location : "";

	// 			this.setState(prevState => stateData);
	// 		}
	// 	}
	// };

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

	_validateNames = (firstName, lastName) => {
		const regex = /^[a-zA-Z.'-]{1,15}$/;
		if (!regex.test(firstName)) {
			this.setState({
				errorInputIndex: 0,
				errorInputMessage:
					"First name can only contain letters, dots, dashes, apostrophes and cannot be longer than 15 characters"
			});
			return false;
		} else if (!regex.test(lastName)) {
			this.setState({
				errorInputIndex: 1,
				errorInputMessage:
					"Last name can only contain letters, dots, dashes, apostrophes and cannot be longer than 15 characters"
			});
			return false;
		} else return true;
	};

	_handleFormSubmit = event => {
		event.preventDefault();
		const { oldPassword, newPassword, bio, firstName, lastName, location, selectedFile } = this.state;
		const { userData } = this.props;

		if (firstName && lastName) {
			if (!this._validateNames(firstName, lastName)) return;
		}
		if (bio && (bio.length < 50 || bio.length > 300)) {
			this.setState({
				errorInputIndex: 3,
				errorInputMessage: "Bio description should be between 50 and 300 characters"
			});
			return;
		}
		if (oldPassword && newPassword) {
			if (oldPassword === newPassword) {
				this.setState({
					errorInputIndex: 5,
					errorInputMessage: "New password must be different from your previous password"
				});
				return;
			} else if (!this._validatePasswords(oldPassword, newPassword)) return;
		}

		this.setState({ errorInputIndex: -1, errorInputMessage: "", isLoadingUpdateData: true }, () => {
			// console.log(this.state);
			let updateData = {
				...(newPassword && { newPassword, oldPassword }),
				...(bio && { bio }),
				name: firstName + " " + lastName,
				...(location && { location }),
				...(selectedFile && { photos: selectedFile }),
				email: userData.email
			};
			let formData = new FormData();
			for (let key in updateData) formData.append(key, updateData[key]);
			// for (let pair of formData.entries()) console.log(`${pair[0]}: ${pair[1]}`);
			// console.log(updateData.photos, ": photos");
			this.props.onUpdate(userData._id, formData);
		});
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
			isLoadingUpdateData,
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
								required
								value={firstName}
								onChange={event => this.setState({ firstName: event.target.value })}
							/>
							{this.state.errorInputIndex === 0 && <span>{this.state.errorInputMessage}</span>}
						</div>
						<div className="user-form-input-wrapper">
							<input
								type="text"
								name="last-name"
								id="last-name"
								className="txt-input"
								placeholder="last name"
								autoComplete="off"
								required
								value={lastName}
								onChange={event => this.setState({ lastName: event.target.value })}
							/>
							{this.state.errorInputIndex === 1 && <span>{this.state.errorInputMessage}</span>}
						</div>
					</div>
					<div className="user-form-input-wrapper">
						<input
							type="text"
							name="location"
							id="location"
							className="txt-input"
							placeholder="Location (e.g. Brooklyn, NY)"
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
					{isLoadingUpdateData ? (
						<div className="user-form-loader-wrapper">
							<Loader />
						</div>
					) : (
						<input type="submit" className="btn" value="save" />
					)}
					{this.state.errorInputIndex === 6 && <span>{this.state.errorInputMessage}</span>}
				</div>
			</form>
		);
	};

	render = () => {
		const { userData, isLoadingUser } = this.props;
		return isLoadingUser ? (
			<div className="wrapper">
				<div className="news-loader-content">
					<Loader />
				</div>
			</div>
		) : (
			<div className="wrapper">
				<div className="news-masthead">
					<LazyLoad
						figure
						className="news-featured-image"
						style={{
							backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0.1)),
				url("${userData.featured_image_url ? userData.featured_image_url : bgImgEmptyStreet}")`
						}}
						src={userData.featured_image_url ? userData.featured_image_url : bgImgEmptyStreet}
						background="darken-light"
					/>
				</div>
				<div className="user-editing-content">
					<section className="container">
						<header className="row">
							<figure className="column user-heading-wrapper">
								<div className="user-img-wrapper" onClick={this._triggerFileInput}>
									<LazyLoad
										src={this.state.userImage ? this.state.userImage : iconMale}
										alt="User infographic"
										className="user-thumbnail"
									/>
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
