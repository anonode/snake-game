
class Snake {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{ x: this.x, y: this.y }]
        this.rotateX = 0
        this.rotateY = 1
    }

    move() {
        var newRect;
        if (this.rotateX == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateX == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateY == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        } else if (this.rotateY == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }


        this.tail.shift();
        this.tail.push(newRect)
    }
}

class Apple {
    constructor() {
        console.log("apple:")
        console.log(snake.size)
        let isTouching;
        while (true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            for (var i = 0; i < snake.tail.length; i++) {
                if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true
                }
            }
            console.log(this.x , this.y)
            this.size = snake.size
            this.color = "red"
            if (!isTouching) {
                break;
            }
            
        }
    }
}


let canvas = document.getElementById("canvas");
let snake = new Snake(20, 20, 20);
let apple = new Apple(40,40,40);              //creates object that can be called: apple._insert method_
let canvasContext = canvas.getContext('2d');

window.onload = () => {
    gameLoop();
}

function gameLoop() {
    setInterval(show, 1000/20) // (function, milliseconds) repeats the function every n number of milliseconds, remember that 1000millisec = 1 second
}

function show() {
    update()
    draw()
}

function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    console.log("update")
    snake.move()
    eatApple()
    checkHitWall()
}
function checkHitWall(){
    var headTail = snake.tail[snake.tail.length-1]
    if(headTail.x == - snake.size){
        headTail.x = canvas.width - snake.size
    } else if(headTail.x == canvas.width){
        headTail.x = 0
    } else if(headTail.y == - snake.size){
        headTail.y = canvas.height - snake.size
    } else if(headTail.y == canvas.height){
        headTail.y = 0
    }
}

function checkHitSelf(){
    var head = snake.tail[0];
    for (var i = 0; i < snake.tail.length; i++) {
        if (head.x == snake.tail[i].x && head.y == snake.talk[i].y) {
            exit("Good game! Your score was: " && (snake.tail.length - 1));
        }
    }
}

function eatApple() {
    if (snake.tail[snake.tail.length - 1].x == apple.x && snake.tail[snake.tail.length - 1].y == apple.y) {
        snake.tail[snake.tail.length] = { x: apple.x, y: apple.y }
        apple = new Apple();
    }
}

function draw() {
    createRect(0, 0, canvas.width, canvas.height, "black") //controls the color of the window pane where the game is actually played
    createRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < snake.tail.length; i++) {
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size - 5, 'green')
    }
    canvasContext.font = "22px Arial";  //dictates the font and style of all typed characters(letters, numbers, symbols, etc...)
    canvasContext.fillStyle = "#00FF42";
    canvasContext.fillText("Score: "+ (snake.tail.length - 1), (canvas.width/2.14), 20);//tacks on one unit of length to the snake's tail ONLY after eating an apple, which really means (x,y)@snake's head ==(x,y) of the apple
    createRect(apple.x, apple.y, 20, 20, apple.color);
}

function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}

window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if (event.keyCode == 37 && snake.rotateX != 1) {
            snake.rotateX = -1
            snake.rotateY = 0;
        } else if (event.keyCode == 38 && snake.rotateY != 1) {
            snake.rotateX = 0
            snake.rotateY = -1;
        } else if (event.keyCode == 39 && snake.rotateX != -1) {
            snake.rotateX = 1
            snake.rotateY = 0;
        } else if (event.keyCode == 40 && snake.rotateY != -1) {
            snake.rotateX = 0
            snake.rotateY = 1;
        }
    })
})