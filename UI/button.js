import Sprites from "../Clases/Sprites.js";

export default class button extends Sprites{
    constructor(scene, x, y, type, scale){
        super(scene, x, y, type);         

        this.setInteractive();
        //this.setOrigin(0,0);
        this.setScale(scale);
        this.on('pointerover', () => { 
            this.setScale(scale + 1.2);        
        });

        this.on('pointerout', () => { 
            this.setScale(scale);
        });
    }

    createButton(){
        
    }
}