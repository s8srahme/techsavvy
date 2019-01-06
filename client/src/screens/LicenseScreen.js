import React, { Component } from "react";

export class LicenseScreen extends Component {
	componentWillMount = () => {
		window.scrollTo(0, 0);
	};

	render = () => (
		<div className="license-content">
			<div className="container">
				<section className="row">
					<article className="column">
						<h1 className="separator">License</h1>
						<p>
							All photos, icons, fonts, contents and associated third-party assets consumed on Techsavvy came with the
							permission to be used for free. More precisely, the aforementioned were granted an irrevocable,
							non-exclusive copyright license to download, copy, modify, perform, and use for 'non-commercial purposes'
							only.
							<br />
							Techsavvy does not intend to replicate any similar or competing service, and is intended purely for
							learning purposes. Should there occur any damage by the use of contents, ideas or information preseneted
							here by users, the developer shall not be reponsible in any way.
						</p>
					</article>
				</section>
			</div>
		</div>
	);
}
