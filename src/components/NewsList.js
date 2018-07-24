import React, { Component } from "react";
import { Link } from "react-router-dom";
import { truncate } from "../utils";
// import { ArrowRight } from "react-feather";
import { Loader } from ".";

const breakpoint = {
	xs: 320,
	sm: 480,
	md_2: 600,
	md: 768,
	lg: 1024,
	xl: 1280
};

export class NewsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTabIndex: 0,
			windowHeight: window.innerHeight,
			windowWidth: window.innerWidth,
			isNewsListLoading: false
		};
	}

	_handleResize = e => {
		this.setState({
			windowHeight: window.innerHeight,
			windowWidth: window.innerWidth
		});
	};

	componentDidMount = () => {
		window.addEventListener("resize", this._handleResize);
	};

	componentWillUnmount = () => {
		window.removeEventListener("resize", this._handleResize);
	};

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
						let { windowWidth } = this.state,
							description = "",
							title = "";

						if (cols.length === 1) {
							if (windowWidth >= breakpoint.xl) {
								description = truncate(col.description, 210, " ");
								title = truncate(col.title, 150, " ");
							} else if (windowWidth >= breakpoint.lg && windowWidth < breakpoint.xl) {
								description = truncate(col.description, 170, " ");
								title = truncate(col.title, 120, " ");
							} else if (windowWidth < breakpoint.lg && windowWidth >= breakpoint.md) {
								description = truncate(col.description, 110, " ");
								title = truncate(col.title, 80, " ");
							} else if (windowWidth < breakpoint.md && windowWidth >= breakpoint.md_2) {
								description = truncate(col.description, 180, " ");
								title = truncate(col.title, 130, " ");
							} else if (windowWidth < breakpoint.md_2 && windowWidth >= breakpoint.sm) {
								description = truncate(col.description, 140, " ");
								title = truncate(col.title, 100, " ");
							} else if (windowWidth < breakpoint.sm && windowWidth >= breakpoint.xs) {
								description = truncate(col.description, 80, " ");
								title = truncate(col.title, 50, " ");
							} else {
								description = truncate(col.description, 60, " ");
								title = truncate(col.title, 35, " ");
							}
						} else if (cols.length === 2) {
							if (windowWidth >= breakpoint.xl) {
								description = truncate(col.description, 210, " ");
								title = truncate(col.title, 150, " ");
							} else if (windowWidth >= breakpoint.lg && windowWidth < breakpoint.xl) {
								description = truncate(col.description, 160, " ");
								title = truncate(col.title, 100, " ");
							} else if (windowWidth < breakpoint.lg && windowWidth >= breakpoint.md) {
								description = truncate(col.description, 110, " ");
								title = truncate(col.title, 70, " ");
							} else if (windowWidth < breakpoint.md && windowWidth >= breakpoint.md_2) {
								description = truncate(col.description, 180, " ");
								title = truncate(col.title, 130, " ");
							} else if (windowWidth < breakpoint.md_2 && windowWidth >= breakpoint.sm) {
								description = truncate(col.description, 140, " ");
								title = truncate(col.title, 100, " ");
							} else if (windowWidth < breakpoint.sm && windowWidth >= breakpoint.xs) {
								description = truncate(col.description, 80, " ");
								title = truncate(col.title, 50, " ");
							} else {
								description = truncate(col.description, 60, " ");
								title = truncate(col.title, 35, " ");
							}
						} else {
							if (windowWidth >= breakpoint.xl) {
								description = truncate(col.description, 130, " ");
								title = truncate(col.title, 90, " ");
							} else if (windowWidth >= breakpoint.lg && windowWidth < breakpoint.xl) {
								description = truncate(col.description, 90, " ");
								title = truncate(col.title, 60, " ");
							} else if (windowWidth < breakpoint.lg && windowWidth >= breakpoint.md) {
								description = truncate(col.description, 60, " ");
								title = truncate(col.title, 35, " ");
							} else if (windowWidth < breakpoint.md && windowWidth >= breakpoint.md_2) {
								description = truncate(col.description, 180, " ");
								title = truncate(col.title, 130, " ");
							} else if (windowWidth < breakpoint.md_2 && windowWidth >= breakpoint.sm) {
								description = truncate(col.description, 140, " ");
								title = truncate(col.title, 100, " ");
							} else if (windowWidth < breakpoint.sm && windowWidth >= breakpoint.xs) {
								description = truncate(col.description, 80, " ");
								title = truncate(col.title, 50, " ");
							} else {
								description = truncate(col.description, 60, " ");
								title = truncate(col.title, 35, " ");
							}
						}

						return (
							<Link
								key={colKey}
								className="column"
								to={{
									pathname: `/blog/${col.slug}`
								}}
							>
								<figure className={`news-card ${cols.length === 1 && "full"}`}>
									<div className="news-card-img-wrapper">
										<img src={col.thumbnail} alt="card infographic" className="news-thumbnail" />
										<div className="news-card-img-overlay" />
									</div>
									<figcaption className="news-card-info-wrapper">
										<div className="news-tag-wrapper">
											<span className="tag active">{col.category}</span>
										</div>
										<hgroup>
											<h3>{title}</h3>
											{/* <h4>{col.subtitle}</h4> */}
										</hgroup>
										<div className="news-meta">
											<span>{col.author.toLowerCase()}</span>
											<span>{"\u00b7"}</span>
											<time>{col.timestamp}</time>
										</div>
										<p>{description}</p>
										<div className="news-card-link-wrapper">
											<span>read</span>
											<span>→</span>
											{/* <ArrowRight className="news-card-icon" /> */}
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

	_handleLoadMore = event => {
		event.preventDefault();
		this.setState({ isNewsListLoading: true });
	};

	_renderNewsContent = data => (
		<div className="news-list-content">
			<div className="container">
				{data.length > 0 ? (
					<section className="news-cards-wrapper">
						<div className="row news-cards-btn-wrapper">
							{this.state.isNewsListLoading ? (
								<Loader />
							) : (
								<button className="btn" onClick={this._handleLoadMore}>
									show more
								</button>
							)}
						</div>
						{this._handleNewsRowsAndCols(data).map(row => row)}
					</section>
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
