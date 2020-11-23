// import Vector2D from '../Vector2D/vector2D.js'
// import Sprites from "../sprites.js";

import Sprites from "../sprites.js"

export default class Person extends Sprites{

    // constructor(x, y){
    //     this.posicionX = x;    
    //     this.posicionY = y;  
    // }   

    // update(){
    //     ellipse(this.posicionX, this.posicionY, 100, 100);
    //     this.posicionX++;
    // }

    // devuelvePos(){return this.posicionX + " " + this.posicionY};

    // escribePos(){console.log(this.posicionX + " " + this.posicionY)};

    constructor(scene, x, y, type){

        super(scene, x, y, type);
		this.x = x
		this.y = y

	}
	
	draw(){
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
    }
    
    moveLeft(){
        this.x--;
    }

    moveRight(){
        this.x+= 20;
    }
}



// export default class Player extends Sprites{
// 	constructor(scene, x, y, type){
// 		super(scene, x, y, type);
// 		this.setScale(0.5);
// 		this.body.collideWorldBounds = true;
// 	}
// }
