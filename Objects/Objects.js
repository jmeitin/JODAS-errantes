import gameObject from "../gameObject.js";

export default class Object extends gameObject{

    constructor(scene, x, y, peso, type, speed){

        super(scene, x, y, type);
		this.x = x;
        this.y = y;
        this.peso=peso;
        this.speed = speed;

	}