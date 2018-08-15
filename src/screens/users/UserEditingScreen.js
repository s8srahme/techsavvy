import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import actions from "redux/actions";
import { UserEditing, NotFound } from "../../components";

export class UserEditingScreen extends Component {
	componentWillMount = () => {
		// console.log(this.props.match);
		window.scrollTo(0, 0);
		this.props.getOneUser({ id: this.props.match.params.userId });
	};

	render = () => {
		const {
			isLoadingAuthentication,
			authenticationData,
			userData,
			isLoadingUser,
			userError,
			update,
			onUpdateData,
			isLoadingUpdateData,
			onUpdateError,
			getOneAuthentication
		} = this.props;

		if (
			!isLoadingAuthentication &&
			(this.props.match.params.userId !== authenticationData._id || (userError && userError.response.status === 404))
		) {
			return <NotFound />;
		}
		return (
			<UserEditing
				history={this.props.history}
				userData={userData}
				isLoadingUser={isLoadingUser}
				userError={userError}
				onUpdate={update}
				onUpdateData={onUpdateData}
				isLoadingUpdateData={isLoadingUpdateData}
				onUpdateError={onUpdateError}
				onGetOneAuthentication={() => getOneAuthentication({ id: this.props.match.params.userId })}
			/>
		);
	};
}

const mapStateToProps = ({ users, authentication }) => ({
		authenticationData: authentication.user,
		isLoadingAuthentication: authentication.isLoadingUser,

		userData: users.user,
		hasErroredUser: users.hasErroredUser,
		userError: users.userError,
		isLoadingUser: users.isLoadingUser,

		onUpdateData: users.onUpdateData,
		onUpdateError: users.onUpdateError,
		isLoadingUpdateData: users.isLoadingUpdateData
	}),
	mapDispatchToProps = dispatch =>
		bindActionCreators(
			{
				getOneAuthentication: actions.authentication.getOne,
				getOneUser: actions.users.getOne,
				update: actions.users.update
			},
			dispatch
		);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserEditingScreen);
