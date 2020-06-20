// orbit.js
import { BlackHole } from './blackhole.js';
import { Body } from './body.js';

const g = 9.8;
let G = g;

let dpi = window.devicePixelRatio;
let canvas = document.getElementById('orbit');
let context = canvas.getContext('2d');
let blackHoles = [];
let bodies = [];
let mouseDown = false, prevX, prevY;

function fixDPI() 
{
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    //scale the canvas
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}

function checkCollisions() 
{
    blackHoles.forEach((bh) => {
        for(let i = 0; i < bodies.length; i++){
            if(bodies[i].x - bodies[i].r < bh.x + bh.r && bodies[i].x + bodies[i].r > bh.x - bh.r){
                if(bodies[i].y - bodies[i].r < bh.y + bh.r && bodies[i].y + bodies[i].r > bh.y - bh.r){
                    bodies.splice(i,i);
                }
            }
        }
    });
}

function updateGame() 
{
    fixDPI();
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    blackHoles.forEach((bh) => { bh.draw(context) });
    bodies.forEach((b) => { b.update(context, blackHoles, G) });
    checkCollisions();
    requestAnimationFrame(updateGame);
}

window.onload = () => {
    // Create initial black hole
    blackHoles.push(new BlackHole(canvas.offsetWidth / 2, canvas.offsetHeight / 2, 50));

    // Register listeners for placing bodies and black holes
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Register listeners for parameter sliders
    document.getElementById('BHMass').addEventListener('change', (event) => {
        BlackHole.mass = event.target.value;
        document.getElementById('bhm').innerHTML = BlackHole.mass;
    });
    document.getElementById('GravConstant').addEventListener('change', (event) => {
        G = Math.floor(event.target.value * g);
        document.getElementById('gravVal').innerHTML = event.target.value;
    });

    // Trigger initial changes to display current values for sliders
    document.getElementById('BHMass').dispatchEvent(new Event('change'));
    document.getElementById('GravConstant').dispatchEvent(new Event('change'));

    // Start the game
    updateGame();
};

function handleMouseDown(event) 
{
    console.log(event.pageX + ' ' + event.pageY);
    if(event.target.tagName == 'CANVAS' && event.button == 0) 
    {
        mouseDown = true;
        prevX = event.pageX - canvas.offsetLeft;
        prevY = event.pageY - canvas.offsetTop;
        bodies.push(new Body(10, prevX, prevY));
    }

    if(event.target.tagName == 'CANVAS' && event.button == 1) 
    {
        blackHoles.push(new BlackHole(
            event.pageX - canvas.offsetLeft, 
            event.pageY - canvas.offsetTop, 
            Math.floor(Math.random() * 25 + 26)
        ));
    }
}

function handleMouseUp(event) 
{
    console.log(event);
    if(event.target.tagName == 'CANVAS' && mouseDown == true)
    {
        let x = event.pageX - canvas.offsetLeft;
        let y = event.pageY - canvas.offsetTop;
        bodies[bodies.length -1].dx = (prevX - x) / 10;
        bodies[bodies.length -1].dy = (prevY - y) / 10; 
    }

    if(event.button == 0 && bodies.length > 0) 
    {
        bodies[bodies.length -1].grav = true;
    }
    mouseDown = false;
}


    
