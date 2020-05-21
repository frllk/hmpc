<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import ajax from './utils/request'
export default {
  name: 'App',
  methods: {
    hTest () {
      ajax({
        method: 'get',
        url: '/app'
      })
    }
  }
}
</script>
<style lang="less">

</style>
