
self.onmessage = function (msg) {
  msg = msg.data;
  if(msg.type = "...."){
    //DO something
  }
}

self.addEventListener('sync', function(event) {
  if (event.tag == 'syncMessages') {
    event.waitUntil(syncMessages());
  }
});

self.addEventListener('push', ev => {
  const data = ev.data.json();
  console.log('Got push', data);
  self.registration.showNotification(data.title, {
    body: "Üzenete érkezett",
    icon: 'https://pwachat.ddns.net/static/img/icon192.png'
  });
});

var DBVERSION = 10;

function syncMessages() {

  var request = indexedDB.open("db", DBVERSION);
  request.onsuccess = function (event) {
    var db = event.target.result;
    var tx = db.transaction("unSyncedMessages", 'readwrite');
    var store = tx.objectStore("unSyncedMessages");
    var items = store.getAll().onsuccess = function (event) {
      var dataarr = event.target.result;
      setTimeout(function () {

        for (var i = 0; i < dataarr.length; i++) {
          var msg = dataarr[i];
          fetch("messages/" + msg.msgId, {
            mode: "cors",
            method: 'post',
            headers: {
              'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
              msg: {
                txt: msg.txt,
                sender: msg.sender
              }
            })
          }).then(function (response) {
            return response;
          }).then(function (text) {
            console.log('Request successful', text);
          }).catch(function (error) {
            console.log('Request failed', error);
          });
        }
        var request = indexedDB.open("db", DBVERSION);
        request.onsuccess = function (event) {
          var db = event.target.result;
          var tx = db.transaction("unSyncedMessages", 'readwrite');
          var store = tx.objectStore("unSyncedMessages");
          var objectStoreRequest = store.clear();
          objectStoreRequest.onsuccess = function (event) {
            console.log("Cleared!");
          };
        }


      }, 500);


    }

  }
  request.onerror = function (err) {
    console.err(err);
  }
}
