import React from "react";
import PropTypes from "prop-types";
import { Loader } from "components";
import { iconPictureLight } from "assets";

class LazyLoad extends React.Component {
	static propTypes = {
		src: PropTypes.string.isRequired,
		className: PropTypes.string,
		alt: PropTypes.string.isRequired
	};

	state = {
		loaded: false,
		errored: false
	};

	_handleError = event => {
		this.setState({ errored: true });
	};

	_handleLoad = () => this.setState({ loaded: true });

	render = () => {
		const { src, alt, className = "" } = this.props;
		const { loaded, errored } = this.state;

		if (errored) {
			return (
				<div className="lazy-load-wrapper">
					<div className="lazy-load-overlay">
						<img src={iconPictureLight} alt={alt} className="lazy-load-thumbnail" />
					</div>
				</div>
			);
		}
		return (
			<div className="lazy-load-wrapper">
				{!loaded && (
					<div className="lazy-load-overlay">
						<Loader small shouldClearButton />
					</div>
				)}
				<img
					className={`${className} ${loaded ? "clear" : ""}`}
					src={src}
					alt={alt}
					onLoad={this._handleLoad}
					onError={this._handleError}
				/>
			</div>
		);
	};
}

export { LazyLoad };
