import gameobject from "../gameobject.js";

export default class object extends gameobject{
    constructor(scene, x, y, type, peso){
        super(scene, x, y, type);
		this.x = x;
        this.y = y;
        this.peso = peso;
        
    }

    
}