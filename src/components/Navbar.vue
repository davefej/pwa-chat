<template>
  <nav class="navbar navbar-expand-lg navbar-dark primary-color">

    <!-- Navbar brand -->
    <div class="back-img" v-if="back" @click="backClicked" >&nbsp;</div>


    <a class="navbar-brand" href="#">PWA - CHAT</a>
    <a class="nav-item whitecolor" href="#">{{userName}}</a>
    <!--<div @click="nearby" class="nearbyimg"></div>-->
  </nav>
</template>

<script>
    export default {
      name: "Navbar",
      props: ['defaultback'],
      data:function(){
          return {
            back: false,
            userName:""
          }
      },
      mounted:function(){
        this.back = this.defaultback || false;
      },
      methods:{
          backClicked(){
            this.$emit('back');
          },
          nearby(){
            this.$router.push("nearby");
          },
          backVisible(bool) {
            this.back = bool;
          },
          setUser(name){
            this.userName = name;
          }
      }
    }
</script>

<style scoped>

  .back-img{
    background-image: url("../assets/left-arrow.png");
    background-size: contain;
    width: 30px;
    height:30px;
    cursor:pointer;
  }

  .nearbyimg{
    background-image: url('../assets/mapsmarker.png');
    background-size: contain;
    height: 2em;
    width: 2em;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }

  .whitecolor{
    color:white;
  }
</style>
