import Persona from "./Persona.js"

export default class Player extends Persona{
    constructor(scene, x, y, type, cursorKeys, speed){
        super(scene, x, y, type, speed);

        this.cursorkeys = cursorKeys;

        this.scene.physics.add.existing(this); //
        this.body.allowGravity = false;
    }

    movementManager(){
        
        if(this.cursorkeys.right.isDown){
            this.moveRight();
        }
        else if(this.cursorkeys.left.isDown){
            this.moveLeft();
        }
        
        if(this.cursorkeys.up.isDown){
            this.moveUp();
        }
        else if(this.cursorkeys.down.isDown){
            this.moveDown();
        }
    }

    // moveLeft(){
    //     this.x -= this.speed;
    // }

    // moveRight(){
    //     this.x+= this.speed;
    // }

    // moveUp(){
    //     this.y-= this.speed;
    // }

    // moveDown(){
    //     this.y+= this.speed;
    // }
}