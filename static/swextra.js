
var unsentmessages = [];
self.onmessage = function (msg) {
  msg = msg.data;
  if(msg.type = "unsentmessage"){
    unsentmessages.push(msg.data)
  }
}

self.addEventListener('sync', function(event) {
  if (event.tag == 'syncMessages') {
    event.waitUntil(syncMessages());
  }
});

function syncMessages(){
  for(var i = 0; i < unsentmessages.length; i++){
    syncMessage(unsentmessages[i]);
  }
  unsentmessages = [];
}

function syncMessage(msg){


  const dbPromise = indexedDB.open( 'db', 1 );
  dbPromise.then(function(db) {
    var tx = db.transaction('store', 'readonly');
    var store = tx.objectStore('store');
    return store.get('sandwich');
  }).then(function(msg) {

    setTimeout(function(){
      fetch("messages/" + msg.msgId, {
        mode:"no-cors",
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          msg: {
            txt: msg.txt,
            sender: msg.sender
          }
        }),
      }).then(function (response) {
        return response;
      })
        .then(function (text) {
          console.log('Request successful', text);
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });
    },1000);

  });
/*
  setTimeout(function(){
    fetch("messages/" + msg.msgId, {
      mode:"no-cors",
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        msg: {
          txt: msg.txt,
          sender: msg.sender
        }
      }),
    }).then(function (response) {
      return response;
    })
      .then(function (text) {
        console.log('Request successful', text);
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  },1000);
*/
}



