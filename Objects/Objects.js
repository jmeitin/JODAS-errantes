import gameObject from "../gameObject.js";

export default class Objects extends gameObject{

    constructor(scene, x, y, type){

        super(scene, x, y, type);
		this.x = x;
        this.y = y;

	}


}