<template>
<div class="message-item-conatainer" v-on:click="showDetails()">
  <div v-if="message.receive" class="message-item incoming-message-item ">
    <div class="incoming-msg">{{message.txt}}</div><div v-if="message.location" ref="details" class="message-receive-location">{{message.location}} {{beautifyTime(message.time)}}</div></div>
  <div v-if="!message.receive" class="message-item outgoing-message-item">{{message.txt}}</div>
</div>
</template>

<script>
    export default {
        name: "Message",
      props: ['message',"last"],
      methods:{
        showDetails() {
          console.log("aa")
          var node = this.$refs.details;
          if(node){
            node.style.display = "block";
          }

        },
        beautifyTime(time){
          if(!time){
            return "";
          }
          var d = new Date(time);

          if(this.isToday(d)){
              return d.toLocaleTimeString();
          }else{
              return d.toLocaleString();
          }
        },
        isToday(date){
          return date.toDateString() == new Date().toDateString();
        }
      }
    }
</script>

<style scoped>

  .message-item-conatainer{
    width: 100%;
    min-height: 2em;
    padding-left: 1em ;
    padding-right: 1em;
    display: inline-block;
    position:relative;

  }

.incoming-message-item{
  float: left;
  background-color: #f1f1f1;
  text-align: left;
}

  .outgoing-message-item{
    float: right;
    text-align: right;
    background-color: #607fda;
    color:white;
  }

  .message-item{
    padding:0.6em;
    border-radius: 1em;
    max-width: 57%;
    word-wrap: break-word;
    white-space: pre-wrap;
    cursor:pointer;
  }
  @media screen and (max-width: 728px){
    .message-item{
      max-width: 87%;
      margin-bottom:1em;
    }

    .message-item-conatainer{
      padding-right: 0.2em;
      padding-left: 0.2em;

    }
  }

  .message-receive-location{
    color: gray;
    float: left;
    font-size: 0.7em;
    display: none;
  }


</style>
