var correctur_x = 1, correctur_y = 1;

function renderRandomApple(canvas){
    let x = Math.random() * 4800;
    let y = Math.random() * 4800;
    x = x - (x % 200);
    y = y - (y % 200);

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#800303";
    ctx.fillRect(x,y,200 * correctur_x,200 * correctur_y);

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

function run() {
    console.log("Starting now Game");
    var canvas = null;
    while(canvas == null){
        canvas = document.getElementById("game");
        console.log("Wating until canvas is loadet")
    }
    resize();
    console.log(correctur_x,correctur_y);
    renderRandomApple(canvas);
}

run();

