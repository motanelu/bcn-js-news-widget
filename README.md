[![Build Status](https://saucelabs.com/browser-matrix/motanelu_bcnjs.svg)](https://saucelabs.com/beta/builds/72e23361ea9847d5a5f13fd036c6ccca)

[![Build Status](https://www.travis-ci.org/motanelu/bcn-js-news-widget.svg?branch=master)](https://www.travis-ci.org/motanelu/bcn-js-news-widget)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# bcnjs

> Demo application for BarcelonaJS

This repository is part of a proof of concept on how to use Nightwatch together with Saucelabs and express to test
frontend applications both locally and on Travis in isolation. It creates a [Vuejs](vuejs.org) widget that can be
dropped in any page, connects to a configurable API and displays news.

``` javascript
new NewsWidget({
  'selector': '#widget',
  'api': 'some.url',
  'userId': 1
})
```

The slides from the presentation are available on [SlideShare](https://www.slideshare.net/TudorBarbu/testing-frontends-with-nightwatch-saucelabs)

### Resources:

 * [Nightwatch](nightwatchjs.org)
 * [Saucelabs](https://saucelabs.com/)
 * [Travis CI](travis-ci.org)

### Prerequisites

First install all the dependencies by running

``` bash
npm install
```

Create a [Saucelabs](https://saucelabs.com/) account, install `sauce-connect` available via brew for OSX users and
export the credentials as environment variables.

``` bash
brew cask install sauce-connect
export SAUCE_USERNAME="..."
export SAUCE_ACCESS_KEY="..."
```

Start the tunnel to Saucelabs by calling `sauce-connect`. Sauce-connect needs to be running for the entire duration of
the tests, stopping it will sever the link to Saucelabs.

``` bash
sc
```

In a new terminal, run

```
npm run test
```
