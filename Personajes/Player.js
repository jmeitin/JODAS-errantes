import Game from "../game.js";
import Persona from "./Persona.js"

export default class Player extends Persona{
    constructor(scene, x, y, type, cursorKeys, speed){
        super(scene, x, y, type, speed);

        this.cursorkeys = cursorKeys;  
        this.botonpausa = this.scene.input.keyboard.addKey('P');
        this.pausabool = false;
        this.scene.physics.add.existing(this); //
        //this.body.allowGravity = true;
    }
    pausa(){
        if(this.botonpausa.isDown && this.pausabool === false) {
            this.pausabool = true;
            return true;
        }
        else {
            this.pausabool = false;
            return false;
        }
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


}