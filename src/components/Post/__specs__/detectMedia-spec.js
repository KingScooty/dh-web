/* eslint-env node, mocha */

import * as mediaHelpers from '../mediaHelpers';

var chai = require('chai');

var expect = chai.expect;

describe('mediaHelpers', function () {
  /*
   * containsString()
   */

  describe('containsString()', function () {
    var url = {
      url: 'http://vine.co/123456'
    };

    it('returns true if a string is found within a url object', function () {
      var result = mediaHelpers.containsString('vine', url);
      expect(result).to.be.true;
    });
    it('returns false if a string is not found within a url object', function () {
      var result = mediaHelpers.containsString('instagram', url);
      expect(result).to.be.false;
    });
  });

  /*
   * isVine()
   */

  describe('isVine()', function () {
    it('returns false if urls is empty', function () {
      var urls = [];
      var isVine = mediaHelpers.isVine(urls);
      expect(isVine).to.be.empty;
    });

    it('returns false if there are no vine links', function () {
      var urls = [
        {url: 'http://instagram.com/4234234'},
        {url: 'http://instagram.com/546'},
        {url: 'http://instagram.com/54634235235'}
      ];
      var isVine = mediaHelpers.isVine(urls);
      expect(isVine).to.be.empty;
    });

    it('returns an array of existing vine entities', function () {
      var urls = [
        {url: 'http://vine.co/4234234'},
        {url: 'http://instagram.com/546'},
        {url: 'http://vine.co/54634235235'}
      ];
      var expectedUrls = [
        {url: 'http://vine.co/4234234'},
        {url: 'http://vine.co/54634235235'}
      ];

      var isVine = mediaHelpers.isVine(urls);

      expect(isVine.length).to.equal(2);
      expect(isVine).to.deep.equal(expectedUrls);
    });
  });

  /*
   * isInstagram()
   */

  describe('isInstagram()', function () {
    it('returns false if urls is empty', function () {
      var urls = [];
      var isInstagram = mediaHelpers.isInstagram(urls);
      expect(isInstagram).to.be.empty;
    });

    it('returns false if there are no instagram links', function () {
      var urls = [
        {url: 'http://vine.co/4234234'},
        {url: 'http://vine.co/546'},
        {url: 'http://vine.co/54634235235'}
      ];
      var isInstagram = mediaHelpers.isInstagram(urls);
      expect(isInstagram).to.be.empty;
    });

    it('returns an array of existing instagram entities', function () {
      var urls = [
        {url: 'http://instagram.com/4234234'},
        {url: 'http://vine.co/546'},
        {url: 'http://instagram.com/54634235235'}
      ];
      var expectedUrls = [
        {url: 'http://instagram.com/4234234'},
        {url: 'http://instagram.com/54634235235'}
      ];

      var isInstagram = mediaHelpers.isInstagram(urls);

      expect(isInstagram.length).to.equal(2);
      expect(isInstagram).to.deep.equal(expectedUrls);
    });
  });

  /*
   * getShortKeys()
   */

  describe('getShortKeys()', function () {
    var urls = [
      {url: 'http://instagram.com/4234234'},
      {url: 'http://instagram.com/546'},
      {url: 'http://instagram.com/54634235235'}
    ];

    it('returns an array of shorkeys for all urls', function () {
      var shortkeys = mediaHelpers.getShortKeys(urls);
      var expectedResult = [
        '4234234',
        '546',
        '54634235235'
      ];

      expect(shortkeys).to.deep.equal(expectedResult);
    });
  });
});
