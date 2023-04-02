var correctur_x = 1, correctur_y = 1, snake = [], snakeHeader,apple,lastKey,snakeMove = [0, 0],intervalId;

function renderRandomApple(canvas) {
    let x = Math.random() * 4800;
    let y = Math.random() * 4800;
    return drawShape(x - (x % 200), y - (y % 200), canvas, "#800303");
}


function resize() {
    let tmp_y = window.innerWidth * 0.9;
    let tmp_x = (window.innerHeight - 160) * 0.8;

    if (tmp_x > tmp_y) {
        correctur_y = tmp_y / tmp_x;
    } else {
        correctur_x = tmp_x / tmp_y;
    }
}

function drawShape(x, y, canvas, color) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(x * correctur_x, y * correctur_y, 200 * correctur_x, 200 * correctur_y);
    return [x, y];
}

function moveSnake(newX, newY, canvas) {

    let elementToRemove = snake.at(0);
    snake.shift();
    drawShape(elementToRemove[0], elementToRemove[1], canvas, "#636363");
    snake.push(drawShape(snakeHeader[0], snakeHeader[1], canvas, "#00a329"))
    snakeHeader = drawShape(newX, newY, canvas, "#ffffff");
}

function initSnake(canvas) {
    snake.push(drawShape(0, 0, canvas, "#00a329"))

    snake.push(drawShape(200, 0, canvas, "#00a329"))

    snakeHeader = drawShape(400, 0, canvas, "#ffffff")

    snakeMove = [200, 0];
    apple = renderRandomApple(canvas);
}


function afterChecks(canvas) {
    if (snakeHeader[0] === apple[0] && snakeHeader[1] == apple[1]) {
        snake.unshift([-300,-300]);
        apple = renderRandomApple(canvas);
    }
    else if (snakeHeader[0] * correctur_x >= 5000 || snakeHeader[0] < 0 || snakeHeader[1] * correctur_y >= 5000 || snakeHeader[1] < 0) {
        window.clearInterval(intervalId);
    }
}

function run() {
    var canvas = null;
    while (canvas == null) {
        canvas = document.getElementById("game");
    }
    resize();
    initSnake(canvas);
    //renderRandomApple(canvas);
    intervalId = window.setInterval(function () {
        if (lastKey === "ArrowRight" && snakeMove[0] !== -200) {
            snakeMove = [200, 0];
        }

        if (lastKey === "ArrowLeft" && snakeMove[0] !== 200) {
            snakeMove = [-200, 0];
        }

        if (lastKey === "ArrowUp" && snakeMove[1] !== 200) {
            snakeMove = [0, -200];
        }

        if (lastKey === "ArrowDown" && snakeMove[1] !== -200) {
            snakeMove = [0, 200];
        }
        moveSnake(snakeHeader[0] + snakeMove[0], snakeHeader[1] + snakeMove[1], canvas);
        lastKey = undefined;
        afterChecks(canvas);
    }, 100)
}

run();

window.addEventListener('keydown', function (event) {
    if (event.key.startsWith("Arrow")) {
        lastKey = event.key;
    }
});