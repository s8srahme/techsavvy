import React, { Component } from "react";

export class UserView extends Component {
	render = () => {
		const { data } = this.props,
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
									<img src={data.image_url} alt="user infographic" className="user-thumbnail" />
									<div className="user-img-overlay" />
								</div>
								<figcaption className="user-info-wrapper">
									<hgroup>
										<h1>{data.name}</h1>
										<h4>{data.location}</h4>
									</hgroup>
									<p>{data.bio}</p>
								</figcaption>
							</figure>
						</header>
						<div className="row">
							<div className="column btn-wrapper">
								<button className="btn">follow</button>
							</div>
						</div>
						<ul className="row user-stats">
							{stats.map((obj, i) => (
								<li key={i} className="column user-stats-item">
									<h1>{obj.value}</h1>
									<h4>{obj.label}</h4>
								</li>
							))}
						</ul>
					</section>
				</div>
			</main>
		);
	};
}
