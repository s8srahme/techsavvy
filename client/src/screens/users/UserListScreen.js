import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import actions from "redux/actions";
import { UserList } from "../../components";

class UserListScreen extends Component {
	componentWillMount = () => {
		window.scrollTo(0, 0);
		if (!this.props.isLoadingUsers && Object.keys(this.props.users).length === 0)
			this.props.getAll({ page: 1, limit: 5 });
	};

	render = () => {
		const { users, isLoadingUsers, usersError } = this.props;
		return <UserList users={users} isLoadingUsers={isLoadingUsers} usersError={usersError} />;
	};
}

const mapStateToProps = ({ users, authentication }) => ({
		users: users.users,
		hasErroredUsers: users.hasErroredUsers,
		usersError: users.usersError,
		isLoadingUsers: users.isLoadingUsers
	}),
	mapDispatchToProps = dispatch =>
		bindActionCreators(
			{
				getAll: actions.users.getAll
			},
			dispatch
		);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserListScreen);
