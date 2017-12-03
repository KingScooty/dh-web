/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import styles from './styles'

// if (typeof window !== 'undefined') {
//   require('./sass/main.scss');
// }

type Props = {
	titleLead: string,
	titleSupport: string,
	footer: string
}

var convertMarkdown = function convertMarkdown (markdown: string) {
	var renderedMarkdown: string;
	if (!markdown) return false;

	renderedMarkdown = marked(markdown, { sanitize: true });
	return {
		dangerouslySetInnerHTML: {
			__html: renderedMarkdown
		}
	};
};

const getEventBody = convertMarkdown('This is _some_ markdown.');
// const { titleLead, titleSupport, footer } = this.props;
// const titleLead = 'Title Lead';
// const titleSupport = 'Title Support';
// const footer = 'footer shizzle';


export default class EventInfo extends React.Component<Props> {
	// constructor(props) {
	// 	super(props)
	// }
	render() {
		const { titleLead, titleSupport, footer } = this.props;
		return (
			<div className="event">

				<style jsx>{styles}</style>

				<div className="event__header">
					<h1 className="lead-title">{ titleLead }</h1>
					<hr className="section-spacer section-spacer--compact" />
					<h2 className="support-title" dangerouslySetInnerHTML={{__html: titleSupport }} />
					<hr className="section-spacer section-spacer--compact" />
				</div>

				{/*<hr className="section-spacer section-spacer--compact" />*/}

				<div className="event__body" {...getEventBody} />

				<div className="event__footer">
					<hr className="section-spacer" />
					<div>
						<div className="island-title">{ footer }</div>
					</div>
					<hr className="section-spacer" />
				</div>
			</div>
		);
	}
}

// EventInfo.defaultProps = {
// 	titleLead: String,
// 	titleSupport: String,
// 	footer: String
// }

// EventInfo.propTypes = {
// 	titleLead: PropTypes.string.isRequired,
// 	titleSupport: PropTypes.string.isRequired,
// 	footer: PropTypes.string.isRequired
// }


// export default () => (
// 	<div className="event">
//
// 		<style jsx>{styles}</style>
//
// 		<div className="event__header">
// 			<h1 className="lead-title">{ titleLead }</h1>
// 			<hr className="section-spacer section-spacer--compact" />
// 			<h2 className="support-title" dangerouslySetInnerHTML={{__html: titleSupport }} />
// 			<hr className="section-spacer section-spacer--compact" />
// 		</div>
//
// 	  {/*<hr className="section-spacer section-spacer--compact" />*/}
//
// 		<div className="event__body" {...getEventBody} />
//
// 		<div className="event__footer">
// 			<hr className="section-spacer" />
// 			<div>
// 				<div className="island-title">{ footer }</div>
// 			</div>
// 			<hr className="section-spacer" />
// 		</div>
// 	</div>
// );
