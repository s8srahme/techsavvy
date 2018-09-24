import React from "react";
import { Modal, Loader } from "../..";

export class UserForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTabIndex: 0,
			registerPassword: "",
			loginPassword: "",
			confirmPassword: "",
			registerEmail: "",
			loginEmail: "",
			names: "",
			errorInputIndex: -1,
			errorInputMessage: "",
			isLoadingLogin: false,
			isLoadingRegister: false
		};
	}

	componentWillReceiveProps = nextProps => {
		if (this.props !== nextProps) {
			if (this.props.isLoadingLogin && !nextProps.isLoadingLogin) {
				if (nextProps.loginError) {
					this.setState({
						isLoadingLogin: false,
						errorInputIndex: 4,
						errorInputMessage: nextProps.loginError.response.data.message || "There was a problem finding the user"
					});
				} else {
					this.setState({ isLoadingLogin: false, loginPassword: "", loginEmail: "" }, () => {
						nextProps.onClose();
						this.props.getOne({ id: "self" });
					});
				}
			} else if (this.props.isLoadingRegister && !nextProps.isLoadingRegister) {
				if (!nextProps.registerError) {
					this.setState(
						{ isLoadingRegister: false, registerPassword: "", confirmPassword: "", names: "", registerEmail: "" },
						() => {
							this._handleTabClick(0);
						}
					);
				} else {
					this.setState({
						isLoadingRegister: false,
						errorInputIndex: 4,
						errorInputMessage:
							nextProps.registerError.response.data.message ||
							"There was a problem adding the information to the database"
					});
				}
			}
		}
	};

	_handleTabClick = index => {
		this.setState({ activeTabIndex: index, errorInputIndex: -1, errorInputMessage: "" });
	};

	_validatePassword = password => {
		const illegalChars = /[\W_]/;

		if (password.length < 7) {
			this.setState({ errorInputIndex: 2, errorInputMessage: "Password must contain a minimum of 8 characters" });
			return false;
		} else if (illegalChars.test(password)) {
			this.setState({ errorInputIndex: 2, errorInputMessage: "Password must contain only letters and numbers" });
			return false;
		}
		this.setState({ errorInputIndex: -1, errorInputMessage: "" });
		return true;
	};

	_validateNames = names => {
		const regex = /^[a-zA-Z .'-]{1,30}$/;
		if (names.split(" ").length > 2) {
			this.setState({
				errorInputIndex: 0,
				errorInputMessage: "First and last names cannot be longer than 2 words"
			});
			return false;
		} else if (!regex.test(names)) {
			this.setState({
				errorInputIndex: 0,
				errorInputMessage:
					"First and last names can only contain letters, dots, dashes, apostrophes and cannot be longer than 30 characters combined"
			});
			return false;
		} else return true;
	};

	_handleFormSubmit = event => {
		event.preventDefault();
		const {
			activeTabIndex,
			registerEmail,
			registerPassword,
			confirmPassword,
			names,
			loginPassword,
			loginEmail
		} = this.state;

		if (activeTabIndex === 1 && confirmPassword) {
			if (registerPassword !== confirmPassword) {
				this.setState({ errorInputIndex: 3, errorInputMessage: "Password does not match" });
			} else if (this._validateNames(names) && this._validatePassword(registerPassword)) {
				this.setState({ isLoadingRegister: true }, () => {
					// console.log(this.state);
					this.props.register({ password: registerPassword, email: registerEmail, name: names });
				});
			}
		} else if (this._validatePassword(loginPassword)) {
			this.setState({ isLoadingLogin: true }, () => {
				// console.log(this.state);
				this.props.login({ password: loginPassword, email: loginEmail });
			});
		}

		// this.props.history.push(`/blog/${post.slug}`);
	};

	_renderRegisterForm = () => {
		const { isLoadingRegister, registerPassword, confirmPassword, registerEmail, names } = this.state;
		return (
			<form name="user-register-form" id="user-register-form" className="row" onSubmit={this._handleFormSubmit}>
				<fieldset>
					{/* <legend>Let’s make things official.</legend> */}
					<div className="user-form-input-wrapper">
						<input
							type="text"
							name="names"
							id="names"
							className="txt-input"
							placeholder="first &amp; last names"
							autoComplete="off"
							required
							value={names}
							onChange={event => this.setState({ names: event.target.value })}
						/>
						{this.state.errorInputIndex === 0 && <span>{this.state.errorInputMessage}</span>}
					</div>
					<div className="user-form-input-wrapper">
						<input
							type="email"
							name="register-email"
							id="register-email"
							className="txt-input"
							placeholder="Your email"
							autoComplete="off"
							required
							value={registerEmail}
							onChange={event => this.setState({ registerEmail: event.target.value })}
						/>
						{this.state.errorInputIndex === 1 && <span>Please enter a valid email address</span>}
					</div>
					<div className="user-form-input-wrapper">
						<input
							type="password"
							name="register-password"
							id="register-password"
							className="txt-input"
							placeholder="Password"
							autoComplete="off"
							required
							value={registerPassword}
							onChange={event => this.setState({ registerPassword: event.target.value })}
						/>
						{this.state.errorInputIndex === 2 && <span>{this.state.errorInputMessage}</span>}
					</div>
					<div className="user-form-input-wrapper">
						<input
							type="password"
							name="confirm-password"
							id="confirm-password"
							className="txt-input"
							placeholder="Confirm Password"
							autoComplete="off"
							required
							value={confirmPassword}
							onChange={event => this.setState({ confirmPassword: event.target.value })}
						/>
						{this.state.errorInputIndex === 3 && <span>{this.state.errorInputMessage}</span>}
					</div>
					<div className="user-form-input-wrapper">
						{isLoadingRegister ? <Loader /> : <input type="submit" className="btn" value="get started" />}
						{this.state.errorInputIndex === 4 && <span>{this.state.errorInputMessage}</span>}
					</div>
				</fieldset>
			</form>
		);
	};

	_renderLoginForm = () => {
		const { loginPassword, loginEmail, isLoadingLogin } = this.state;
		return (
			<form name="user-login-form" id="user-login-form" className="row" onSubmit={this._handleFormSubmit}>
				<fieldset>
					{/* <legend>Welcome back.</legend> */}
					<div className="user-form-input-wrapper">
						<input
							type="email"
							name="login-email"
							id="login-email"
							className="txt-input"
							placeholder="Your email"
							autoComplete="off"
							required
							value={loginEmail}
							onChange={event => this.setState({ loginEmail: event.target.value })}
						/>
						{this.state.errorInputIndex === 1 && <label htmlFor="email">Please enter a valid email address</label>}
					</div>
					<div className="user-form-input-wrapper">
						<input
							type="password"
							name="login-password"
							id="login-password"
							className="txt-input"
							placeholder="Password"
							autoComplete="off"
							required
							value={loginPassword}
							onChange={event => this.setState({ loginPassword: event.target.value })}
						/>
						{this.state.errorInputIndex === 2 && <label htmlFor="password">{this.state.errorInputMessage}</label>}
					</div>
					<div className="user-form-input-wrapper">
						{isLoadingLogin ? <Loader /> : <input type="submit" className="btn" value="continue" />}
						{this.state.errorInputIndex === 4 && <span>{this.state.errorInputMessage}</span>}
					</div>
				</fieldset>
			</form>
		);
	};

	render = () => {
		const { showModal, onClose } = this.props,
			{ activeTabIndex } = this.state;
		return (
			<Modal showModal={showModal} onClose={onClose}>
				<div className="user-form-content">
					<section className="container">
						<header className="row user-form-heading-wrapper">
							<h2 className={`${activeTabIndex === 0 ? "active" : ""}`} onClick={() => this._handleTabClick(0)}>
								Sign in
							</h2>
							<h2 className={`${activeTabIndex === 1 ? "shrink" : ""}`}>or</h2>
							<h2 className={`${activeTabIndex === 1 ? "active" : ""}`} onClick={() => this._handleTabClick(1)}>
								Sign up
							</h2>
						</header>
						{activeTabIndex === 0 ? this._renderLoginForm() : this._renderRegisterForm()}
					</section>
				</div>
			</Modal>
		);
	};
}
