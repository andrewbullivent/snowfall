var flakes = [];
var noFlakes = 2000;
var width = window.innerWidth;
var height = window.innerHeight -20;
var world = this;
world.sprites = [];

// get display canvas
var canvas = document.getElementById("myCanvas");
canvas.width = width;
canvas.height = height;

var ctx = canvas.getContext('2d');

document.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
      toggleFullScreen();
    }
  }, false);

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
        .then(function(){
            navigator.wakeLock.request("screen").then(
                function () {
                    width = window.innerWidth;
                    height = window.innerHeight -20;
                    canvas.width = width;
                    canvas.height = height;
                    ctx = canvas.getContext('2d');
                    flakes = [];
                    for(var idx = 0;idx<noFlakes;idx++){
                        flakes.push(new Flake(ctx,width,height));
                    }
                
                    // set off recursive animation function
                    requestAnimationFrame(step);
                });
            
        });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        navigator.wakeLock.release("screen");
      }
    }
  }


// function to retrieve an image
function loadImage(url) {
    return new Promise((fulfill, reject) => {
        let imageObj = new Image();
        imageObj.onload = () => fulfill(imageObj);
        imageObj.src = url;
    });
}

function drawLogo(){
    ctx.drawImage(world.logo,(width/2 - 256),(height/2)-64,512,128);
}


function step(){
    ctx.fillStyle = "black";
    ctx.rect(0,0,width,height);
    ctx.fill();
    //drawLogo();

    for(var idx = 0;idx<noFlakes;idx++){
        flakes[idx].move();
        drawFlake(ctx,flakes[idx]);
    }
    requestAnimationFrame(step);

};

function drawFlake(ctx,flake){
    if(flake.pz < 0.7){
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(flake.px,flake.py,5*flake.pz,0,2*Math.PI);
        ctx.fill();
    }
    else{
        ctx.save();
        ctx.translate(flake.px,flake.py);
        ctx.rotate(flake.rotate*Math.PI);
        
        ctx.drawImage(world.spritesheet,
            flake.spriteX * 32, flake.spriteY * 32, 32, 32,
            -16, -16, 32*flake.pz, 32*flake.pz);
        
        ctx.restore();
        flake.rotate += flake.rotateRate;
    }
        
}

Promise.all([
    loadImage("./snowsprites.png"),
    loadImage("./logo.svg")
])
.then(function(images){
    world.spritesheet = images[0];
   // world.logo = images[1];

    //drawLogo();

    // Init flakes
    for(var idx = 0;idx<noFlakes;idx++){
        flakes.push(new Flake(ctx,width,height));
    }

    // set off recursive animation function
    requestAnimationFrame(step);
})










