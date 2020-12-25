import sprites from "./sprites.js";

export default class gameobject extends sprites{
    constructor(scene, x, y, type){

        super(scene, x, y, type);
		this.x = x;
        this.y = y;

	}
}