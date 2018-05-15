<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark primary-color">
      <!-- Navbar brand -->
      <a class="navbar-brand" href="#">PWA - CHAT</a>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

  html, body{
    height: 100%;
  }

@media screen and (min-width: 1580px){
  body{
    max-width: 1280px;
    margin: auto;
  }
}
</style>
