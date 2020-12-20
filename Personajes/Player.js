//import Game from "../Game.js";
import Persona from "./Person.js"

export default class Player extends Persona{
    constructor(scene, x, y, type, cursorKeys, speed, inventario){
        super(scene, x, y, type, speed);

        this.cursorkeys = cursorKeys;  
        this.botonpausa = this.scene.input.keyboard.addKey('P');
        this.pausabool = false;
        this.scene.physics.add.existing(this); //

        this.pistola = false; 
        this.bombaPlus = false;
        this.bombaMinus = false;
        

        this.inventario = inventario;  console.log (this.inventario);        
       
        //OBJETOS
        if (this.inventario.includes('zapatos')) this.multiplyVelocity (10); //QUE LA MULTIPLIQUE POR ESTE PORCENTAJE
        if (this.inventario.includes('pistola')) this.pistola = true; //lleva pistola
        if (this.inventario.includes('bombaPlus')) this.bombaPlus = true;
        if (this.inventario.includes('bombaMinus')) this.bombaMinus = true;
        
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

    hasGun(){ //LLEVA PISTOLA?
        return this.pistola;
    }

    esUnIndividuoSospechoso(){
        this.maleante = false;
        if (this.bombaPlus && !this.bombaMinus || this.bombaPlus && this.pistola) this.maleante = true; // solo sombrero
        //capa ----------------------------------------------------------------------------------------------------
        return this.maleante;
    }


}