var correctur_x = 1, correctur_y = 1;
var snake = [];
var snakeHeader;

function renderRandomApple(canvas){
    let x = Math.random() * 4800;
    let y = Math.random() * 4800;
    x = x - (x % 200);
    y = y - (y % 200);

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#800303";
    ctx.fillRect(x*correctur_x,y*correctur_y,200 * correctur_x,200 * correctur_y);

    return ctx;
}


function resize(){
    let tmp_y = window.innerWidth * 0.9;
    let tmp_x = (window.innerHeight - 160) * 0.8;

    if(tmp_x > tmp_y){
        correctur_y = tmp_y / tmp_x;
    } else{
        correctur_x = tmp_x / tmp_y;
    }
}

function drawShape(x,y, canvas, color){
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(x*correctur_x,y*correctur_y,200 * correctur_x,200 * correctur_y);
    return [x,y];
}

function moveSnake(newX, newY, canvas){
    
    let elementToRemove = snake.at(0);
    snake.shift(); 
    drawShape(elementToRemove[0], elementToRemove[1], canvas, "#636363");
    snake.push(drawShape(snakeHeader[0], snakeHeader[1], canvas, "#00a329"))
    snakeHeader = drawShape(newX, newY, canvas, "#ffffff");
}

function initSnake(canvas){
    snake.push(drawShape(0,0,canvas, "#00a329"))

    snake.push(drawShape(200,0,canvas, "#00a329"))

    snakeHeader = drawShape(400,0,canvas, "#ffffff")
}

function run() {
    console.log("Starting now Game");
    var canvas = null;
    while(canvas == null){
        canvas = document.getElementById("game");
        console.log("Wating until canvas is loadet")
    }
    resize();
    console.log(correctur_x,correctur_y);
    initSnake(canvas);
    moveSnake(600,0,canvas);
    moveSnake(800,0,canvas);

    //renderRandomApple(canvas);
}

run();

