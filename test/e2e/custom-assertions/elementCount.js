exports.assertion = function (selector, count) {
  this.message = 'Testing if element <' + selector + '> has count: ' + count
  this.expected = count

  this.pass = value => value === this.expected
  this.value = result => result.value

  this.command = callback => {
    var self = this
    return this.api.execute(
      function (selector) {
        return document.querySelectorAll(selector).length
      },
      [selector],
      result => callback.call(self, result)
    )
  }
}
