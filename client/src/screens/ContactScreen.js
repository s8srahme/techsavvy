import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "redux/actions";
import { Contact } from "components";

export class ContactScreen extends Component {
	componentDidMount = () => {
		window.scrollTo(0, 0);
	};

	render = () => {
		const { onContact, onContactData, isFetchingContactData, onContactError, history, location } = this.props;
		return (
			<Contact
				location={location}
				history={history}
				onContact={onContact}
				onContactData={onContactData}
				isFetchingContactData={isFetchingContactData}
				onContactError={onContactError}
			/>
		);
	};
}

const mapStateToProps = ({ mails, history }) => {
		return {
			isFetchingContactData: mails.isFetchingContactData,
			onContactData: mails.onContactData,
			onContactError: mails.onContactError,

			offsetTop: history.offsetTop
		};
	},
	mapDispatchToProps = dispatch => {
		return {
			onContact: (contactData, cbs) => dispatch(actions.mails.contact(contactData, cbs))
		};
	};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactScreen);
