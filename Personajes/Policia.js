import Persona from "./Persona.js"

export default class Policia extends Persona{
    constructor(scene, x, y, type, speed){
        super(scene, x, y, type, speed);       
    }

    update(){
        this.moveRight();
    }
}