<template>
  <NavBar></NavBar>
  <div class="wrapper">
    
    <h1>О проекте</h1>
    <p>Данный сайт был разработан в рамках выпускной квалификационной работы. Однако в результате появилась идея развивать его дальше.</p>
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