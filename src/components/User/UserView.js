import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	iconMale
	// iconFemale
} from "../../assets";

export class UserView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAdmin: false
		};
	}

	componentWillMount = () => {
		const { data } = this.props;
		this.setState({ isAdmin: data.admin });
	};

	render = () => {
		const { data } = this.props,
			{ isAdmin } = this.state,
			stats = [
				{ label: "Stories", value: 18 },
				{ label: "Followers", value: 512 },
				{ label: "Following", value: 1008 }
			];
		return (
			<main className="wrapper">
				<div className="news-masthead">
					<figure
						className="news-featured-image"
						style={{
							backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0.1)),
			url("${data.featured_image_url}")`
						}}
					/>
				</div>
				<div className="user-view-content">
					<section className="container">
						<header className="row">
							<figure className="column user-heading-wrapper">
								<div className="user-img-wrapper">
									<img
										src={data.image_url ? data.image_url : iconMale}
										alt="user infographic"
										className="user-thumbnail"
									/>
									<div className="user-img-overlay" />
								</div>
								<figcaption className="user-info-wrapper">
									<hgroup>
										<h1>{data.name}</h1>
										<h4>{data.location}</h4>
									</hgroup>
									{/* <p>{data.bio}</p> */}
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
								<p>{data.bio}</p>
								{!isAdmin ? (
									<Link to={`/user/${data._id}/edit`} className="btn">
										edit
									</Link>
								) : (
									<button className="btn" onClick={() => {}}>
										follow
									</button>
								)}
							</div>
						</footer>
					</section>
				</div>
			</main>
		);
	};
}
