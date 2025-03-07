var Sound;
// tutorial from p5.js, https://p5js.org/tutorials/data-structure-garden/
// added clear button
let flowers = []; 
let bgColor;
let TextInput;

function setup(){
  createCanvas(windowWidth, windowHeight);
  flowerPower(); 

  // Sound from https://www.youtube.com/watch?v=j4S8PwduBc0
  Sound = createAudio('Delete button.mp3');

  let clearButton = createButton('Clear');
  clearButton.position(10, 1150); 
  clearButton.mousePressed(clearFlowers);

  bgColor = createColorPicker('AliceBlue');
  bgColor.position(70, 1149);

  TextInput=  createInput('')
  TextInput.position(9,1060);

  windowresize();
}

function draw(){
  background(bgColor.value());
  updateAndDrawFlowers();

  let msg = TextInput.value();
  text(msg, 25, 25);
}

  
function mousePressed(){  
  let msg = TextInput.value();
  if (msg !== "") { // Text must be entered to create flowers
  
  let flower = createFlower();
  flower.x = mouseX; 
  flower.y = mouseY;
  flowers.push(flower);
  }
}

function updateAndDrawFlowers(){
  for (let flower of flowers) {
    drawFlower(flower);
    flower.size *= 1;
    flower.lifespan -= 0;

    if (flower.lifespan <= 0) {
      let i = flowers.indexOf(flower);
      flowers.splice(i, 1);
    }
  }
}

function flowerPower(){
  for(let i = 0; i < 20; i+=1){
    let flower1 = createFlower();
    flowers.push(flower1);
  }
}

function createFlower(){
  let flower = {
    x: random(200,1000),
    y: random(100,500),
    size: random(20, 75),
    lifespan: random(255,300),
    color: color(random(255), random(255), random(255))
  };
  return flower;
}

function drawFlower(flower){
  noStroke();
  fill(flower.color);
  
  ellipse(flower.x, flower.y, flower.size / 2, flower.size);
  ellipse(flower.x, flower.y, flower.size, flower.size / 2);

  fill(255, 204, 0);
  circle(flower.x, flower.y, flower.size / 2);
  
}

function clearFlowers(){
  flowers = [];
  if(mouseIsPressed){
    Sound.play();
  }
}

function windowresize(){
  resizeCanvas(windowWidth,windowHeight);
}

const video = document.getElementById("fullscreen-video");

function enterFullscreen(){
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen){ 
    video.webkitRequestFullscreen();
     }
}

function exitFullscreen(){
  if (document.exitFullscreen){
    document.exitFullscreen();
  }
}

video.addEventListener("click", () => {
  if (!document.fullscreenElement){
    enterFullscreen();
  } else {
    exitFullscreen();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.fullscreenElement){
    exitFullscreen();
  }
});


