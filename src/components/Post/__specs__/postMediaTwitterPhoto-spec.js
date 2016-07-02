var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

import React from 'react';
import { shallow } from 'enzyme';

import PostMediaTwitterPhoto from '../PostMediaTwitterPhoto';

var legacyMedia = require('./mocks/tweet_with_media--simple.json');
var media2014 = require('./mocks/tweet_2014_with_media.json');
var mediaModern = require('./mocks/tweet_2015_with_media.json');
var mediaModernMultiple = require('./mocks/tweet_2015_with_multiple_media.json');


function removeMedia(mediaType) {
  var noMedia = JSON.parse(JSON.stringify(mediaType));

  if (noMedia.extended_entities && noMedia.extended_entities.media) {
    delete noMedia.entities.media;
    delete noMedia.extended_entities.media;
  }
  else if (noMedia.entities && noMedia.entities.media) {
    delete noMedia.entities.media;
  }

  return noMedia;
}

describe('<PostMediaTwitterPhoto />', function () {
  it('renders an anchor wrapper with correct props if media is present', function () {
    const href = 'https://twitter.com/kingscooty/status/123';
    const media0 = mediaModern.entities.media[0];
    const wrapper = shallow(<PostMediaTwitterPhoto {...media0} href={ href } />);
    const media = wrapper.find('.stream-post__media-item');
    const anchor = media.find('a');

    expect(anchor).to.have.length.of(1);
    expect(anchor.prop('href')).to.equal(href);
  });
});
