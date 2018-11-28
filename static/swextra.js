
self.onmessage = function (msg) {
  msg = msg.data;
  if(msg.type = "...."){
    //DO something
  }
}

self.addEventListener('sync', function(event) {
  if (event.tag == 'unSentMessages') {
    event.waitUntil(syncMessages());
  }
});

self.addEventListener('push', ev => {
  const data = ev.data.json();
  console.log('Got push', data);
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    tag:"messageArrived",
    data:data.clickData
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("https://pwachat.ddns.net"+ "?messageId=" + event.notification.data.messageId)
  );
});

var DBVERSION = 2;

function syncMessages() {

  var request = indexedDB.open("db", DBVERSION);
  request.onsuccess = function (event) {
    var db = event.target.result;
    var tx = db.transaction("messagesToSend", 'readwrite');
    var store = tx.objectStore("messagesToSend");
    store.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        sendMessage(cursor.value);
        cursor.continue();
      } else {
       /*finished*/
        clearUnSentMessages();
      }
    };


    /*store.getAll().onsuccess = function (event) {
      var dataArray = event.target.result;
      setTimeout(function () {

        for (var i = 0; i < dataArray.length; i++) {
          var msg = dataArray[i];
          var messageId = msg.messageId;
          delete msg.messageId;
          fetch("messages/" + messageId, {
            mode: "cors",
            method: 'post',
            headers: {
              'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
              msg: msg
            })
          }).then(function (response) {
            return response;
          }).then(function (text) {
            console.log('unsentMessage Resend succesfull', text);
          }).catch(function (error) {
            console.error('unsentMessage Resend failed', error);
          });
        }
        var request = indexedDB.open("db", DBVERSION);
        request.onsuccess = function (event) {
          var db = event.target.result;
          var tx = db.transaction("messagesToSend", 'readwrite');
          var store = tx.objectStore("messagesToSend");
          var objectStoreRequest = store.clear();
          objectStoreRequest.onsuccess = function (event) {
            console.log("MessagesToSend Cleared!");
          };
        }

      }, 500);


    }*/

  }
  request.onerror = function (err) {
    console.err(err);
  }
}

function sendMessage(msg){
  var messageId = msg.messageId;
  if(!messageId){
    console.error("MessageId missing",msg);
    return;
  }

    fetch("messages/" + messageId, {
      mode: "cors",
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        msg: msg
      })
    }).then(function (response) {
      return response;
    }).then(function (text) {
      console.log('unsentMessage Resend succesfull', text);
    }).catch(function (error) {
      console.error('unsentMessage Resend failed', error);
    });

}

function clearUnSentMessages(){
  var request = indexedDB.open("db", DBVERSION);
  request.onsuccess = function (event) {
    var db = event.target.result;
    var tx = db.transaction("messagesToSend", 'readwrite');
    var store = tx.objectStore("messagesToSend");
    var objectStoreRequest = store.clear();
    objectStoreRequest.onsuccess = function (event) {
      console.log("MessagesToSend Cleared!");
    };
  }
}
