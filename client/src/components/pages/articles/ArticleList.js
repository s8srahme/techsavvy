import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { truncate, exportBreakpoint, slugify, extractContent } from "../../../utils";
import { iconPicture } from "../../../assets";
// import { ArrowRight } from "react-feather";
import { Loader } from "../..";

export class ArticleList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTabIndex: 0,
			windowHeight: window.innerHeight,
			windowWidth: window.innerWidth,
			isFetchingArticles: false
		};
		this.listRef = React.createRef();
	}

	getSnapshotBeforeUpdate = (prevProps, prevState) => {
		const prevArticles =
				Object.keys(prevProps.articles).length && prevProps.articles.data ? prevProps.articles.data.articles : [],
			articles =
				Object.keys(this.props.articles).length && this.props.articles.data ? this.props.articles.data.articles : [],
			userArticles =
				Object.keys(this.props.userArticles).length && this.props.userArticles.data
					? this.props.userArticles.data.articles
					: [],
			prevUserArticles =
				Object.keys(prevProps.userArticles).length && prevProps.userArticles.data
					? prevProps.userArticles.data.articles
					: [];

		if (
			(prevProps.isFetchingMoreArticles &&
				!this.props.isFetchingMoreArticles &&
				prevArticles.length < articles.length) ||
			(prevProps.isFetchingMoreUserArticles &&
				!this.props.isFetchingMoreUserArticles &&
				prevUserArticles.length < userArticles.length)
		) {
			const list = this.listRef.current;
			return list.scrollHeight - list.scrollTop;
		}
		return null;
	};

	componentDidUpdate = (prevProps, prevState, snapshot) => {
		if (snapshot !== null) {
			const list = this.listRef.current;
			// list.scrollTop = list.scrollHeight - snapshot;
			window.scrollTo({
				top: list.scrollHeight - snapshot,
				left: 0,
				behavior: "instant"
			});
		}
	};

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
		let {
			articles,
			userArticles,
			// hasErroredArticles,
			isFetchingArticles,
			isFetchingUserArticles,
			// articlesError,
			hasHeaderButton = false,
			hasHeaderTabs = false
		} = this.props;
		if (this.state.activeTabIndex === 1) articles = userArticles;

		return (
			<div className="wrapper" ref={this.listRef}>
				{isFetchingArticles || isFetchingUserArticles ? (
					<div className={`news-loader-content ${!hasHeaderTabs && "darken pull"}`}>
						<Loader />
					</div>
				) : (
					<div className="news-list-wrapper">
						{this._renderNewsHeader(hasHeaderButton, hasHeaderTabs)}
						{this._renderNewsContent(Object.keys(articles).length && articles.data ? articles.data.articles : [])}
					</div>
				)}
			</div>
		);
	};

	_handleNewsRowsAndCols = articles => {
		articles = articles.slice(0).reverse();
		let rows = [];
		for (let rowKey = 0, index = 0; rowKey < articles.length; rowKey = rowKey + 3, index += 1) {
			let cols = articles.slice(rowKey, rowKey + 3).reverse();
			rows.push(
				<article key={index} className="row">
					{cols.map((col, colKey) => {
						let { windowWidth } = this.state,
							description = extractContent(col.description),
							title = "",
							timestamp = moment(col.created_at).fromNow();

						if (cols.length === 1) {
							if (windowWidth >= exportBreakpoint("desktop").max) {
								description = truncate(description, 210, " ");
								title = truncate(col.title, 150, " ");
							} else if (
								windowWidth >= exportBreakpoint("desktop").min &&
								windowWidth < exportBreakpoint("desktop").max
							) {
								description = truncate(description, 170, " ");
								title = truncate(col.title, 120, " ");
							} else if (
								windowWidth < exportBreakpoint("desktop").min &&
								windowWidth >= exportBreakpoint("tablet").max
							) {
								description = truncate(description, 110, " ");
								title = truncate(col.title, 80, " ");
							} else if (
								windowWidth < exportBreakpoint("tablet").max &&
								windowWidth >= exportBreakpoint("tablet").min
							) {
								description = truncate(description, 180, " ");
								title = truncate(col.title, 130, " ");
							} else if (
								windowWidth < exportBreakpoint("tablet").min &&
								windowWidth >= exportBreakpoint("mobile").max
							) {
								description = truncate(description, 140, " ");
								title = truncate(col.title, 100, " ");
							} else if (
								windowWidth < exportBreakpoint("mobile").max &&
								windowWidth >= exportBreakpoint("mobile").min
							) {
								description = truncate(description, 80, " ");
								title = truncate(col.title, 50, " ");
							} else {
								description = truncate(description, 60, " ");
								title = truncate(col.title, 35, " ");
							}
						} else if (cols.length === 2) {
							if (windowWidth >= exportBreakpoint("desktop").max) {
								description = truncate(description, 210, " ");
								title = truncate(col.title, 150, " ");
							} else if (
								windowWidth >= exportBreakpoint("desktop").min &&
								windowWidth < exportBreakpoint("desktop").max
							) {
								description = truncate(description, 160, " ");
								title = truncate(col.title, 100, " ");
							} else if (
								windowWidth < exportBreakpoint("desktop").min &&
								windowWidth >= exportBreakpoint("tablet").max
							) {
								description = truncate(description, 110, " ");
								title = truncate(col.title, 70, " ");
							} else if (
								windowWidth < exportBreakpoint("tablet").max &&
								windowWidth >= exportBreakpoint("tablet").min
							) {
								description = truncate(description, 180, " ");
								title = truncate(col.title, 130, " ");
							} else if (
								windowWidth < exportBreakpoint("tablet").min &&
								windowWidth >= exportBreakpoint("mobile").max
							) {
								description = truncate(description, 140, " ");
								title = truncate(col.title, 100, " ");
							} else if (
								windowWidth < exportBreakpoint("mobile").max &&
								windowWidth >= exportBreakpoint("mobile").min
							) {
								description = truncate(description, 80, " ");
								title = truncate(col.title, 50, " ");
							} else {
								description = truncate(description, 60, " ");
								title = truncate(col.title, 35, " ");
							}
						} else {
							if (windowWidth >= exportBreakpoint("desktop").max) {
								description = truncate(description, 130, " ");
								title = truncate(col.title, 90, " ");
							} else if (
								windowWidth >= exportBreakpoint("desktop").min &&
								windowWidth < exportBreakpoint("desktop").max
							) {
								description = truncate(description, 90, " ");
								title = truncate(col.title, 60, " ");
							} else if (
								windowWidth < exportBreakpoint("desktop").min &&
								windowWidth >= exportBreakpoint("tablet").max
							) {
								description = truncate(description, 60, " ");
								title = truncate(col.title, 35, " ");
							} else if (
								windowWidth < exportBreakpoint("tablet").max &&
								windowWidth >= exportBreakpoint("tablet").min
							) {
								description = truncate(description, 180, " ");
								title = truncate(col.title, 130, " ");
							} else if (
								windowWidth < exportBreakpoint("tablet").min &&
								windowWidth >= exportBreakpoint("mobile").max
							) {
								description = truncate(description, 140, " ");
								title = truncate(col.title, 100, " ");
							} else if (
								windowWidth < exportBreakpoint("mobile").max &&
								windowWidth >= exportBreakpoint("mobile").min
							) {
								description = truncate(description, 80, " ");
								title = truncate(col.title, 50, " ");
							} else {
								description = truncate(description, 60, " ");
								title = truncate(col.title, 35, " ");
							}
						}

						return (
							<Link
								key={colKey}
								className="column"
								to={{
									pathname: `/blog/${slugify(col.title)}-${col._id}`
								}}
							>
								<figure className={`news-card ${cols.length === 1 && "full"}`}>
									<div className="news-card-img-wrapper">
										<img
											src={col.featured_image_url ? col.featured_image_url : iconPicture}
											alt="card infographic"
											className="news-thumbnail"
										/>
										<div className="news-card-img-overlay" />
									</div>
									<figcaption className="news-card-info-wrapper">
										<div className="news-tag-wrapper">
											<span className="tag active">{col.category ? col.category : "others"}</span>
										</div>
										<hgroup>
											<h3>{title}</h3>
											{/* <h4>{col.subtitle}</h4> */}
										</hgroup>
										<div className="news-meta">
											<span>{col.author_id ? col.author_id.name.toLowerCase() : "Unnamed Author"}</span>
											<span>{"\u00b7"}</span>
											<time>{timestamp}</time>
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

	_handleTabClick = (event, index) => {
		event.preventDefault();
		this.setState({ activeTabIndex: index }, () => {
			if (index === 1 && Object.keys(this.props.userArticles).length < 1) this.props.onFetchUserArticles();
		});
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
										onClick={event => this._handleTabClick(event, i)}
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

	_renderNewsContent = articles => {
		let { activeTabIndex } = this.state,
			meta = activeTabIndex === 0 ? this.props.articles.meta : this.props.userArticles.meta;
		return (
			<div className="news-list-content">
				<div className="container">
					{articles.length > 0 ? (
						<section className="news-cards-wrapper">
							{meta.page !== meta.pages && (
								<div className="row news-cards-btn-wrapper">
									{activeTabIndex === 0 ? (
										this.props.isFetchingMoreArticles ? (
											<Loader />
										) : (
											<button className="btn" onClick={this.props.onFetchMore}>
												show more
											</button>
										)
									) : this.props.isFetchingMoreUserArticles ? (
										<Loader />
									) : (
										<button className="btn" onClick={this.props.onFetchMoreUserArticles}>
											show more
										</button>
									)}
								</div>
							)}
							{this._handleNewsRowsAndCols(articles).map(row => row)}
						</section>
					) : (
						<article className="row news-info-wrapper">
							<div className="column">
								<p>
									{activeTabIndex === 0
										? "There are no published stories yet."
										: "You haven’t published any stories yet."}
								</p>
							</div>
						</article>
					)}
				</div>
			</div>
		);
	};
}