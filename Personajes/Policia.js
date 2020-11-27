import Persona from "./Persona.js"

export default class Policia extends Persona{
    constructor(scene, x, y, type, speed){
        super(scene, x, y, type, speed);
        
        this.rangoVisual = 10;
    }

    

    update(){
        const dif = calcularDif();
        
        if (dif<= rangoVisual) {
            this.moveLeft();
        }

        else {
            this.moveRight();

        }

       
    }

    calcularDif (){
        return 0;
    }




}