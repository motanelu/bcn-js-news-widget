module.exports = {
  'Smoke test': browser => {
    browser
      .url('http://127.0.0.1:9000/static/smoke.html')
      .waitForElementVisible('#app.news-widget', 1000)

      // header assertions
      .assert.elementCount('.news-widget-navbar li', 2)

      // first element is selected and correctly populated
      .assert.containsText('.news-widget-navbar li:first-child', 'Financial')
      .assert.cssClassPresent('.news-widget-navbar li:first-child', 'selected')

      // second element is not selected and correctly populated
      .assert.containsText('.news-widget-navbar li:last-child', 'Sports')
      .assert.cssClassNotPresent('.news-widget-navbar li:last-child', 'selected')

      // the news items are displayed correctly
      .assert.elementCount('.news-widget-content ul li', 2)
      .assert.attributeContains(
        '.news-widget-content ul li:first-child div.image img',
        'src',
        'http://static.fake.news/images/1.jpg'
      )
      .assert.attributeContains(
        '.news-widget-content ul li:first-child div.content a',
        'href',
        'http://fake.news/item/1'
      )
      .assert.containsText(
        '.news-widget-content ul li:first-child div.content a',
        'Everybody\'s rich'
      )
      .assert.containsText(
        '.news-widget-content ul li:first-child div.content span',
        'Sun Apr 16 2017'
      )
      .assert.containsText(
        '.news-widget-content ul li:first-child div.content p',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      )

      // if no image is provided, the default one is inserted
      .assert.attributeContains(
        '.news-widget-content ul li:last-child div.image img',
        'src',
        'https://placeholdit.imgix.net/~text?txtsize=33&txt=thumb&w=60&h=60'
      )

      // select the second tab
      .click('.news-widget-navbar li:last-child')
      .pause(50)

      // the header is updated
      .assert.cssClassNotPresent('.news-widget-navbar li:first-child', 'selected')
      .assert.cssClassPresent('.news-widget-navbar li:last-child', 'selected')

      // the news list is updated
      .assert.elementCount('.news-widget-content ul li', 1)
      .assert.attributeContains(
        '.news-widget-content ul li:first-child div.image img',
        'src',
        'http://sport.news/images/barca.jpg'
      )
      .assert.attributeContains(
        '.news-widget-content ul li:first-child div.content a',
        'href',
        'http://sport.news/football/123'
      )
      .assert.containsText(
        '.news-widget-content ul li:first-child div.content a',
        'Barça wins'
      )
      .assert.containsText(
        '.news-widget-content ul li:first-child div.content span',
        'Sun Apr 16 2017'
      )
      .assert.containsText(
        '.news-widget-content ul li:first-child div.content p',
        'Vestibulum pulvinar velit vel diam convallis facilisis.'
      )

    .end()
  }
}
