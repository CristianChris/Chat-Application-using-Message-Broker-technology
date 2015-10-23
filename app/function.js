 var ws = new WebSocket('ws://' + window.document.location.host);
 ws.onmessage = function(message) {
   var msgDiv = document.createElement('div');
   msgDiv.innerHTML = message.data;
   document.getElementById('messages').appendChild(msgDiv);
  };

 function sendMessage() {
   var message = document.getElementById('msgBox').value;
    ws.send(message);
  }

function sendFile() {
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
      var file = fileInput.files[0];
      var textType = /text.*/;
      if (file.type.match(textType)) {
        var reader = new FileReader();
        reader.onload = function(e) {
          ws.send(reader.result);
        }
        reader.readAsText(file);
      } else {
        fileDisplayArea.innerText = "File not supported!"
      }
    });
}



