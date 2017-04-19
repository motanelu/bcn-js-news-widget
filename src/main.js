import Vue from 'vue'
import App from './App.vue'

const initialize = ({selector, api, userId}) => {
  if (!api.endsWith('/')) {
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
