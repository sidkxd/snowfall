class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    add(vector){
        this.x += vector.x;
        this.y += vector.y;
    }
    static random(minX,maxX,minY,maxY){
        return new Vector(Vector.randomNumberBetween(minX,maxX),Vector.randomNumberBetween(minY,maxY));
    }
    static randomNumberBetween(min,max){
        return min + Math.random()*(max-min);
    }
}

class Snowflake{
    constructor(width,height){
        this.pos = Vector.random(0,width,0,height);
        this.vel = Vector.random(-0.3,0.3,0.3,1);
        this.acc = new Vector(0,0);
        this.radius = Vector.randomNumberBetween(1,4);
        this.alpha = Vector.randomNumberBetween(0.1,0.9);
        this.boundaryX=width;
        this.boundaryY=height;
    }

    update(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);

        //check for wraparound
        if (this.pos.x > this.boundaryX){
            this.pos.x=0;
        }
        else if(this.pos.y > this.boundaryY){
            this.pos.y=0;
        }
        else if(this.pos.x < 0){
            this.pos.x = this.boundaryX;
        }
    }
}


class Christmas {
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        var image = document.createElement('img');
        image.src = "static/images/tree.png";

        document.body.appendChild(this.canvas);
        this.canvas.appendChild(image);


        this.canvas.width = screen.width;
        this.canvas.height = screen.height;
        this.setup();
        requestAnimationFrame(() => this.update());
    }
    setup(){
        const noflakes = 500;
        this.snowflake = [];

        for(let i=0;i<noflakes;i++){
            this.snowflake.push(new Snowflake(this.canvas.width,this.canvas.height));
        }
        console.log(this.snowflake)
    }
    update(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        for (let flake of this.snowflake){
            flake.update();
            this.ctx.fillStyle = `rgba(255,255,255,${flake.alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(flake.pos.x , flake.pos.y,flake.radius,0,2* Math.PI);
            this.ctx.fill();
            var image = document.createElement('img');
        image.src = "static/images/tree.png";
            this.canvas.appendChild(image);
        }
        requestAnimationFrame(() => this.update());

    }
}

new Christmas();

//:#231f20;