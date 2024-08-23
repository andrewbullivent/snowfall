class Flake{


    

    constructor(ctx, width, height){
        this.melt = 250;

        this.boundsWidth = width;
        this.boundsHeight = height;
        this.resetFlake();
        this.py = Math.random()*this.boundsHeight;
        this.startpoint = -32;
        this.wrapstart = -32;
        this.meltAfter = this.melt;

        
        this.ctx = ctx;
    }

    resetFlake(){
        this.spriteX = Math.round(Math.random()*16);
        this.spriteY =  Math.round(Math.random()*16);
        this.px = Math.random()*this.boundsWidth;
        this.py = this.startpoint;
        this.pz = Math.random();
    
        this.vx = Math.random() ;
        this.vy = Math.random()*1.2;
    
        this.ax = 0; // -0.05 - +0.5
        this.ay =  0.01 * this.pz;
        this.rotate = Math.random();
        this.terminal = 2 + Math.random();
        var num = Math.random()*0.005 + 0.0001; // this will get a number between 1 and 99;
        num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
        this.rotateRate = num;
        this.meltAfter = this.melt;

    }

    move(){
        if(this.px > this.boundsWidth){
            this.px = this.wrapstart;
        }
        if ((this.py>this.boundsHeight)||((this.px <this.wrapstart )||(this.py<this.startpoint))){
            this.meltAfter--;
            this.rotateRate =  0;
            if(this.meltAfter < 1)
                this.resetFlake();
        }
        else{
            this.vx += this.ax;
            this.vy += this.vy >= this.terminal? 0: this.ay;
            this.px += this.vx;
            this.py += this.vy;
        }


    }

    // render(){
    //     this.ctx.beginPath();
    //     this.ctx.fillStyle = "white";
    //     this.ctx.arc(this.px,this.py,5*this.pz,0,2*Math.PI);
    //     this.ctx.fill();
    // }

}