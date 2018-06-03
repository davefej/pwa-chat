var unsentmessages = [];
self.onmessage = function (msg) {
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
  while((item =  unsentmessages.pop()) != null){
    syncMessage(item);
  }
  localStorage.unsent = "[]";
}

function syncMessage(msg){
  $.post({
    dataType: "json",
    url: "messages/" + msg.msgId,
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
      msg: {
        txt: msg.txt,
        sender: msg.sender
      }
    })});
}
