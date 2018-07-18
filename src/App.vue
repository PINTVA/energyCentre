<template>
  <div id="app">
    <router-view></router-view>
    <tabbar v-show="isTab"></tabbar>
  </div>
</template>

<script>
  import tabbar from './components/foot-bar'
  export default {
    name: 'App',
    components: {
      tabbar: tabbar
    },
    computed: {
      isTab () {
        return this.$store.state.show
      }
    }
  }
</script>

<style>
</style>
