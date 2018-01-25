/* eslint-env jest */

import React from 'react';
import { shallow, render } from 'enzyme';
// import sinon from 'sinon';
// import sinonChai from 'sinon-chai';

import EventInfo from '../';

// chai.use(sinonChai);

test('returns nothing if there is no body prop', function() {
	const response = EventInfo.prototype.convertMarkdown();
	expect(response).to.equal(false);
});

test('returns a sanitized markdown repsonse if body prop exists', function() {
	const markdown = '# This is a title';
	const response = EventInfo.prototype.convertMarkdown(markdown);

	expect(response.dangerouslySetInnerHTML.__html).to.equal(
		'<h1 id="this-is-a-title">This is a title</h1>\n'
	);
});

// describe('<EventInfo />', function () {
//   describe('convertMarkdown()', function () {
//   });
// });
