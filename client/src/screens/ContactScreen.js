import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "redux/actions";
import { Contact } from "components";

export class ContactScreen extends Component {
	componentDidMount = () => {
		window.scrollTo(0, 0);
	};

	render = () => {
		const { onCreate, onCreateData, isFetchingCreateData, onCreateError, history, location } = this.props;
		return (
			<Contact
				location={location}
				history={history}
				onCreate={onCreate}
				onCreateData={onCreateData}
				isFetchingCreateData={isFetchingCreateData}
				onCreateError={onCreateError}
			/>
		);
	};
}

const mapStateToProps = ({ mails, history }) => {
		return {
			isFetchingCreateData: mails.isFetchingCreateData,
			onCreateData: mails.onCreateData,
			onCreateError: mails.onCreateError,

			offsetTop: history.offsetTop
		};
	},
	mapDispatchToProps = dispatch => {
		return {
			onCreate: (createData, cbs) => dispatch(actions.mails.create(createData, cbs))
		};
	};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactScreen);
