const path = require('path')

const TRAVIS_JOB_NUMBER = process.env.TRAVIS_JOB_NUMBER
const SAUCE_USERNAME = process.env.SAUCE_USERNAME
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY

module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],
  globals_path: path.join(__dirname, 'nightwatch.globals.conf.js'),
  test_workers: false,

  test_settings: {
    /**
     * Default configuration, for all platforms
     */
    default: {
      launch_url: 'http://ondemand.saucelabs.com:80',
      selenium_port: 80,
      selenium_host: 'ondemand.saucelabs.com',
      silent: true,
      username: SAUCE_USERNAME,
      access_key: SAUCE_ACCESS_KEY,
      desiredCapabilities: {
        build: 'build-' + TRAVIS_JOB_NUMBER,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
        timeZone: 'Madrid'
      }
    },

    chrome56: {
      desiredCapabilities: {
        browserName: 'chrome',
        platform: 'Windows 10',
        version: '56.0',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
