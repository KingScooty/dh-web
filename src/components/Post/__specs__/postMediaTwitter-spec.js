var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

import React from 'react';
import { shallow } from 'enzyme';

import PostMediaTwitter from '../PostMediaTwitter';

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

describe('<PostMediaTwitter />', function() {
});
