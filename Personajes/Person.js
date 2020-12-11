import gameObject from "../Clases/gameObject.js";

export default class Person extends gameObject{

    constructor(scene, x, y, type, speed){

        super(scene, x, y, type);
		this.x = x;
        this.y = y;
        this.speed = speed;

      //hola

	}

    //function
    moveLeft(){
        this.x -= this.speed;
    }

    moveRight(){
        this.x+= this.speed;
    }

    moveUp(){
        this.y-= this.speed;
    }

    moveDown(){
        this.y+= this.speed;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}



