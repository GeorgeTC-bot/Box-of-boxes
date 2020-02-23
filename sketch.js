const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
 
var boxes = [];
var gSlide;
 
 
function setup() {
    createCanvas(800, 430);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);

    gSlider = createSlider(0, 100, 50);
    gSlider.position(300, 400);
    gSlider.input = map(engine.world.gravity, gSlider.min, gSlider.max, 0, 1);

    ground = new Ground(400,430,800,60);
}
 
function mousePressed() {
    if (mouseY < 350) {
        boxes.push(new Box(mouseX,mouseY,random(10,50),random(10,50)));
    }
}
 
function draw() {
    background("black");
    var fVal = gSlider.value();
    for(var i = 0; i < boxes.length; i = i + 1){
        boxes[i].show();
    }
    
    fill("white");
    text("Gravity:"+fVal,340,400);
    ground.display();
}

function Box(x,y,width,height,options){
    var options = {
        'restitution':0.5,
        'friction':1.0
    }
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        stroke("white");
        fill("grey");
        rect(0, 0, this.width, this.height);
        pop();
    }
}