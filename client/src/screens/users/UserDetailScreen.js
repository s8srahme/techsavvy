import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import actions from "redux/actions";
import { UserDetail, NotFound } from "../../components";

class UserDetailScreen extends Component {
	componentWillMount = () => {
		window.scrollTo(0, 0);
		// throw new Error("An error has occured in Buggy component!");
		if (!this.props.isLoadingUser) this.props.getOne({ id: this.props.match.params.userId });
	};

	render = () => {
		// const user = {
		// 	_id: "5b091dc6c1b03443f86693fa",
		// 	name: "Dan Abramov",
		// 	username: "gaearon",
		// 	featured_image_url: bgImgEmptyStreet,
		// 	bio:
		// 		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare enim sem, id ornare nulla sodales ut. Praesent facilisis, est nec vehicula lacinia, ex ex rhoncus diam, quis condimentum mauris lectus quis turpis. Integer quis nisl eu justo mollis vulputate ut et dolor.",
		// 	is_owner: false,
		// 	location: "London, UK",
		// 	image_url: "https://avatars1.githubusercontent.com/u/810438?s=460&v=4",
		// 	created_at: "2018-06-10T09:58:29.000Z",
		// 	updated_at: "2018-06-10T09:58:29.000Z",
		// 	email: "dan.abramov@me.com",
		// 	followers: ["5b166d7475f00d26a70a9bbb"],
		// 	following: ["5b166b564a03b6266f0ca5b6"],
		// 	counts: { articles: 18, followers: 512, following: 1008 }
		// };
		const {
			authenticationData,
			userData,
			isLoadingUser,
			userError,
			follow,
			unfollow,
			isLoadingFollowData,
			onFollowData,
			onUnfollowData,
			history
		} = this.props;

		if (userError && userError.response.status === 404) {
			return <NotFound history={history} />;
		}
		return (
			<UserDetail
				authenticationData={authenticationData}
				userData={userData}
				isLoadingUser={isLoadingUser}
				userError={userError}
				onFollow={follow}
				onUnfollow={unfollow}
				isLoadingFollowData={isLoadingFollowData}
				onFollowData={onFollowData}
				onUnfollowData={onUnfollowData}
			/>
		);
	};
}

const mapStateToProps = ({ users, authentication }) => ({
		authenticationData: authentication.user,

		userData: users.user,
		hasErroredUser: users.hasErroredUser,
		userError: users.userError,
		isLoadingUser: users.isLoadingUser,

		isLoadingFollowData: users.isLoadingFollowData,
		onFollowData: users.onFollowData,
		onUnfollowData: users.onUnfollowData
	}),
	mapDispatchToProps = dispatch =>
		bindActionCreators(
			{
				getOne: actions.users.getOne,
				follow: actions.users.follow,
				unfollow: actions.users.unfollow
			},
			dispatch
		),
	ConnectedComponent = connect(
		mapStateToProps,
		mapDispatchToProps
	)(UserDetailScreen);

export default props => {
	return <ConnectedComponent {...props} />;
};
