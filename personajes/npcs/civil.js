import person from "../person.js"

export default class civil extends person{
    constructor(scene, x, y, type, speed){
        super(scene, x, y, type, speed);       
    }

    preUpdate(){
        this.move_up();
    }

    update(){
        
    }
}