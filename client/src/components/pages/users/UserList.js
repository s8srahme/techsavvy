import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Loader, LazyLoad } from "components";
import { iconPictureLight } from "assets";

// const works = [
// 	{
// 		thumbnail: "https://cdn.dribbble.com/users/1885780/screenshots/4959958/medium_drrree.png",
// 		title: "Surfer Paradise",
// 		category: "mobile app",
// 		routeName: ""
// 	},
// 	{
// 		thumbnail: "https://cdn.dribbble.com/users/1885780/screenshots/4959958/medium_drrree.png",
// 		title: "Surfer Paradise",
// 		category: "mobile app",
// 		routeName: ""
// 	},
// 	{
// 		thumbnail: "https://cdn.dribbble.com/users/1885780/screenshots/4959958/medium_drrree.png",
// 		title: "Surfer Paradise",
// 		category: "mobile app",
// 		routeName: ""
// 	},
// 	{
// 		thumbnail: "https://cdn.dribbble.com/users/1885780/screenshots/4959958/medium_drrree.png",
// 		title: "Surfer Paradise",
// 		category: "mobile app",
// 		routeName: ""
// 	},
// 	{
// 		thumbnail: "https://cdn.dribbble.com/users/1885780/screenshots/4959958/medium_drrree.png",
// 		title: "Surfer Paradise",
// 		category: "mobile app",
// 		routeName: ""
// 	}
// ];

export class UserList extends PureComponent {
	state = {
		isLoadingUsers: true
	};

	componentDidMount = () => {
		if (Object.keys(this.props.users).length) this.setState({ isLoadingUsers: false });
	};

	componentDidUpdate = (prevProps, prevState, snapshot) => {
		const { isLoadingUsers } = this.props;
		if (isLoadingUsers !== prevState.isLoadingUsers) {
			this.setState({ isLoadingUsers });
		}
	};

	_renderWorkContent = works => (
		<div className="work-content">
			<div className="container">
				<header className="row work-heading-wrapper">
					<h1 className="separator">Top Writers</h1>
				</header>
				{works.length > 0 ? (
					this._handleWorkRowsAndCols(works).map(row => row)
				) : (
					<article className="row work-info-wrapper">
						<div className="column">
							<p>There are no writers yet.</p>
						</div>
					</article>
				)}
			</div>
		</div>
	);

	_handleWorkRowsAndCols = data => {
		let rows = [];
		for (let rowKey = 0, index = 0; index < data.length; rowKey++, index = index + 3) {
			let cols = data.slice(index, index + 3);
			rows.push(
				<section key={rowKey} className="row work-cards-wrapper">
					{cols.map((col, colKey) => (
						<Link
							key={colKey}
							className="column"
							to={{
								pathname: `/user/${col._id}`
							}}
						>
							<figure className="work-card">
								<div className="work-card-img-wrapper">
									<LazyLoad
										src={col.image_url}
										alt="Card infographic"
										className="work-thumbnail"
										defaultImage={iconPictureLight}
									/>
								</div>
								<figcaption className="work-card-info-wrapper">
									<h2 className="separator">{col.name}</h2>
									<h4>{col.followers.length} follower(s)</h4>
								</figcaption>
							</figure>
						</Link>
					))}
				</section>
			);
		}
		return rows;
	};

	render = () => {
		const { isLoadingUsers } = this.state;
		const users = Object.keys(this.props.users).length ? this.props.users.data.users : [];

		if (!isLoadingUsers) {
			// const {
			// 	users: {
			// 		data
			// 		// meta
			// 	}
			// } = this.props;
			return this._renderWorkContent(users);
		}
		return (
			<div className="news-loader-content darken pull">
				<Loader />
			</div>
		);
	};
}
