import React, { Component } from "react";
import { en, bn } from "config";

export const LocaleContext = React.createContext();
const langs = {
	en,
	bn
};

export default class LocaleContextProvider extends Component {
	state = {
		preferredLocale: "en"
	};

	componentDidMount = () => {
		const code = localStorage.getItem("preferredLocale");
		if (code) this.setState({ preferredLocale: code });
	};

	_changeLanguage = ({ code }) => {
		this.setState(
			{
				preferredLocale: code
			},
			() => {
				localStorage.setItem("preferredLocale", code);
			}
		);
	};

	render = () => {
		return (
			<LocaleContext.Provider value={{ ...this.state, ...{ onChangeLanguage: this._changeLanguage }, ...{ langs } }}>
				{this.props.children}
			</LocaleContext.Provider>
		);
	};
}
