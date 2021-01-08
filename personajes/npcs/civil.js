import person from "../person.js"

export default class civil extends person{
    constructor(scene, x, y, type, speed){
        super(scene, x, y, type, speed);       
		this.scene.physics.add.existing(this); //le dota de fisicas
        this.body.allowGravity = false;      
    }

    preUpdate(){
        this.move_up();
    }

    update(){
        
    }

    setSpeed(sp){
        this.speed = sp;
    }
}