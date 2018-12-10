require('babel-polyfill');

global.regeneratorRuntime = regeneratorRuntime;

module.exports = {
  // verbose: true,

  testEnvironment: 'node',
  testPathIgnorePatterns: ['/.cache/']
  // transformIgnorePatterns: ['/node_modules/(?!event-pubsub).+\\.js$'],
  // transform: {
  //   '^.+\\.js$': 'babel-jest'
  // }
};
