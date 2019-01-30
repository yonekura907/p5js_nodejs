//socket.ioの保存
var socket = io();

// var pos;
//受け取り用のオブジェクト
var myData = {};

socket.on('sendSocketId', function(data) {
    myData.id = data.id;
    myData.hue = data.hue;
    myData.x = windowWidth / 2;
    myData.y = windowHeight / 2;
    console.log(myData);
});


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
    noStroke();
    fill(0, 100, 0, 10);
    rect(0, 0, windowWidth, windowHeight);
    fill(myData.hue, 100, 100, 50);
    ellipse(myData.x, myData.y, 50, 50);
}

function mouseDragged() {
    myData.x = mouseX;
    myData.y = mouseY;

    //serverに送るデータ
    var sendData = {
        id: myData.id,
        hue: myData.hue,
        x: myData.x,
        y: myData.y,
        width: windowWidth,
        height: windowHeight
    }
    //serverにデータを送信
    socket.emit('spToServer', sendData);
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
