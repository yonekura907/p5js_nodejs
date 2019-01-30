// express
const express = require('express');
const app = express();
// http server
const http = require('http').Server(app);
//socket.io
const io = require('socket.io')(http);


// 静的ファイルはpublicフォルダに入れる
app.use(express.static('public'));

// '/'でアクセスするとviewsフォルダのindex.htmlが開く
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});
app.get('/rc', function(request, response) {
    response.sendFile(__dirname + '/views/receive.html');
});


//複数のデータを受け取る配列
var ballsArr = [];

//socket通信開始
io.on('connection', function(socket) {
    console.log('通信中' + socket.id);

    //最初に送るidと色相
    var clientData = {
        id: socket.id,
        hue: Math.floor(Math.random() * 360),
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }

    ballsArr.push(clientData);

    //送信
    socket.emit('sendSocketId', clientData);
    console.log(ballsArr);

    //SPから送られてきたデータ
    socket.on('spToServer', function(data) {

        //for文で配列の中を回している
        for (var i = 0; i < ballsArr.length; i++) {
            //socke.idの照合
            if (ballsArr[i].id == data.id) {
                ballsArr[i].x = data.x;
                ballsArr[i].y = data.y;
                ballsArr[i].width = data.width;
                ballsArr[i].height = data.height;
            }
        }
        console.log(ballsArr);

        //pc.htmlに配列（複数人分）のデータを送信
        socket.broadcast.emit('serverToPc', ballsArr);
    });


    socket.on('disconnect', function() {
        console.log('通信解除');
        for (var i = 0; i < ballsArr.length; i++) {
            //socke.idの照合
            if (ballsArr[i].id == socket.id) {
                // このsocket.idが解除されたらballsArrから削除する
                ballsArr.splice(i, 1);
            }
        }
        console.log('配列削除' + ballsArr);
    });
});



http.listen(3000, function() {
    console.log('listening on 3000');
});
