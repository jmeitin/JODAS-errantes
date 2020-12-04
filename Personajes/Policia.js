import Persona from "./Persona.js"

export default class Policia extends Persona{
    constructor(scene, x, y, type, speed){
        super(scene, x, y, type, speed);
        
        this.rangoVisual = 10;
        this.dif = 10;

        this.scene.physics.add.existing(this); //le dota de fisicas
        this.body.allowGravity = false;
    }

    calcularDif (){
        this.dif = 0;
    }
    

    update(){
        this.calcularDif();
        
        if (this.dif<= this.rangoVisual) {
            this.moveLeft();
            console.log(this.dif);
        }

        else {
            this.moveRight();

        }

       
    }   




}