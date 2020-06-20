import { BlackHole } from "./blackhole.js";

// body.js
// in the future probably should have used inheritance here Body extends Black Hole

class Body
{
    static mass = 2;
    constructor(r, x, y) 
    {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = 0;
        this.dy = 0;
        this.grav = false; // Why is this even here?
    }

    update(context, blackHoles, G) 
    {
        blackHoles.forEach((bh) => {
            // 0,0 in upper left scale accordingly
            if(this.grav == true)
            {
                let distx = bh.x - this.x;
                let disty = bh.y - this.y;
                let dist = Math.sqrt(Math.pow(distx, 2) + Math.pow(disty, 2));
                let force = G * BlackHole.mass / Math.pow(dist, 2);  
                this.dx += force * (distx / dist);
                this.dy += force * (disty / dist);
            }
        });

        this.x += this.dx;
        this.y += this.dy;
        this.draw(context);
    }

    draw(context) 
    {
        context.fillStyle = "#ffde5b";
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fill();
    }
}

export { Body };