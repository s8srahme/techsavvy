import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import {
	iconMale
	// iconFemale,
	// bgImgEmptyStreet
} from "assets";
import { Loader, LazyLoad } from "components";
import { MapPin } from "react-feather";

export class UserDetail extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isFollowing: false,
			stats: []
		};
	}

	// shouldComponentUpdate = (nextProps, nextState) => (nextProps.isLoadingUser ? false : true);

	static getDerivedStateFromProps = (nextProps, prevState) => {
		if (Object.keys(nextProps.userData).length) {
			const { authenticationData, userData, onFollowData, onUnfollowData } = nextProps;
			let hasOnFollowData = Object.keys(onFollowData).length,
				hasOnUnfollowData = Object.keys(onUnfollowData).length;
			return {
				isFollowing: hasOnFollowData
					? true
					: hasOnUnfollowData
						? false
						: userData.followers.includes(authenticationData._id),
				stats: [
					{ label: "Stories", value: userData.counts["articles"] },
					{
						label: "Followers",
						value: hasOnFollowData ? userData.followers.length + 1 : userData.followers.length
					},
					{
						label: "Following",
						value: userData.following.length
					}
				]
			};
		}
		return null;
	};

	// componentWillReceiveProps = nextProps => {
	// 	if (this.props !== nextProps) {
	// 		const { authenticationData, userData, onFollowData, onUnfollowData } = nextProps;
	// 		if (Object.keys(userData).length) {
	// 			let hasOnFollowData = Object.keys(onFollowData).length,
	// 				hasOnUnfollowData = Object.keys(onUnfollowData).length;
	// 			this.setState({
	// 				isFollowing: hasOnFollowData
	// 					? true
	// 					: hasOnUnfollowData
	// 						? false
	// 						: userData.followers.includes(authenticationData._id),
	// 				stats: [
	// 					{ label: "Stories", value: userData.counts["articles"] },
	// 					{
	// 						label: "Followers",
	// 						value: hasOnFollowData ? userData.followers.length + 1 : userData.followers.length
	// 					},
	// 					{
	// 						label: "Following",
	// 						value: userData.following.length
	// 					}
	// 				]
	// 			});
	// 		}
	// 	}
	// };

	render = () => {
		const { userData, isLoadingUser, authenticationData, onFollow, onUnfollow, isLoadingFollowData } = this.props,
			{ isFollowing, stats } = this.state;

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
				url("https://source.unsplash.com/collection/2203755/1600x900")`
						}}
						overlayClassName="push"
						src="https://source.unsplash.com/collection/2203755/1600x900"
						background="darken-light"
					/>
				</div>
				<div className="user-view-content">
					<section className="container">
						<header className="row">
							<figure className="column user-heading-wrapper">
								<div className="user-img-wrapper">
									<LazyLoad
										src={userData.image_url ? userData.image_url : iconMale}
										alt="User infographic"
										className="user-thumbnail"
										defaultImage={iconMale}
									/>
									<div className="user-img-overlay" />
								</div>
								<figcaption className="user-info-wrapper">
									<hgroup>
										<h1 className="separator">{userData.name}</h1>
										<h3>{"@" + userData.username}</h3>
										{userData.location && (
											<div className="user-location-info-wrapper">
												<MapPin className="user-location-icon" />
												<h4>{userData.location}</h4>
											</div>
										)}
									</hgroup>
								</figcaption>
							</figure>
						</header>
						<ul className="row user-stats">
							{stats.map((obj, i) => (
								<li key={i} className="column user-stats-item">
									<h1>{obj.value}</h1>
									<h4>{obj.label}</h4>
								</li>
							))}
						</ul>
						<footer className="row">
							<div className="column btn-wrapper">
								<p>{userData.bio || `${userData.username} hasn’t added any bio information yet.`}</p>
								{userData.is_owner ? (
									<Link to={`/user/${userData._id}/edit`} className="btn">
										edit
									</Link>
								) : isLoadingFollowData ? (
									<Loader />
								) : (
									<button
										className="btn"
										onClick={
											isFollowing
												? () => onUnfollow({ id: userData._id })
												: () => onFollow({ followingId: userData._id, followerId: authenticationData._id })
										}
									>
										{isFollowing ? "unfollow" : "follow"}
									</button>
								)}
							</div>
						</footer>
					</section>
				</div>
			</div>
		);
	};
}
