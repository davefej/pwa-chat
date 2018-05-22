<template>
  <div class="chat-wall">
    <div class="user-header">
      {{user}}
    </div>
    <div id="messages-container" class="messages-container scrollbar scrollbar-primary">
      <div v-if="user != null" v-for="message in messages">
        <Message :message="message"/>
      </div>
      <div v-if="user == null">
        <div class="emptychatwall">Válasszon Felhasználót</div>
      </div>
    </div>

    <div class="message-input-container">
      <div class="msg-input scrollbar scrollbar-primary" contenteditable="true" ref="txtinput" v-on:keyup="txtTyped"
           placeholder="Enter text here...">

      </div>
      <div class="msg-icons"></div>
    </div>
  </div>
</template>

<script>
  import Message from "./Message";
  import HttpService from "../services/HttpService"

  var service = HttpService.instance();
  export default {
    name: "ChatWall",
    components: {Message},
    data: function () {
      return {
        messages: [],
        user: null,
        userId: null
      };
    },
    methods: {
      showMessages(userId) {
        this.userId = userId;
        this.messages = [];
        this.user = service.getUserNameById(userId);
        service.bindMessages(userId, this.messages);
      },
      txtTyped(event) {
        if (event.keyCode == 13 && event.key == "Enter") {
          if (event.shiftKey) {
            return;
          }
          var txt = this.$refs.txtinput.textContent;
          this.$refs.txtinput.textContent = "";
          if (txt.trim() === "") {
            return;
          }
          this.messages.push({
            receive: 0,
            time: new Date().toISOString(),
            txt: txt
          });

          this.scrolldown();
          service.sendMessage(this.userId, txt);
        }
      },
      msgArrived(msg) {
        this.messages.push(msg);
        this.scrolldown();
      },
      scrolldown(){
        setTimeout(
          function(){
            var objDiv = document.getElementById("messages-container");
            objDiv.scrollTop = objDiv.scrollHeight;
          },200);
        }
      },
     created: function () {
        this.scrolldown();

     }
  }
</script>

<style scoped>
  .user-header {
    font-size: 2em;
    font-weight: bold;
  }

  .messages-container {
    overflow-y: auto;
    flex: 1;
  }

  .message-input-container {
    width: 100%;
    border-top: 1px solid #cecece;
    flex-direction: row;
    display: flex;
    max-height: 5em;
  }

  .msg-input {
    flex: 1;
    overflow-y: auto;
    min-height: 3.6em;
    text-align: left;
    padding: 0.2em;
  }

  .msg-icons {
    /* width: 30%; */
    height: 2em;
  }

  .chat-wall {
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
    background-color: #d3d3d3;
  }

  div[contenteditable=true]:empty:before {
    content: attr(placeholder);
    display: block; /* For Firefox */
  }

  div[contenteditable=true] {
    white-space: pre;
    width: 290px;
    padding: 5px;
  }

  .emptychatwall {
    margin-top: 2em;
    color: #4285f4;
    font-size: 2em;
  }
</style>
