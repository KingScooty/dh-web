import { parse as urlParse } from 'url';

export function containsString(string, { expanded_url }) {
  return expanded_url.indexOf(string) > -1;
}

export function getShortKeys(urls) {
  return urls.map(function ({ expanded_url }) {
    return urlParse(expanded_url).pathname.split('/')
    // Remove empty strings from array
    .filter(v => v !== '')
    .pop();
  });
}

export function isVine(urls) {
  return urls.filter(containsString.bind(null, 'vine'));
}

export function isInstagram(urls) {
  return urls.filter(containsString.bind(null, 'instagram'));
}
