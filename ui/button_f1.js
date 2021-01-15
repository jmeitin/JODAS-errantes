import gameobject from "../clases/gameobject.js";

export default class buttonf1 extends gameobject{
    constructor(scene, x, y, type, scale, txtbox, inventario, peso_maximo, peso_obj){
        super(scene, x, y, type);         

        //pesos
        this.peso_maximo = peso_maximo;
        this.peso_obj = peso_obj;
        this.peso_act = 0;

        //otras cosas
        this.clicked = false;
        this.inventario = inventario;
        this.type = type;
        this.setInteractive();
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
            this.peso_act = this.scene.devuelve_peso_actual();

            if(this.clicked){ 
                this.clicked = false;
                this.quita_inventario(this.peso_act);
                this.alpha = 1;
            }
            else if(!this.clicked){
                if(this.peso_act + this.peso_obj <= this.peso_maximo){
                    this.clicked = true;                   
                    this.añade_inventario(this.peso_act);    
                    this.alpha = 0.7;               
                }                
            }
            
        }) 
    }

    show_txtbox(){
        this.textbox.setVisible(true);
    }

    añade_inventario(){
        this.inventario.push(this.type);
        this.peso_act += this.peso_obj; 
        this.scene.set_peso_actual(this.peso_act);

        if(this.type == 'bomba_plus'){
            this.scene.set_lleva_bomba_plus(true);            
        }
        else if(this.type == 'bomba_minus'){
            this.scene.set_lleva_bomba_minus(true);
        }
    }

    quita_inventario(){
        let pos = this.inventario.indexOf(this.type);
        this.inventario.splice(pos, 1);

        this.peso_act -= this.peso_obj;
        
        this.scene.set_peso_actual(this.peso_act); 

        if(this.type == 'bomba_plus'){
            this.scene.set_lleva_bomba_plus(false);
        }
        else if(this.type == 'bomba_minus'){
            this.scene.set_lleva_bomba_minus(false);
        }
    }

    
   
}