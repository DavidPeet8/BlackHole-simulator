// blackhole.js

class BlackHole{
    static mass = document.getElementById('BHMass').value;
    constructor(x, y, r){
        this.x = x; 
        this.y = y;
        this.r = r;
    }

    print(){
        console.log("x: %d, y: %d, r: %d, mass: %d", this.x, this.y, this.r, BlackHole.mass);
    }

    draw(context){
        context.fillStyle = "#000000";
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fill();
    }
}

export{BlackHole};