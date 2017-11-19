import React from 'react';
import marked from 'marked';

import styles from './styles'

// if (typeof window !== 'undefined') {
//   require('./sass/main.scss');
// }

var convertMarkdown = function convertMarkdown (markdown) {
	var renderedMarkdown;
	if (!markdown) return false;

	renderedMarkdown = marked(markdown, { sanitize: true });
	return {
		dangerouslySetInnerHTML: {
			__html: renderedMarkdown
		}
	};
};

const getEventBody = convertMarkdown('# this is a markdown title');
// const { titleLead, titleSupport, footer } = this.props;
const titleLead = 'Title Lead';
const titleSupport = 'Title Support';
const footer = 'footer shizzle';

export default () => (
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
