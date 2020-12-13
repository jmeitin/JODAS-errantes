import Sprites from "../Clases/Sprites.js";

export default class buttonF1 extends Sprites{
    constructor(scene, x, y, type, scale, txtbox, inventario, pesoActual, pesoMaximo, pesoObj){
        super(scene, x, y, type);         

        //pesos
        this.pesoActual = pesoActual;
        this.pesoMaximo = pesoMaximo;
        this.pesoObj = pesoObj;

        //otras cosas

        this.clicked = false;
        this.inventario = inventario;
        this.type = type;
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

        this.on("pointerdown", ()=>{
 
            if(this.clicked){ 
                this.clicked = false;
                this.quitaInventario();
            }
            else if(!this.clicked){
                if(this.pesoActual + this.pesoObj <= this.pesoMaximo ){
                    this.clicked = true;
                    this.añadeInventario();
                }
                

            }

            console.log(this.inventario);
        }) 
    }

    showTxtbox(){//mismo error q añadeinventario posiblemente
        this.scene.add.image(this.x + 100, this.y + 100, this.txtbox);
        //console.log('aaaa');
        //const txt = 
    }

    añadeInventario(){
        let nuevoInventario = this.inventario.push(this.type);
        this.pesoActual += this.pesoObj;
    }

    quitaInventario(){
        let pos = this.inventario.indexOf(this.type);
        let elementoEliminado = this.inventario.splice(pos, 1);
        this.pesoActual -= this.pesoObj;
    }

    devuelvePesoActual(){       
        return this.pesoActual;
    }
 
}