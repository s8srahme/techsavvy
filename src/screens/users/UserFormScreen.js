import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { UserForm } from "../../components";
import actions from "redux/actions";

class UserFormScreen extends Component {
	render = () => {
		return <UserForm {...this.props} />;
	};
}

const mapStateToProps = ({ authentication }) => authentication,
	mapDispatchToProps = dispatch =>
		bindActionCreators(
			{
				...actions.authentication,
				...actions.users
			},
			dispatch
		);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserFormScreen);
