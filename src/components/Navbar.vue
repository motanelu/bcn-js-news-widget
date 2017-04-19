<template>
  <ul :class="cssClass">
    <li v-for="category in categories"
      :class="[category.id === selected.id ? 'selected' : '']"
      :title="category.name"
      v-on:click="$emit('select', category)">
      {{category.name}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'header',
  props: [
    'cssClass',
    'categories',
    'selected'
  ]
}
</script>

<style scoped>
ul {
  display: flex;
  align-items: stretch;
  list-style-type: none;
}

ul li {
  background-color: #eee;
  flex-grow: 1;
  padding: 5px;
  border-bottom: solid 5px #eee;
  cursor: pointer;
}

ul li.selected {
  border-color: #cdf;
}

</style>

