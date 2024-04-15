const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");

let circle_x = 160;
let circle_y = 60;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;
let ground_x = 100;
let ground_y = 500;
let ground_height = 5;
let brickArray = [];
let count = 0;

// 用min, max的方式寫隨機
function getRandomArbitrary(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

class Brick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        brickArray.push(this);
        this.visible = true;
    }

    drawBrick() {
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    tochingBall(ballX, ballY) {
        // 直接透過判定條件並回傳true or false
        return (
            ballX >= this.x - radius &&
            ballX <= this.x + this.width + radius &&
            ballY >= this.y - radius &&
            ballY <= this.y + this.height + radius
        );
    }
}

// 製作所有的brick
for (let i = 0; i < 10; i++) {
    new Brick(getRandomArbitrary(0, 950), getRandomArbitrary(0, 550));
}

c.addEventListener("mousemove", e => {
    ground_x = e.clientX;
});

function drawCircle() {
    // 確認球是否有打到磚塊
    brickArray.forEach(brick => {
        if (brick.visible && brick.tochingBall(circle_x, circle_y)) {
            count++;
            console.log(count);
            brick.visible = false;
            // 改變x, y方向速度，並且將brick從brickArray中移除
            if (circle_y >= brick.y + brick.height || circle_y <= brick.y) {
                ySpeed *= -1;
            }
            if (circle_x <= brick.x || circle_x >= brick.x + brick.width) {
                xSpeed *= -1;
            }

            // brickArray.splice(index, 1);
            // if (brickArray.length == 0) {
            //     alert("遊戲結束");
            //     clearInterval(game);
            // }
            if (count == 10) {
                alert("遊戲結束");
                clearInterval(game);
            }
        }
    });

    // 確認球是否碰到橘色地板
    if (
        circle_x >= ground_x - radius &&
        circle_x <= ground_x + 200 + radius &&
        circle_y >= ground_y - radius &&
        circle_y <= ground_y + radius
    ) {
        // 解決卡在橘色地板的問題：因為進到上面的判斷範圍時，會不斷讓ySpeed轉向，造成不斷在橘色地板震盪的bug
        if (ySpeed > 0) {
            // ySpeed>0就是球在往下掉，讓球體向上位移以脫離判定範圍
            circle_y -= 50;
        } else {
            // 反之，球在往上彈時讓球體向下位移
            circle_y += 50;
        }
        ySpeed *= -1;
    }
    if (circle_x >= canvasWidth - radius || circle_x <= radius) {
        // 確認球是否碰到邊界
        xSpeed *= -1;
    }
    if (circle_y >= canvasHeight - radius || circle_y <= radius) {
        ySpeed *= -1;
    }

    // 更動圓的座標
    circle_x += xSpeed;
    circle_y += ySpeed;

    // 畫出黑背景
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 畫出所有的brick
    brickArray.forEach(brick => {
        if (brick.visible) {
            brick.drawBrick();
        }
    });

    // 畫出可控制的地板
    ctx.fillStyle = "orange";
    ctx.fillRect(ground_x, ground_y, 200, ground_height);

    // 畫出圓球
    ctx.beginPath();
    ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "yellow";
    ctx.fill();
}

let game = setInterval(drawCircle, 25);
