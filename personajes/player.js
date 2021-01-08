import person from "./person.js"

export default class player extends person{
    constructor(scene, x, y, type, cursorkeys, speed, inventario, flecha_img){
        super(scene, x, y, type, speed);
      
        this.flecha_p = this.scene.add.image(x, y, flecha_img);
        // cambiar estas coordenadas por las que sean con el mapa terminado
        this.coor_fin_x = 0;
        this.coor_fin_y = 0; 
        
        this.cursorkeys = cursorkeys;  

        this.botonpausa = this.scene.input.keyboard.addKey('P');
        
        this.pistola = false; 
        this.sombrero = false;
        
        this.inventario = inventario;

        this.key_w = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_a = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_s = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_d = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
       
        //OBJETOS
        if (this.inventario.includes('zapatos')) this.multiply_velocity (10); //QUE LA MULTIPLIQUE POR ESTE PORCENTAJE
        if (this.inventario.includes('pistola')) this.pistola = true; //lleva pistola


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
        if(this.cursorkeys.right.isDown || this.key_d.isDown){
            this.move_right();
            if (this.sombrero) this.anims.play('sombreroright', true);
            else this.anims.play('right', true);
        }
        else if(this.cursorkeys.left.isDown || this.key_a.isDown){
            this.move_left();
            if (this.sombrero) this.anims.play('sombreroleft', true);
            else this.anims.play('left', true);
        }
        if(this.cursorkeys.up.isDown || this.key_w.isDown){
            this.move_up();
            if (this.sombrero) this.anims.play('sombreroup', true);
            else this.anims.play('up', true);
        }
        else if(this.cursorkeys.down.isDown || this.key_s.isDown){
            this.move_down();
            if (this.sombrero) this.anims.play('sombrerodown', true);
            else this.anims.play('down', true);
        }
        if(this.cursorkeys.space.isDown) this.stop();
        this.update_flecha();
    }

    update_flecha(){
      let coor_x = this.coor_fin_x - this.x;
      let coor_y = this.coor_fin_y - this.y;
      let vector = new Phaser.Math.Vector2(coor_x,coor_y);
      this.flecha_p.setPosition(this.x, this.y - 350);
      this.flecha_p.setRotation(vector.angle())
    }

    has_gun(){ //LLEVA PISTOLA?
        return this.pistola;
    }

    set_sombrero(somb){
      this.sombrero = somb;

    }

    get_sombrero(){
      return this.sombrero;
    }


}