const helmet = require('helmet');

const trusted = ["'self'"];

module.exports = function contentSecurityPolicy(
  noncejs,
  noncefont,
  nonceimg,
  noncestyle
) {
  return helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: trusted,
      scriptSrc: [
        "'unsafe-eval'",
        "'unsafe-inline'",
        `nonce-${noncejs}`,
        'https://api.mapbox.com',
        'https://js.stripe.com/v3/',
        'mapbox-gl.js:35',
        'https://cdn.jsdelivr.net',
        // '*.mapbox.com',
      ].concat(trusted),
      connectSrc: ['http://127.0.0.1:3300', 'localhost:3300'].concat(trusted),
      workerSrc: ['http://127.0.0.1:3300', 'https://api.mapbox.com'].concat(
        trusted
      ),
      frameSrc: ['http://js.stripe.com/v3/'].concat(trusted),
      styleSrc: [
        "'unsafe-inline'",
        "'unsafe-eval'",
        `nonce-${noncestyle}`,
        // '*.gstatic.com',
        '*.googleapis.com',
        'https://api.mapbox.com',
        'mapbox://styles',
      ].concat(trusted),
      // frameSrc: [`'nonce-${nonce}'`, '*.stripe.com'].concat(trusted),
      fontSrc: [
        // '*.cloudflare.com',
        // 'https://*.cloudflare.com',
        // '*.bootstrapcdn.com',
        `nonce-${noncefont}`,
        '*.googleapis.com',
        'https://fonts.googleapis.com',
        // '*.gstatic.com',
        'data',
      ].concat(trusted),
      imgSrc: [
        `nonce-${nonceimg}`,
        'https://api.mapbox.com',
        'css?family=Lato',
        'https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js',
        'data',
      ].concat(trusted),
    },
    // set to true if you only want to report errors
    reportOnly: false,
    // set to true if you want to force buggy CSP in Safari 5
    safari5: false,
  });
};
