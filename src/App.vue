<template>
  <div class="news-widget" id="app">
    <template v-if="state === 'loading' || state === 'error'">
      <div class="single">
        <template v-if="state !== 'error'" >
          <h2>Error</h2>
          <p>The content could not be loaded</p>
        </template>
        <span v-else class="loading" />
      </div>
    </template>
    <template v-else>
      <navbar
        cssClass="news-widget-navbar"
        :categories="categories"
        :selected="selected"
        v-on:select="select($event)"
      />
      <news cssClass="news-widget-content" :items="items" :fetching="fetching" />
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from './components/Navbar.vue'
import News from './components/News.vue'

export default {
  name: 'NewsWidget',

  components: {
    'navbar': Navbar,
    'news': News
  },

  data () {
    return {
      state: 'loading',
      fetching: true,
      categories: [],
      selected: {},
      items: []
    }
  },

  created () {
    axios
      .get(`${this.$root.$options.api}/categories`)
      .then(response => response.data)
      .then(categories => {
        this.state = 'loaded'
        this.categories = categories
        this.select(categories[0])
      })
      .catch(() => {
        this.state = 'error'
      })
  },

  methods: {
    select (category) {
      this.selected = category
      this.fetching = true
      axios
        .get(`${this.$root.$options.api}/categories/${category.id}/news`)
        .then(response => response.data)
        .then(items => {
          this.items = items
          this.fetching = false
        })
        .catch(() => {
          this.state = 'error'
        })
    }
  }
}
</script>

<style scoped>
.news-widget, .news-widget * {
  margin: 0;
  padding: 0;
  font-family: "Comic Sans MS"; /* on purpose */
}
.news-widget {
  max-width: 332px;
  height: 440px;
  background-color: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,.15);
  color: #555;
}

.single {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
}

.loading {
  display: block;
  width: 50px;
  height: 50px;
  background: url('./assets/gears.svg');
}

.news-widget-navbar {
  height: 40px;
}

.news-widget-content {
  height: 400px;
}
</style>
