<template>
<div class="chat-wall">
  <div class="user-header">
   {{user}}
  </div>
  <div class="messages-container scrollbar scrollbar-primary">
    <div v-for="message in messages">
      <Message :message="message" />
    </div>
  </div>

  <div class="message-input-container">
     <div class="msg-input scrollbar scrollbar-primary" contenteditable="true" placeholder="Enter text here..."></div>
    <div class="msg-icons"></div>
  </div>
</div>
</template>

<script>
    import Message from "./Message";
    export default {
        name: "ChatWall",
      components: {Message},
      data:function(){
          return {
            user:"Tibike1",
            messages:[
              {receive:1,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
              {receive:0,txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", time:"2018.05.14 10:00:00"},
              {receive:1,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
              {receive:0,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
              {receive:0,txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", time:"2018.05.14 10:00:00"},
              {receive:0,txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", time:"2018.05.14 10:00:00"},
              {receive:1,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
              {receive:0,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
              {receive:1,txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", time:"2018.05.14 10:00:00"},
              {receive:0,txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", time:"2018.05.14 10:00:00"},
              {receive:1,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
              {receive:0,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
              {receive:0,txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", time:"2018.05.14 10:00:00"},
              {receive:0,txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", time:"2018.05.14 10:00:00"},
              {receive:1,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
              {receive:0,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"}
            ].reverse()
          }
      }
    }
</script>

<style scoped>
  .user-header{
    font-size: 2em;
    font-weight: bold;
  }


  .messages-container{
    overflow-y: auto;
    flex:1;
  }

  .message-input-container{
    width: 100%;
    border-top: 1px solid #cecece;
    flex-direction: row;
    display: flex;
    max-height:5em;
  }

  .msg-input{
    flex:1;
    overflow-y:auto;
    min-height: 2.5em;
    text-align: left;
    padding:0.2em;
  }

  .msg-icons{
   /* width: 30%; */
    height:2em;
  }

  .chat-wall{
    display: flex;
    flex-direction: column;
    height: 100%;
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
    background-color: #4285F4;
  }






  div[contenteditable=true]:empty:before{
    content: attr(placeholder);
    display: block; /* For Firefox */
  }


  div[contenteditable=true] {

    width: 290px;
    padding: 5px;
  }


</style>
