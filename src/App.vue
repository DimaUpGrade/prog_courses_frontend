<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

:root {
  --logotext: #9ebfe5;
  --bright-background: #153758;
  --background-secondary: #87b3e6;
  --additional-block-bg: #a2c4eb;
  --text: #EDF4F8;
  --background: #0E243A;
  --primary: #2985C2;
  --secondary: #125581;
  --accent: #0b3ca6;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */

</style>
