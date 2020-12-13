import gameObject from "../gameObject.js";

export default class Object extends gameObject{
    constructor(scene, x, y, type, peso){
        super(scene, x, y, type);
		this.x = x;
        this.y = y;
        this.peso = peso;
        
    }

    
}