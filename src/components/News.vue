<template>
  <div :class="cssClass">
    <ul>
      <template v-if="!fetching">
        <template v-if="items" v-for="item in items">
          <li>
              <div class="image">
                <img :src="item.image || 'https://placeholdit.imgix.net/~text?txtsize=33&txt=thumb&w=60&h=60'">
              </div>
              <div class="content">
                <a :href="item.url">{{item.title}}</a> <span class="date">{{item.timestamp | date}}</span>
                <p>{{item.excerpt}}</p>
              </div>
          </li>
        </template>
        <li v-else class="empty">
          <span>Nothing interesting has happened</span>
          <a href="https://www.sadtrombone.com/?autoplay=true">Click for audio</a>
        </li>
      </template>
      <li v-else class="fetching"><span>Loading</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'news',
  props: [
    'cssClass',
    'items',
    'fetching'
  ],
  filters: {
    date (timestamp) {
      const d = new Date(+timestamp)
      return d.toDateString()
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 5px;
  margin-top: 2em;
  font-size: 14px;
}
ul li {
  display: flex;
  border-bottom: solid 1px #ccc;
  padding-top: 3px;
}
div.image {
  flex-basis: 60px;
  flex-grow: 0;
  flex-shrink: 0;
  height: 60px;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
}
div.content {
  padding-left: 10px;
}
a {
  color: #555;
}
p {
  text-align: justify;
  font-size: 12px;
}
.date {
  color: #ccc;
}
</style>
