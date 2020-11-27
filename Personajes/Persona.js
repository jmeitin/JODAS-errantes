import Game from "../game.js";
import Sprites from "../sprites.js";

export default class Person extends Sprites{

    constructor(scene, x, y, type, cursorKeys){

        super(scene, x, y, type);
		this.x = x;
		this.y = y;
        this.cursorkeys = cursorKeys;

	}
    
    movementManager(){//podrias decirle moveLeft, moveDown... probablemente seria mas correcto y todo...me la suda...borrar esto antes de que lo lea un profesor
        if(this.cursorkeys.left.isDown){
            this.x-=10;
        }
        else if(this.cursorkeys.right.isDown){
            this.x+=10;
        }
        else if(this.cursorkeys.up.isDown){
            this.y-=10;
        }
        else if(this.cursorkeys.down.isDown){
            this.y+=10;
        }
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

