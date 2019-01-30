//socket.ioの保存
var socket = io();

//受け取り用の配列
var receiveArr = [];

//サーバーからデータを受信
socket.on('serverToPc', function(data) {
    receiveArr = data;
    console.log(receiveArr);
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

    for (var i = 0; i < receiveArr.length; i++) {
        //ベクター
        var pos = createVector();
        //送られてくるデータの値が動いていたら
        if (receiveArr[i].x > 1 && receiveArr[i].y > 1) {
            pos.x = map(receiveArr[i].x, 0, receiveArr[i].width, 0, windowWidth);
            pos.y = map(receiveArr[i].y, 0, receiveArr[i].height, 0, windowHeight);
            // ボールが表示
            fill(receiveArr[i].hue, 100, 100, 50);
            ellipse(pos.x, pos.y, 50, 50);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
