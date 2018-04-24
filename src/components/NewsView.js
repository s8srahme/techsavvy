import React, { Component } from "react";
// import { Link } from "react-router-dom";

export class NewsView extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render = () => {
		const { data } = this.props;
		// console.log(data.thumbnail);
		return (
			<main className="wrapper">
				<figure
					className="news-thumbnail"
					style={{
						backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .7), rgba(0, 0, 0, 0.3)),
			url("${data.thumbnail}")`
					}}
				/>
				<div className="news-view-content">
					<div className="container">
						<section className="row">
							<article className="column">
								<header className="news-info-wrapper">
									<span>{data.category}</span>
									<h1>{data.title}</h1>
									<div className="news-meta">
										<span>{data.author}</span>
										<time>{data.timestamp}</time>
									</div>
								</header>
								<div dangerouslySetInnerHTML={{ __html: data.description }} />
							</article>
						</section>
					</div>
				</div>
			</main>
		);
	};
}
