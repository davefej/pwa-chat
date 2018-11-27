<template>
  <div class="contact-container waves-effect  " v-bind:class="{ user_me: (myUserId == id), currentUser: current }">
    <img class="contact-image" src="../assets/user.png"/>
    <div class="contact-details">
      <div class="contact-name">{{name}}</div>
      <div class="contact-descr">...</div>
    </div>
  </div>
</template>

<script>
  import HttpService from "../services/HttpService"
  let service = HttpService.instance();
    export default {
        name: "Contact",
        props: ['name','id',"current"],
        data:function(){
          return {
            myUserId:service.userId
          }
        }
    }
</script>

<style scoped>
.contact-container{
  width: 100%;
  padding: 1em;
  display: flex;
  align-items: center;
}

.contact-container:hover{
  background: #eeeeee;
}
  .contact-image{
    height: 3em;
    width: 3em;
  }

.contact-details{
    flex:1;
    text-align: left;
    margin-left: 2em;
  display: flex;
  flex-direction: column;

}
@media screen and (min-width: 728px){
  .currentUser{
    background:#dde9ff;
  }
}

.user_me{
  background:#dddddd;
}

.contact-name{
    font-size: 1.2em;
    font-weight: bold;
}
</style>
