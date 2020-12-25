import gameobject from "../Clases/gameobject.js";

export default class person extends gameobject{

    constructor(scene, x, y, type, speed){

        super(scene, x, y, type);
		this.x = x;
        this.y = y;
        this.speed = speed;

      //hola

	}

    //function
    move_left(){
        this.x -= this.speed;
    }

    move_right(){
        this.x+= this.speed;
    }

    move_up(){
        this.y-= this.speed;
    }

    move_down(){
        this.y+= this.speed;
    }

    get_x(){
        return this.x;
    }

    get_y(){
        return this.y;
    }

    multiply_velocity (percentage){
        this.speed = this.speed + this.speed*percentage/100;
    }
    set_speed (speed){
        this.speed = speed;
    }
}



