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
    this.locationStr = null;
    this.updateLocation();
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
    var msgId = this.msgid(toUserId, this.userId);
    $.get({
      dataType: "json",
      cache: false,
      url: "messages/" + msgId,
      success: function (res) {
        if (!res.ok) {
          return;
        }
        var offlineMessages = [];
        var offlineMessagesStarter = res.messages.length - offlineMessagesCount;
        for (var i = 0; i < res.messages.length; i++) {
          if (res.messages[i]) {
            res.messages[i].receive = res.messages[i].sender != service.userId;
            data.push(res.messages[i]);
            if (offlineMessagesStarter < i) {
              offlineMessages.push(res.messages[i]);
            }
          }
        }
        service.saveToDb({
          store: 'offlinemsgs_' + msgId,
          data: {
            messages: offlineMessages,
            time: (new Date()).getTime()
          }
        });

      },
      error: function () {
        console.log("Offline működés!");
        service.loadFromDb({
          error:function(){console.error("Cannot load offline data")},
          success:function(offlineData){
            for(var i = 0; i < offlineData.length ; i++){
              data.push(offlineData[i]);
            }
          },
          store:'offlinemsgs_' + msgId
        })
      }
    });
  }

  sendMessage(toUserId, txt) {
    let service = this;
    $.post({
      dataType: "json",
      cache: false,
      url: "messages/" + this.msgid(toUserId, this.userId),
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        msg: {
          txt: txt,
          sender: this.userId,
          location:service.locationName()
        }
      }),
      success: function () {

      },
      error: function () {
        service.saveToDb({
          store: 'unSyncedMessages',
          data: {
            msgId: service.msgid(toUserId, service.userId),
            txt: txt,
            sender: service.userId,
            time: (new Date()).getTime()
          }
        });

        navigator.serviceWorker.ready.then(function (swRegistration) {
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
      cache: false,
      url: "users",
      success: function (res) {
        service.users = res;
        var currentUser = null;
        for (var key in res) {
          if (key == service.userId) {
            currentUser = {
              id: key,
              name: res[key].user
            };
          } else {
            data.push({
              id: key,
              name: res[key].user
            });
          }

        }
        if (currentUser) {
          data.push(currentUser);
        }
        service.saveToDb({
          store: 'offlineusers',
          data: {
            messages: data,
            time: (new Date()).getTime()
          }
        });
      },
      error:function(){
        service.loadFromDb({
          error:function(){console.error("Cannot load offline data")},
          success:function(offlineData){
            for(var i = 0; i < offlineData.length ; i++){
              data.push(offlineData[i]);
            }
          },
          store:'offlineusers'
        });
      }
    });
  }

  logIn(user, pass, success, failure) {
    var service = this;

    this.userName = user;
    fetch("auth/login", {
      method: "post",
      body: JSON.stringify({
        user: user,
        pass: pass
      }),
      headers: {
        'content-type': 'application/json'
      },
      cache: 'no-cache'
    }).then(function (response) {
      return response.json();
    }).then(function (res) {
      service.userId = res.id;
      service.logged = true;
      success();
      service.pollServer();
      service.registerPush();
      service.requestNotificationPermission();
      localStorage.setItem("salt", res.salt);
      localStorage.setItem("userid", res.id);
      localStorage.setItem("auth", md5(sha256.pbkdf2(pass, res.salt, 1000, 32)));
    }).catch(function (error) {
      if (navigator && !navigator.onLine && localStorage && localStorage.getItem("salt") && localStorage.getItem("auth") &&
        md5(sha256.pbkdf2(pass, localStorage.getItem("salt"), 1000, 32)) == localStorage.getItem("auth")) {
          service.userId =localStorage.getItem("userid");
          service.logged = true;
          success();
          service.requestNotificationPermission();
          service.pollServer();
          service.registerPush();

        }else{
        service.userName = null;
        if(failure){
          failure();
        }else{
          console.error("Offline load fail")
        }

      }

    });
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
      }, error: function () {
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
    var pending = 0;
    if(navigator && !navigator.onLine){
      pending = 1000;
    }
    window.setTimeout(function () {
      $.ajax({
        url: "messages/polling/" + service.userId,
        method: "GET",
        cache: false,
        success: function (result) {
          if (result && result.sender && result.txt) {
            if (result.sender != service.userId) {
              service.messageArrived(result);
            }
          }
          //SUCCESS LOGIC
          service.pollServer();
        },
        error: function () {
          //ERROR HANDLING
          console.error("pollserver Errored");
          service.pollServer();
        }
      });
    }, pending);

  }

  messageArrived(msg) {
    if (this.msgArrivedCallback) {
      this.msgArrivedCallback(msg);
    }
  }

  subscribe(cb) {
    this.msgArrivedCallback = cb;
  }

  getUserName() {
    return this.userName || "";
  }

  loadFromDb(param) {
    var request = window.indexedDB.open("db", window.DBVERSION);
    request.onsuccess = function (event) {
      var db = event.target.result;
      var tx = db.transaction(param.store, 'readwrite');
      var store = tx.objectStore(param.store);
      var list = [];
      store.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
          list.push(cursor.value);
          cursor.continue();
        } else {
          param.success(list);
        }
      };
    }
    request.onerror = function () {
      param.error();
    }
  }


  saveToDb(params){
    var request = window.indexedDB.open("db",window.DBVERSION);
    request.onsuccess = function(event){
      var db = event.target.result;
      var tx = db.transaction(params.store, 'readwrite');
      var store = tx.objectStore(params.store);
      var objectStoreRequest = store.add(params.data);

      objectStoreRequest.onsuccess = function(event) {

        console.log("Sikeres!")
      };

      objectStoreRequest.onerror = function(e){

        console.error(e);
      }
    }
  }
  myLocation(locationCallback){
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(locationCallback);
    }else{
        locationCallback(false);
    }

  }
  locationName(){
     return this.locationStr;
  }
  updateLocation(){
    var service = this;
    if(!this.locationTimer && navigator.geolocation){
      var updateLoc = function(){
        service.myLocation(function(position){
          var geocoder = new google.maps.Geocoder();
          var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          geocoder.geocode({'latLng': geolocate}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var result;
              if (results.length > 1) {
                result = results[1];
              } else {
                result = results[0];
              }
              var locationStr = result.address_components[3].long_name+", "+result.address_components[2].long_name;;
              console.log("Location updated!",locationStr);
              service.locationStr = locationStr;
            }
          });
        })};
        this.locationTimer = setInterval(updateLoc,1000*60*10);//10 min
      setTimeout(function(){
        updateLoc();
      },1000);

    }

  }
  registerPush(){
    var service = this;
    var intervalId = setInterval(function(){
      if(!window.registration){
        return;
      }
      console.log("registerpush");
      clearInterval(intervalId);
      const publicVapidKey = 'BExzC1HY_R6awc0BBYNLsVtJyWitteGMLqhA-f563Fs4yUWEP2JBRy4HSCiWciB1tPRRg9nKHdtxyGInOKPwqFw';
      window.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      }).then(function(subscription){
        fetch('push/'+service.userId, {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'content-type': 'application/json'
          }
        });
      });
    },1000);
  }
  requestNotificationPermission(){
    if (Notification.permission != 'granted') {
      Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
      });
    }
  }
  showMsgNotification(msg){
    var userName = this.getUserNameById(msg.sender);
    var msgShort = msg.txt.length > 20 ? msg.txt.substr(0,17)+"..." : msg.txt;
    var notificationJson = {
      body:msgShort,
      icon:'https://pwachat.ddns.net/static/img/icon192.png'
    };
    var title = userName+" üzenetet küldött!";
    navigator.serviceWorker.ready.then(function (swRegistration) {
      return swRegistration.showNotification(title,notificationJson);
    });
  }
}
var offlineMessagesCount = 10;
//var dev = true;

