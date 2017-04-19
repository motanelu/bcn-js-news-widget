const SauceLabs = require('saucelabs')

/**
 * Globals module for Nightwatch
 *
 * execute a callback after each test, informing Saucelabs
 * whether the test has passed or not, to be able to generate
 * the browser compatibility matrix
 *
 * Expected env variables:
 *   SAUCE_USERNAME
 *   SAUCE_ACCESS_KEY
 */
module.exports = {
  afterEach: function (client, done) {
    const saucelabs = new SauceLabs({
      username: process.env.SAUCE_USERNAME,
      password: process.env.SAUCE_ACCESS_KEY
    })

    const title = client.currentTest.name
    const sessionId = client.capabilities['webdriver.remote.sessionid']
    const passed = client.currentTest.results.failed === 0 && client.currentTest.results.errors === 0

    saucelabs.updateJob(sessionId, {
      title: title,
      passed: passed
    }, done)
  }
}
