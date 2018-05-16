<template>
  <div class="home-container">

    <div id="userswall" class="left-side scrollbar scrollbar-primary">
      <users @userSelected="updateChatWall"/>
    </div>
    <div id="chatwall" class="right-side">
      <chat-wall ref="cw" />
    </div>
  </div>
</template>

<script>
  import Users from "./Users";
  import ChatWall from "./ChatWall";
  export default {
    components: {ChatWall, Users},
    props:["back"],
    methods:{
      updateChatWall(userId){
        this.$refs.cw.showMessages(userId);
        if (window.matchMedia('screen and (max-width: 728px)').matches) {
          this.mobileShowChat();
        }
      },
      mobileShowChat(){
        $("#userswall").hide();
        $("#chatwall").hide().show("slide", { direction: "right" }, 500);
        this.$emit('showBack');
      },
      mobileShowUsers(){
        $("#chatwall").hide();
        $("#userswall").show("slide", { direction: "left" }, 500);
        this.$emit('hideBack');
      },
      backClicked(){
        this.mobileShowUsers();
      }

    }

  }
</script>

<style scoped>

.home-container{
  display: flex;
  flex-direction: row;
  height: calc(100% - 60px);
  width: 100%;
}

.left-side{
  min-width: 350px;
  overflow-y: auto;
}

.right-side{
  border-left: 2px solid #c6c6c6;
  flex: 1;
  height: 100%;
}

  @media screen and (max-width: 728px){
  .left-side{
    width: 100%;
  }
    .right-side{
      display: none;
    }


  }


.scrollbar {
  float: left;
  background: #fff;
  overflow-y: scroll;
}


.scrollbar-primary::-webkit-scrollbar {
  width: 6px;
  background-color: #F5F5F5;
}

.scrollbar-primary::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #d3d3d3;
}


</style>
