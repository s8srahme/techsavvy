import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { slugify, extractContent, ellipsizeTextBox } from "../../../utils";
import { iconPictureLight } from "../../../assets";
// import { ArrowRight } from "react-feather";
import { Loader, LazyLoad } from "../..";

export class ArticleList extends Component {
	constructor(props) {
		super(props);
		this.mounted = false;
		this.state = {
			activeTabIndex: 0,
			windowHeight: window.innerHeight,
			windowWidth: window.innerWidth,
			isFetchingArticles: false,
			hasExpandedCard: false,
			hasHandledEllipsis: false
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
			// const list = this.listRef.current;
			// return list.scrollHeight - list.scrollTop;
			return window.pageYOffset;
		}
		return null;
	};

	componentDidUpdate = (prevProps, prevState, snapshot) => {
		if (
			(prevProps.isFetchingAllArticles && !this.props.isFetchingAllArticles) ||
			(!this.props.isFetchingAllArticles && prevProps.isFetchingUserArticles && !this.props.isFetchingUserArticles)
		)
			setTimeout(this._handleEllipsis, 300);
		if (snapshot !== null) {
			// const list = this.listRef.current;
			// list.scrollTop = list.scrollHeight - snapshot;
			window.scrollTo({
				// top: list.scrollHeight - snapshot,
				top: snapshot,
				left: 0,
				behavior: "instant"
			});
		}
	};

	_handleEllipsis = () => {
		let articles = this.props.articles;
		if (this.state.activeTabIndex === 1) articles = this.props.userArticles;

		articles = Object.keys(articles).length && articles.data ? articles.data.articles : [];
		articles = articles.slice(0);
		// let newArticles = [];
		// for (let index = 0; index < articles.length; index = index + 3) {
		// 	let cols = articles.slice(index, index + 3);
		// 	newArticles = [...newArticles, ...cols];
		// }

		for (let index = 1; index <= articles.length; index++) {
			ellipsizeTextBox("news-title-" + index, articles[index - 1].title, this.state.hasExpandedCard);
			ellipsizeTextBox(
				"news-description-" + index,
				extractContent(articles[index - 1].description),
				this.state.hasExpandedCard
			);
		}

		this.mounted && this.setState({ hasHandledEllipsis: true });
	};

	_handleResize = e => {
		this.mounted &&
			this.setState((previousState, currentProps) => {
				return {
					windowHeight: window.innerHeight,
					windowWidth: window.innerWidth,
					hasExpandedCard: previousState.windowWidth < window.innerWidth
				};
			}, this._handleEllipsis);
	};

	componentDidMount = () => {
		this.mounted = true;
		window.addEventListener("resize", this._handleResize);
	};

	componentWillUnmount = () => {
		this.mounted = false;
		if (!this.state.hasHandledEllipsis) clearTimeout(this._handleEllipsis);
		window.removeEventListener("resize", this._handleResize);
	};

	render = () => {
		let {
			articles,
			userArticles,
			isFetchingAllArticles,
			// hasErroredArticles,
			// isFetchingArticles,
			// isFetchingUserArticles,
			// articlesError,
			hasHeaderButton = false,
			hasHeaderTabs = false
		} = this.props;
		if (this.state.activeTabIndex === 1) articles = userArticles;

		return (
			<div className="wrapper" ref={this.listRef}>
				{isFetchingAllArticles ? (
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
		articles = articles.slice(0);
		let rows = [];

		for (let rowKey = 0, rowIndex = 0; rowKey < articles.length; rowKey = rowKey + 3, rowIndex += 1) {
			let cols = articles.slice(rowKey, rowKey === 0 ? 1 : rowKey + 3);
			if (rowKey !== 0 && cols.length < 3) {
				cols = [...cols, ...(cols.length === 1 ? [{}, {}] : {})];
			}
			if (rowKey === 0) rowKey = -2;

			rows.push(
				<article key={rowIndex} className="row">
					{cols.map((col, colKey) => {
						if (Object.keys(col).length) {
							let description = extractContent(col.description),
								title = col.title,
								timestamp = moment(col.created_at).fromNow(),
								colIndex = rowIndex === 0 ? 1 : 3 * rowIndex - 2 + (colKey + 1);

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
											<LazyLoad
												src={col.featured_image_url ? col.featured_image_url : iconPictureLight}
												alt="Card infographic"
												className={`news-thumbnail ${col.featured_image_url ? "" : "shrink"}`}
												errored={col.featured_image_url ? false : true}
											/>
											{/* {col.featured_image_url && <div className="news-card-img-overlay" />} */}
										</div>
										<figcaption className="news-card-info-wrapper">
											<div className="news-tag-wrapper">
												<span className="tag active">{col.category ? col.category : "others"}</span>
											</div>
											<hgroup>
												<h2 id={"news-title-" + colIndex}>{title}</h2>
												{/* <h4>{col.subtitle}</h4> */}
											</hgroup>
											<div className="news-meta">
												<span>{col.author_id ? col.author_id.name.toLowerCase() : "Unnamed Author"}</span>
												<span>{"\u00b7"}</span>
												<time>{timestamp}</time>
											</div>
											<p id={"news-description-" + colIndex}>{description}</p>
											<div className="news-card-link-wrapper">
												<span>read</span>
												<span>→</span>
												{/* <ArrowRight className="news-card-icon" /> */}
											</div>
										</figcaption>
									</figure>
								</Link>
							);
						} else {
							return <div key={colKey} className="column empty" />;
						}
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
								<Link className="btn" to="/blog/create">
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
			meta = activeTabIndex === 0 ? this.props.articles.meta : this.props.userArticles.meta,
			{ hasHeaderButton = false, hasHeaderTabs = false } = this.props;
		return (
			<div
				className={`news-list-content ${articles.length > 0 ? "" : "clear"} ${
					hasHeaderButton && hasHeaderTabs ? "" : "fixed"
				}`}
			>
				<div className="container">
					{activeTabIndex === 1 && !this.props.isFetchingAllArticles && this.props.isFetchingUserArticles ? (
						<article className="row news-info-wrapper">
							<div className="column">
								<Loader />
							</div>
						</article>
					) : articles.length > 0 ? (
						<section className="news-cards-wrapper">
							{this._handleNewsRowsAndCols(articles).map(row => row)}
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
