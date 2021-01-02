import person from "./person.js"

export default class player extends person{
    constructor(scene, x, y, type, cursorkeys, speed, inventario){
        super(scene, x, y, type, speed);
      

        
        this.cursorkeys = cursorkeys;  

        this.botonpausa = this.scene.input.keyboard.addKey('P');
        this.pausabool = false;
        
        this.pistola = false; 
        this.bomba_plus = false;
        this.bomba_minus = false;
        

        this.inventario = inventario;
       
        //OBJETOS
        if (this.inventario.includes('zapatos')) this.multiply_velocity (10); //QUE LA MULTIPLIQUE POR ESTE PORCENTAJE
        if (this.inventario.includes('pistola')) this.pistola = true; //lleva pistola
        if (this.inventario.includes('bomba_plus')) this.bomba_plus = true;
        if (this.inventario.includes('bomba_minus')) this.bomba_minus = true;


        //ANIMACIONES
        this.frame_rate = 4;
        this.scene.anims.create({
            key: 'down',
            frames: this.scene.anims.generateFrameNumbers(type, { start: 0, end: 2 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });

          this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers(type, { start: 3, end: 5 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });
          this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers(type, { start: 6, end: 8 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });
          this.scene.anims.create({
            key: 'up',
            frames: this.scene.anims.generateFrameNumbers(type, { start: 9, end: 11 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });
  
  

        
    }


    pausa(){
        if(this.botonpausa.isDown && this.pausabool === false) {
            this.pausabool = true;
            return true;
        }
        else {
            this.pausabool = false;
            return false;
        }
    }
    
    movement_manager(){            

        if(this.cursorkeys.right.isDown){
            this.move_right();
            this.anims.play('right', true);
        }
        else if(this.cursorkeys.left.isDown){
            this.move_left();
            this.anims.play('left', true);
        }
        if(this.cursorkeys.up.isDown){
            this.move_up();
            this.anims.play('up', true);
        }
        else if(this.cursorkeys.down.isDown){
            this.move_down();
            this.anims.play('down', true);
        }
        if(this.cursorkeys.space.isDown) this.stop();
    }

    has_gun(){ //LLEVA PISTOLA?
        return this.pistola;
    }

    es_un_individuo_sospechoso(){
        this.maleante = false;
        if (this.bomba_plus && !this.bomba_minus || this.bomba_plus && this.pistola) this.maleante = true; // solo sombrero
        //capa ----------------------------------------------------------------------------------------------------
        return this.maleante;
    }


}