import Persona from "./Persona.js"

export default class Civil extends Persona{
    constructor(scene, x, y, type, speed){
        super(scene, x, y, type, speed);       
    }

    update(){
        this.moveUp();
    }
}