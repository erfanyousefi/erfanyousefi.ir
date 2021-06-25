<template>
<router-view></router-view>
</template>

<script>
import ("bootstrap/dist/css/bootstrap.min.css")
import ("bootstrap/dist/js/bootstrap.bundle.js")
import("@/assets/dist/fonts/font-awesome/css/font-awesome.min.css")
import { loadProgressBar } from 'x-axios-progress-bar'
 import("x-axios-progress-bar/dist/nprogress.css")
export default {
  name: 'App',
  components: {
  },
  setup(){
  loadProgressBar()
  }
}
</script>

<style>

</style>
