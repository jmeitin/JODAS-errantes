import Sprites from "../Clases/Sprites.js";

export default class buttonF1 extends Sprites{
    constructor(scene, x, y, type, scale, txtbox){
        super(scene, x, y, type);         

        this.setInteractive();
        //this.setOrigin(0,0);
        this.setScale(scale);
        this.on('pointerover', () => { 
            this.setScale(scale * 1.1);     
            this.showTxtbox();
        });
        
        this.on('pointerout', () => { 
            this.setScale(scale);
        });
    }

    showTxtbox(){
        this.scene.add.image(this.x + 100, this.y + 100, this.txtbox);
        //console.log('aaaa');
        //const txt = 
    }

    añadeInventario(){
        
    }
 
}