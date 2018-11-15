var socket = io();
$('form').submit(function(){
  socket.emit('chat message', $('#m').val())
  $('#m').val('');
  return false;
})

socket.on('chat message', function(newMessages) {
    const my_id = "13361";
    const tempScrollTop = document.getElementById("chat-messages").scrollTop;
    document.getElementById("chat-messages").innerHTML = ""

    newMessages.map(y =>  {
        const student_id = y.student_id;
        const nick = y.nick;
        const message = y.text
         
        const p = document.createElement("p")
        p.className ="other-message"
        if (student_id === my_id){
          p.className = "my-message"
        }
        p.innerHTML = ""+nick+"#"+student_id+":<br />"+message
        document.getElementById("chat-messages").append(p)
      })   
})