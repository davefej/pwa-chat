<template>
<div class="message-item-conatainer">
  <div v-if="message.receive" class="message-item incoming-message-item ">
    {{message.txt}}
  </div>
  <div v-if="!message.receive" class="message-item outgoing-message-item">
    {{message.txt}}
  </div>
</div>
</template>

<script>
    export default {
        name: "Message",
      props: ['message']
    }
</script>

<style scoped>

  .message-item-conatainer{
    width: 100%;
    min-height: 2em;
    padding-left: 1em ;
    padding-right: 1em;
    display: inline-block;
  }

.incoming-message-item{
  float: left;
  background-color: #607fda;
  color:white;
}

  .outgoing-message-item{
    float: right;

    background-color: #f1f1f1;
  }

  .message-item{
    padding:0.6em;
    border-radius: 1em;
    max-width: 47%;
    word-wrap: break-word;
  }
</style>
