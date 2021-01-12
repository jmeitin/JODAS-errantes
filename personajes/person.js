import gameobject from "../clases/gameobject.js";

export default class person extends gameobject{

    constructor(scene, x, y, type, speed){

        super(scene, x, y, type);
		this.x = x;
        this.y = y;
        this.speed = speed;

        // las mayus aqui son necesarias que es cosa de phaser
        this.body.maxVelocity.x = speed;
        this.body.maxVelocity.y = speed;
	}

    //function
    move_left(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.velocity.x -= this.speed;
    }

    move_right(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.velocity.x += this.speed;
    }

    move_up(){
       // console.log("Up");
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.velocity.y -= this.speed;
    }

    move_down(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.velocity.y += this.speed;
    }

    stop(){this.body.velocity.x = 0; this.body.velocity.y = 0;}

    get_x(){
        return this.x;
    }

    get_y(){
        return this.y;
    }

    multiply_velocity (percentage){
        this.speed = this.speed + this.speed*percentage/100;
    }
    multiply_speed(multiplier){
        this.set_speed(this.speed * multiplier);
    }
    
    set_speed (speed){
        this.speed = speed;
    }
}



