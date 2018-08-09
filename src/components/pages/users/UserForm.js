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
			username: "",
			errorInputIndex: -1,
			errorInputMessage: "",
			isLoginLoading: false,
			isRegisterLoading: false
		};
	}

	componentWillReceiveProps = nextProps => {
		if (this.props !== nextProps) {
			if (this.props.isLoadingLogin && !nextProps.isLoadingLogin)
				this.setState({ isLoginLoading: false, loginPassword: "", loginEmail: "" }, () => {
					nextProps.onClose();
					this.props.getOne({ id: "self" });
				});
		}
	};

	_handleTabClick = index => {
		this.setState({ activeTabIndex: index });
	};

	_validatePassword = password => {
		// const illegalChars = /[\W_]/;

		// if (password.length < 7) {
		// 	this.setState({ errorInputIndex: 2, errorInputMessage: "Password must contain a minimum of 8 characters" });
		// 	return false;
		// } else if (illegalChars.test(password)) {
		// 	this.setState({ errorInputIndex: 2, errorInputMessage: "Password must contain only letters and numbers" });
		// 	return false;
		// }
		// this.setState({ errorInputIndex: -1, errorInputMessage: "" });
		return true;
	};

	_handleFormSubmit = event => {
		event.preventDefault();
		const { registerPassword, loginPassword, confirmPassword, loginEmail } = this.state;

		if (confirmPassword) {
			if (registerPassword !== confirmPassword) {
				this.setState({ errorInputIndex: 3, errorInputMessage: "Password does not match" });
			} else if (this._validatePassword(registerPassword)) {
				this.setState({ isRegisterLoading: true }, () => console.log(this.state));
			}
		} else if (this._validatePassword(loginPassword)) {
			this.setState({ isLoginLoading: true }, () => {
				// console.log(this.state);
				this.props.login({ password: loginPassword, email: loginEmail });
			});
		}

		// this.props.history.push(`/blog/${post.slug}`);
	};

	_renderRegisterForm = () => {
		const { isRegisterLoading, registerPassword, confirmPassword, registerEmail, username } = this.state;
		return (
			<form name="user-register-form" id="user-register-form" className="row" onSubmit={this._handleFormSubmit}>
				<fieldset>
					{/* <legend>Let’s make things official.</legend> */}
					<div className="user-form-input-wrapper">
						<input
							type="text"
							name="username"
							id="username"
							className="txt-input"
							placeholder="Your username"
							autoComplete="off"
							required
							value={username}
							onChange={event => this.setState({ username: event.target.value })}
						/>
						{this.state.errorInputIndex === 0 && <span>Please enter a valid username</span>}
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
						{isRegisterLoading ? <Loader /> : <input type="submit" className="btn" value="get started" />}
					</div>
				</fieldset>
			</form>
		);
	};

	_renderLoginForm = () => {
		const { loginPassword, loginEmail, isLoginLoading } = this.state;
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
						{isLoginLoading ? <Loader /> : <input type="submit" className="btn" value="continue" />}
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
