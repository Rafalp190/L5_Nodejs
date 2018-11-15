const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const FormData = require('form-data')
const fetch = require('node-fetch')
const axios = require('axios')


const my_id = "13361";
const my_nick = "rafalp";

function getMessages(url) {
  console.log('in')
  let messages
  fetch(url)
    .then(x => x.json())
    .then((y) => {
      console.log(y)
    })
}

function sendMessage(msg) {
  const formData = new FormData()
  formData.append('text', msg)
  formData.append('student_id', my_id)
  formData.append('nick', my_nick)
  fetch('http://34.210.35.174:7000', { method: 'post', body: formData })
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html')
})

io.on('connection', function(socket){
  console.log('a user connected')
  socket.on('disconnect', function(){
    console.log('user disconnected')
  })
  socket.on('chat message', function(msg) {
    sendMessage(msg)
  });
})

io.on('connection', async function(socket) {
  const response = await axios.get('http://34.210.35.174:7000')
  const message = response.data 
  io.emit('chat message', message)
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})







