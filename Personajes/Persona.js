import Sprites from "../sprites.js"

export default class Person extends Sprites{

    constructor(scene, x, y, type){

        super(scene, x, y, type);
		this.x = x;
		this.y = y;

	}
    
    moveLeft(){
        this.x--;
    }

    moveRight(){
        this.x++;
    }

    moveUp(){
        this.y--;
    }

    moveDown(){
        this.y++;
    }
}

