import React from "react";
import PropTypes from "prop-types";
import { Loader } from "components";
import { iconPictureLight } from "assets";

class LazyLoad extends React.Component {
	static propTypes = {
		src: PropTypes.string,
		className: PropTypes.string,
		alt: PropTypes.string,
		background: PropTypes.string,
		figure: PropTypes.bool,
		style: PropTypes.object,
		defaultImage: PropTypes.string
	};

	state = {
		loaded: false,
		errored: false
	};

	componentDidUpdate = (prevProps, prevState, snapshot) => {
		if (prevProps.src !== this.props.src) {
			this.setState({ errored: false });
		}
	};

	_handleError = event => {
		this.setState({ errored: true }, this.props.callback);
	};

	_handleLoad = () => this.setState({ loaded: true }, this.props.callback);

	render = () => {
		const { src, alt, className = "", background = "", figure, style = null, defaultImage, children } = this.props;
		const { loaded, errored } = this.state;

		if (errored || this.props.errored) {
			return (
				<div className={`lazy-load-wrapper ${background}`}>
					<div className="lazy-load-overlay">
						{!figure && (
							<img
								src={defaultImage || iconPictureLight}
								alt={alt}
								className={`lazy-load-thumbnail ${defaultImage ? "full" : ""}`}
							/>
						)}
					</div>
				</div>
			);
		}
		return (
			<div className={`lazy-load-wrapper ${background}`}>
				{!loaded && (
					<div className="lazy-load-overlay">
						<Loader small shouldClearButton inverse={background === "" || background === "dark" ? true : false} />
					</div>
				)}
				<img
					className={`${className} ${loaded ? "show" : ""} ${figure ? "hide" : ""}`}
					src={src}
					alt={alt}
					onLoad={this._handleLoad}
					onError={this._handleError}
				/>
				{figure && (
					<figure className={`${className} ${loaded ? "show" : ""}`} style={style}>
						{children && children}
					</figure>
				)}
			</div>
		);
	};
}

export { LazyLoad };
