<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark primary-color">

      <!-- Navbar brand -->
      <img class="back-img" v-if="back" @click="backClicked" />

      <a class="navbar-brand" href="#">PWA - CHAT</a>
    </nav>

    <router-view @showBack="backVisible(true)" @hideBack="backVisible(false)" ref="backobj"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data:function(){
    return {
      back:false
    }
  },
  methods:{
    backVisible(bool){
      this.back = bool
    },
    backClicked(){
        this.$refs.backobj.backClicked();
    }
  }
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

  .back-img{
    background-image: url("assets/left-arrow.png");
    background-size: contain;
    width: 30px;
    height:30px;
  }
</style>
