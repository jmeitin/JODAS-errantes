import Game from "../game.js";
import Sprites from "../sprites.js";

export default class Object extends Sprites{

    constructor(scene, x, y, peso, type, speed){

        super(scene, x, y, type);
		this.x = x;
        this.y = y;
        this.peso=peso;
        this.speed = speed;
        //this.cursorkeys = cursorKeys;

      

	}