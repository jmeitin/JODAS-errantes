import Game from "../game.js";
import Sprites from "../sprites.js";

export default class Person extends Sprites{

    constructor(scene, x, y, type, speed){

        super(scene, x, y, type);
		this.x = x;
        this.y = y;
        this.speed = speed;
        //this.cursorkeys = cursorKeys;

      //hola

	}
    
    // movementManager(){
        
    //     if(this.cursorkeys.right.isDown){
    //         this.moveRight();
    //     }
    //     else if(this.cursorkeys.left.isDown){
    //         this.moveLeft();
    //     }
        
    //     if(this.cursorkeys.up.isDown){
    //         this.moveUp();
    //     }
    //     else if(this.cursorkeys.down.isDown){
    //         this.moveDown();
    //     }
    // }

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

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}

