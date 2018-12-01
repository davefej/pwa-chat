// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



Vue.config.productionTip = false

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


import HttpService from "./services/HttpService"
var service = HttpService.instance();
function updateOnlineStatus(event) {

  if (navigator.onLine) {
    // handle online status
    service.pollServer();
  } else {
    // handle offline status
    console.log('offline');
  }
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);


window.DBVERSION = 1;
if (!('indexedDB' in window)) {
  alert('This browser doesn\'t support IndexedDB');
}else{
  var request = window.indexedDB.open("db",window.DBVERSION);
  request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStores = [
      {name:"messagesToSend",details:{keyPath:"time"}},
      {name:"recentMessages",details:{keyPath:"messageId"}},
      {name:"offlineUsers",details:{keyPath:"id"}}
    ];
    for(var i = 0; i < objectStores.length; i++){
      if (!db.objectStoreNames.contains(objectStores[i].name)) {
        db.createObjectStore(objectStores[i].name, objectStores[i].details);
      }
    }
  }
}
