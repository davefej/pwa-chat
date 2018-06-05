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


if (!('indexedDB' in window)) {
  alert('This browser doesn\'t support IndexedDB');
}else{
  dbPromise = idb.open('db', 1,function(upgradeDb){
    if (!upgradeDb.objectStoreNames.contains('unSyncedMessages')) {
      upgradeDb.createObjectStore('unSyncedMessages');
    }
  });

}




