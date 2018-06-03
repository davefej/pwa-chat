export default class HttpService {

  constructor(param) {
    this.instance = null;
    if (!param) {
      throw Error("Illegal Constructor call!");
    }
    this.data = {};
    this.data.users = [];
    this.newMessages = [];
    this.msgArrivedCallback = null;
  }

  getUsers() {
    return this.data.users;
  }

  getMessages(userId) {
    if (this.data.messages[userId]) {
      return this.data.messages[userId];
    } else {
      return {
        user: "",
        messages: []
      }
    }
  }

  bindMessages(toUserId, data) {
    let service = this;
    $.get({
      dataType: "json",
      url: "messages/" + this.msgid(toUserId, this.userId),
      success: function (res) {
        if (!res.ok) {
          return;
        }
        for (var i = 0; i < res.messages.length; i++) {
          res.messages[i].receive = res.messages[i].sender != service.userId;
          data.push(res.messages[i]);
        }
      },
      error: function () {

      }
    });
  }

  sendMessage(toUserId, txt) {
    $.post({
      dataType: "json",
      url: "messages/" + this.msgid(toUserId, this.userId),
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        msg: {
          txt: txt,
          sender: this.userId
        }
      }),
      success: function () {

      },
      error:function(){
        if(!localStorage.unsent){
          localStorage.unsent = [];

        }
        localStorage.unsent.push({
          msgId:this.msgid(toUserId, this.userId),
          txt:txt,
          sender:this.userId
        });
        navigator.serviceWorker.ready.then(function(swRegistration) {
          return swRegistration.sync.register('syncMessages');
        });
      }
    });
  }

  msgid(id1, id2) {
    if (id1 < id2) {
      return id1 + "_" + id2;
    } else {
      return id2 + "_" + id1;
    }
  }

  bindUsers(data) {
    var service = this;
    $.get({
      dataType: "json",
      url: "users",
      success: function (res) {
        service.users = res;
        for (var key in res) {
          data.push({
            id: key,
            name: res[key].user
          });
        }
      }
    });
  }

  logIn(user, pass, success) {
    var service = this;
    this.userName = user;
    $.post({
      dataType: "json",
      url: "auth/login",
      data: {
        user: user,
        pass: pass
      },
      success: function (res) {
        service.userId = res.id;
        service.logged = true;
        success();
        service.pollActive = true;
        service.pollServer();
      },
      error:function(){
        service.userName = null;
      }
    });
    this.logged = true;
  }

  signUp(user, pass, success) {
    this.userName = user;
    var service = this;
    $.post({
      dataType: "json",
      url: "auth/register",
      data: {
        user: user,
        pass: pass
      },
      success: function () {
        service.logged = true;
        success();
      },error:function(){
        service.userName = null;
      }
    });

  }

  logOut() {
    this.logged = false;
  }

  loggedIn() {
    if (typeof dev != "undefined" && dev) {
      return true;
    }
    return this.logged;
  }

  static instance() {
    if (!HttpService.inst) {
      HttpService.inst = new HttpService(true);
    }
    return HttpService.inst;
  }

  getUserNameById(id) {
    if (this.users && this.users[id]) {
      return this.users[id].user;
    }
  }

  pollServer() {
    var service = this;
    if (this.pollActive) {
      window.setTimeout(function () {
        $.ajax({
          url: "messages/polling/" + service.userId,
          method:"GET",
          success: function (result) {
            if(result && result.sender && result.txt){
              if(result.sender != service.userId){
                service.messageArrived(result);
              }
            }
            //SUCCESS LOGIC
            service.pollServer();
          },
          error: function () {
            //ERROR HANDLING
            service.pollServer();
          }
        });
      }, 10);
    }
  }

  messageArrived(msg){
    if(this.msgArrivedCallback){
      this.msgArrivedCallback(msg);
    }
  }
  subscribe(cb){
    this.msgArrivedCallback = cb;
  }

  getUserName(){
      return this.userName || "";
  }
}

//var dev = true;

