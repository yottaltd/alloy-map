const wp = require('@cypress/webpack-preprocessor');

module.exports = (on) => {
  const options = {
    webpackOptions: require('../../../webpack.config'),
  };

  // remove externals, we want to load all dependencies into cypress!
  options.webpackOptions.externals = {};
  on('file:preprocessor', wp(options));
};
