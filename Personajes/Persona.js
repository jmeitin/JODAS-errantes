import Game from "../game.js";
import Sprites from "../sprites.js";

export default class Person extends Sprites{

    constructor(scene, x, y, type, speed){

        super(scene, x, y, type);
		this.x = x;
        this.y = y;
        this.speed = speed;

	}

    moveLeft(){
        this.x -= this.speed;
    }

    moveRight(){
        this.x+= this.speed;
    }

    moveUp(){
        this.y-= this.speed;
    }

    moveDown(){
        this.y+= this.speed;
    }
}

