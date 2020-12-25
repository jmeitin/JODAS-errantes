import person from "../person.js"

export default class civil extends person{
    constructor(scene, x, y, type, speed){
        super(scene, x, y, type, speed);       
    }

    update(){
        this.moveUp();
    }
}