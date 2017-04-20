import Vue from 'vue'
import App from './App.vue'

import Promise from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = Promise
}

const initialize = ({selector, api, userId}) => {
  if (!/\/$/.test(api)) {
    api += '/'
  }

  api += userId

  return new Vue({
    api,
    el: selector,
    render: h => h(App)
  })
}

export { initialize }
