<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <NavBar></NavBar>
  </div>

  <div class="wrapper">
    
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar
  }
}
</script>

<style>
.wrapper {
  min-width: 80vw;
  min-height: 80vh;
  /* background-color: cyan; */
}
</style>