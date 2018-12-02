<template>
  <div class="chat-wall">
    <div class="user-header">
      {{user}}
    </div>
    <div id="messages-container" class="messages-container scrollbar scrollbar-primary">
      <div v-if="user != null" v-for="(message,index) in messages">
        <Message :message="message" :last="index == (messages.length-1)"/>
      </div>
      <div v-if="user == null">
        <div class="emptychatwall">Válasszon Felhasználót</div>
      </div>
    </div>

    <div class="message-input-container">
      <div id="msginput" class="msg-input scrollbar scrollbar-primary" contenteditable="true" ref="txtinput" v-on:keyup="txtTyped"
           placeholder="Enter text here...">
      </div>

      <div class="extra-features">
        <button class=" msg-icons emojipicker">
          😄
        </button>
        <div id="speech-rec" class="speech-recognition" v-on:click="speechToText()">

        </div>
      </div>
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
        this.scrolldown();
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
            if(objDiv){
              objDiv.scrollTop = objDiv.scrollHeight;
            }

          },200);
        },
      focusOnText(){
       var el = $("#msginput").get()[0];
        el.focus();
        if (typeof window.getSelection != "undefined"
          && typeof document.createRange != "undefined") {
          var range = document.createRange();
          range.selectNodeContents(el);
          range.collapse(false);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
          var textRange = document.body.createTextRange();
          textRange.moveToElementText(el);
          textRange.collapse(false);
          textRange.select();
        }
      },
        speechToText(){
            var txtinput = this.$refs.txtinput;
            const recognition = new window.SpeechRecognition();
            recognition.lang="hu";
            $("#speech-rec").addClass("speech-recognition-active");
            var module = this;
            var removeClass = function(){
              $("#speech-rec").removeClass("speech-recognition-active");
              module.focusOnText();
            }

            recognition.onresult = (event) => {
              const spokenTexz = event.results[0][0].transcript;
              txtinput.textContent += " " + spokenTexz;
              removeClass();
            }
            recognition.onerror = (event) => {
              removeClass();
            }
            recognition.onnomatch = function(event) {
              console.log("No match");
              removeClass();
            }
            recognition.start();
          }
      },
     created: function () {
        this.scrolldown();
     },
    mounted:function(){
      var txtinput = this.$refs.txtinput;
      let module = this;
      $('.emojipicker').lsxEmojiPicker({
        twemoji: true,
        onSelect: function(emoji){
          var values = emoji.value.split(";");
          for(var i = 0; i < values.length; i++){
            txtinput.textContent += String.fromCodePoint(values[i].replace("&#","0"));
          }
          console.log(emoji);
          module.focusOnText();
        }
      });
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
    width: 99%;
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

  .emojipicker{
    background: transparent;
    border: none;
    width: 2em;
    flex:1;

    cursor: pointer;
  }

  .speech-recognition{
    color:grey;
    flex:1;
    background: transparent;
    border: none;
    background-image:url('../assets/mic.gif');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    cursor:pointer;
  }

  .speech-recognition-active{
    background-image:url('../assets/mic-animate.gif');
  }
  .extra-features{
    display:flex;
    flex-direction: column;
  }
</style>
