import Sprites from "./sprites.js";

export default class gameObject extends Sprites{
    constructor(scene, x, y, type){

        super(scene, x, y, type);
		this.x = x;
        this.y = y;

	}
}