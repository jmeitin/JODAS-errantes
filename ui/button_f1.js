import sprites from "../clases/sprites.js";

export default class buttonf1 extends sprites{
    constructor(scene, x, y, type, scale, txtbox, inventario, peso_maximo, peso_obj){
        super(scene, x, y, type);         

        //pesos
        this.peso_maximo = peso_maximo;
        this.peso_obj = peso_obj;

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
            this.show_txtbox();
        });
        
        this.on('pointerout', () => { 
            this.setScale(scale);
            this.textbox.setVisible(false);
            
        });

        this.on("pointerdown", ()=>{
            var peso_act = this.scene.devuelve_peso_actual();

            if(this.clicked){ 
                this.clicked = false;
                this.quita_inventario(pesoAct);
            }
            else if(!this.clicked){
                if(peso_act + this.peso_obj <= this.peso_maximo){
                    this.clicked = true;                   
                    this.añade_inventario(peso_act);                   
                }                
            }
            
        }) 
    }

    show_txtbox(){//mismo error q añadeinventario posiblemente
        //this.scene.add.image(this.x + 100, this.y + 100, this.textbox);
        this.textbox.setVisible(true);
    }

    añade_inventario(pesoact){
        this.inventario.push(this.type);
        peso_act += this.pesoObj; 
        this.scene.setpeso_actual(peso_act);
    }

    quita_inventario(pesoact){
        let pos = this.inventario.indexOf(this.type);
        this.inventario.splice(pos, 1);
        peso_act -= this.peso_Obj;
        this.scene.setpeso_actual(peso_act);
    }
   
}