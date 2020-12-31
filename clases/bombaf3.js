import gameObject from "./gameobject.js";

export default class bombaf3 extends gameObject {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        this.x = x;
        this.y = y;
        this.scene.physics.add.existing(this); //le dota de fisicas
        this.body.allowGravity = false;
    }

    Fix(){
        this.x = this.scene.input.mousePointer.x + 50;
        this.y = this.scene.input.mousePointer.y + 50;
        
    }
}