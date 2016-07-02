var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

import React from 'react';
import { shallow } from 'enzyme';

import PostMedia from '../PostMedia';

var legacyMedia = require('./mocks/tweet_with_media--simple.json');
var media2014 = require('./mocks/tweet_2014_with_media.json');
var mediaModern = require('./mocks/tweet_2015_with_media.json');
var mediaModernMultiple = require('./mocks/tweet_2015_with_multiple_media.json');

describe('<PostMedia />', function() {

});
