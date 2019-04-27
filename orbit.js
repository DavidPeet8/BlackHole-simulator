// orbit.js
import {BlackHole} from './blackhole.js';
import {Body} from './body.js';

const G = 0.1;

let dpi = window.devicePixelRatio;
let canvas = document.getElementById('orbit');
let context = canvas.getContext('2d');
let blackHoles = [];
let bodies = [];
let mouseDown = false, prevX, prevY;

function fixDPI() {
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    //scale the canvas
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}

function checkCollisions(){
    blackHoles.forEach((bh)=>{
        for(let i = 0; i < bodies.length; i++){
            if(bodies[i].x - bodies[i].r < bh.x + bh.r && bodies[i].x + bodies[i].r> bh.x - bh.r){
                if(bodies[i].y - bodies[i].r < bh.y + bh.r && bodies[i].y + bodies[i].r > bh.y - bh.r){
                    bodies.splice(i,i);
                }
            }
        }
    });
}

function updateGame(){
    fixDPI();
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    blackHoles.forEach((bh)=>bh.draw(context));
    bodies.forEach((b)=> b.update(context, blackHoles, G));
    checkCollisions();
    requestAnimationFrame(updateGame);
}

window.onload = ()=>{
    console.log('FUCK');
    blackHoles.push(new BlackHole(canvas.offsetWidth/2, canvas.offsetHeight/2, 50));
    document.addEventListener('mousedown', (event)=>{
        console.log(event.pageX + ' ' + event.pageY);
        if(event.target.tagName == 'CANVAS' && event.button == 0){
            mouseDown = true;
            prevX = event.pageX - canvas.offsetLeft;
            prevY = event.pageY - canvas.offsetTop;
            bodies.push(new Body(10, prevX, prevY));
        }
        if(event.target.tagName == 'CANVAS' && event.button == 1){
            blackHoles.push(new BlackHole(event.pageX - canvas.offsetLeft, 
                event.pageY - canvas.offsetTop, Math.floor(Math.random() * 25 + 26)));
        }
    });
    document.addEventListener('mouseup', (event)=>{
        if(event.target.tagName == 'CANVAS' && mouseDown == true){
            let x = event.pageX - canvas.offsetLeft;
            let y = event.pageY - canvas.offsetTop;
            bodies[bodies.length -1].dx = (prevX - x)/10;
            bodies[bodies.length -1].dy = (prevY - y)/10; 
        }
        if(event.button == 0){
            bodies[bodies.length -1].grav = true;
        }
        mouseDown = false;
    });
    document.getElementById('BHMass').addEventListener('change', (event)=>{
        BlackHole.mass = event.target.value;
    });
    updateGame();
};
