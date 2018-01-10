var express = require('express');
var router = express.Router();
var http = require('http');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res) {
  res.render('home', { title: 'Express' });
});

io.on('connection', function(socket){
    console.log("User Connected");
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log("Message");
  });
   socket.on('disconnect', function(msg){
    console.log("User DisConnected");
  });

});

router.post('/authenticate', function(req, res) {
    fs.readFile("./public/Verification/Users.json", "utf8", function (err, data) {
        if (err) 
            console.log(err);
        else{
            var result = JSON.parse(data);
            for(var i=0;i<result.Users.length;i++){
                if(req.body.username == result.Users[i].username && req.body.password ==     result.Users[i].password){
                    console.log("Success!!!!!!!!!!!!!!");
                    res.location("home");
                    res.redirect("home");
                }
            }
        }
        });
});

module.exports = router;