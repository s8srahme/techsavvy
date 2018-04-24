import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NewsList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render = () => {
		const { data, style = {} } = this.props;
		return this._renderNewsContent(data, style);
	};

	_handleNewsRowsAndCols = data => {
		let rows = [];
		for (let rowKey = 0, index = 0; rowKey < data.length; rowKey = rowKey + 3, index += 1) {
			let cols = data.slice(rowKey, rowKey + 3);
			rows.push(
				<article key={index} className="row">
					{cols.map((col, colKey) => {
						let description = col.description;
						if (cols.length === 3 && description.length > 120) {
							description = description.substring(0, 120) + "...";
						} else if (cols.length === 2 && description.length > 190) {
							description = description.substring(0, 190) + "...";
						} else if (cols.length === 1 && description.length > 360) {
							description = description.substring(0, 360) + "...";
						}
						return (
							<Link
								key={colKey}
								className="column"
								to={{
									pathname: `/blog/${col.slug}`
								}}
							>
								<figure className="news-card">
									<div className="news-card-img-wrapper">
										<img src={col.thumbnail} alt="card infographic" className="news-thumbnail" />
										<div className="news-card-img-overlay" />
									</div>
									<figcaption className="news-card-info-wrapper">
										<span>{col.category}</span>
										<hgroup>
											<h2>{col.title}</h2>
											{/* <h3>{col.subtitle}</h3> */}
										</hgroup>
										<p>{description}</p>
										<div className="news-meta">
											<span>{col.author}</span>
											{/* <span>{col.timestamp}</span> */}
											<time>{col.timestamp}</time>
										</div>
									</figcaption>
								</figure>
							</Link>
						);
					})}
				</article>
			);
		}
		return rows;
	};

	_renderNewsContent = (data, style) => (
		<div className="news-list-content">
			<div className="container" style={style}>
				<header className="row news-heading-wrapper">
					<h1 className="separator">news &amp; blog</h1>
				</header>
				<section className="news-cards-wrapper">{this._handleNewsRowsAndCols(data).map(row => row)}</section>
			</div>
		</div>
	);
}
