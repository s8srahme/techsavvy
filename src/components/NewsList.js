import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NewsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTabIndex: 0
		};
	}

	render = () => {
		let { data, hasHeaderButton = false, hasHeaderTabs = false } = this.props;
		if (this.state.activeTabIndex > 0) data = [];
		return (
			<div className="news-list-wrapper">
				{this._renderNewsHeader(hasHeaderButton, hasHeaderTabs)}
				{this._renderNewsContent(data)}
			</div>
		);
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

	_handleTabClick = index => {
		this.setState({ activeTabIndex: index });
	};

	_renderNewsHeader = (hasHeaderButton, hasHeaderTabs) => {
		if (hasHeaderButton && hasHeaderTabs) {
			return (
				<div className="news-list-header">
					<div className="container">
						<header className="row news-heading-wrapper">
							<div className="column">
								<h1>news &amp; blog</h1>
							</div>
							<div className="column">
								{/* <div className="news-heading-btn-wrapper"> */}
								<Link className="btn" to="/blog/new-story">
									new story
								</Link>
								{/* </div> */}
							</div>
						</header>
						<div className="row news-heading-tabs">
							<ul className="column">
								{[{ name: "All" }, { name: "Published" }].map((obj, i) => (
									<li
										key={i}
										className={`${this.state.activeTabIndex === i && "active"} news-heading-tab`}
										onClick={() => this._handleTabClick(i)}
									>
										{obj.name}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="news-list-header clear">
					<div className="container clear">
						<header className="row news-heading-wrapper">
							<div className="column clear">
								<h1 className="separator">news &amp; blog</h1>
							</div>
						</header>
					</div>
				</div>
			);
		}
	};

	_renderNewsContent = data => (
		<div className="news-list-content">
			<div className="container">
				{data.length > 0 ? (
					<section className="news-cards-wrapper">{this._handleNewsRowsAndCols(data).map(row => row)}</section>
				) : (
					<article className="row news-info-wrapper">
						<div className="column">
							<p>You haven’t published any public stories yet.</p>
						</div>
					</article>
				)}
			</div>
		</div>
	);
}
