import Sprites from "../Clases/Sprites.js";

export default class buttonF1 extends Sprites{
    constructor(scene, x, y, type, scale, txtbox, inventario, pesoMaximo, pesoObj){
        super(scene, x, y, type);         

        //pesos
        this.pesoMaximo = pesoMaximo;
        this.pesoObj = pesoObj;

        //otras cosas
        this.clicked = false;
        this.inventario = inventario;
        this.type = type;
        this.setInteractive();
        //this.setOrigin(0,0);
        this.setScale(scale);

        this.textbox = txtbox;
        
        this.on('pointerover', () => { 
            this.setScale(scale * 1.1);     
            this.showTxtbox();
        });
        
        this.on('pointerout', () => { 
            this.setScale(scale);
            this.textbox.setVisible(false);
            
        });

        this.on("pointerdown", ()=>{
            var pesoAct = this.scene.devuelvePesoActual();

            if(this.clicked){ 
                this.clicked = false;
                this.quitaInventario(pesoAct);
            }
            else if(!this.clicked){
                if(pesoAct + this.pesoObj <= this.pesoMaximo){
                    this.clicked = true;                   
                    this.añadeInventario(pesoAct);                   
                }                
            }
            
        }) 
    }

    showTxtbox(){//mismo error q añadeinventario posiblemente
        //this.scene.add.image(this.x + 100, this.y + 100, this.textbox);
        this.textbox.setVisible(true);
    }

    añadeInventario(pesoAct){
        this.inventario.push(this.type);
        pesoAct += this.pesoObj; 
        this.scene.setPesoActual(pesoAct);
    }

    quitaInventario(pesoAct){
        let pos = this.inventario.indexOf(this.type);
        this.inventario.splice(pos, 1);
        pesoAct -= this.pesoObj;
        this.scene.setPesoActual(pesoAct);
    }
   
}