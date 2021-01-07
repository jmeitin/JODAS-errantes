import person from "./person.js"

export default class player extends person{
    constructor(scene, x, y, type, cursorkeys, speed, inventario){
        super(scene, x, y, type, speed);
      

        
        this.cursorkeys = cursorkeys;  

        this.botonpausa = this.scene.input.keyboard.addKey('P');
        
        this.pistola = false; 
        this.bomba_plus = false;
        this.bomba_minus = false;
        this.sombrero = false;
        
        this.inventario = inventario;

        this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
       
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

          //SOMBRERO
          this.scene.anims.create({
            key: 'sombrerodown',
            frames: this.scene.anims.generateFrameNumbers(type, { start: 12, end: 14 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });

        this.scene.anims.create({
            key: 'sombreroleft',
            frames: this.scene.anims.generateFrameNumbers(type, { start: 15, end: 17 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });
        this.scene.anims.create({
            key: 'sombreroright',
            frames: this.scene.anims.generateFrameNumbers(type, { start: 18, end: 20 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });
        this.scene.anims.create({
            key: 'sombreroup',
            frames: this.scene.anims.generateFrameNumbers(type, { start: 21, end: 23 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });
  
  

        
    }


    pausa(){
        if(this.botonpausa.isDown) {
            this.botonpausa.reset();
            return true;
        }
    }
    

    movement_manager(){              
        if(this.cursorkeys.right.isDown || this.keyD.isDown){
            this.move_right();
            if (this.sombrero) this.anims.play('sombreroright', true);
            else this.anims.play('right', true);
        }
        else if(this.cursorkeys.left.isDown || this.keyA.isDown){
            this.move_left();
            if (this.sombrero) this.anims.play('sombreroleft', true);
            else this.anims.play('left', true);
        }
        if(this.cursorkeys.up.isDown || this.keyW.isDown){
            this.move_up();
            if (this.sombrero) this.anims.play('sombreroup', true);
            else this.anims.play('up', true);
        }
        else if(this.cursorkeys.down.isDown || this.keyS.isDown){
            this.move_down();
            if (this.sombrero) this.anims.play('sombrerodown', true);
            else this.anims.play('down', true);
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

    set_sombrero(somb){
        this.sombrero = somb;

    }


}