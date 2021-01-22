import person from "./person.js"

export default class player extends person{
    constructor(scene, x, y, type, cursorkeys, speed, inventario, flecha_img, pos_final_x, pos_final_y){
        super(scene, x, y, type, speed);
      
        this.flecha_p = this.scene.add.image(x, y, flecha_img);
        // cambiar estas coordenadas por las que sean con el mapa terminado
        this.coor_fin_x = pos_final_x;
        this.coor_fin_y = pos_final_y;
        this.body.setSize(70, 150); //ajustar el collider del objeto

        this.cursorkeys = cursorkeys;  

        this.botonpausa = this.scene.input.keyboard.addKey('P');
        
        this.pistola;
        this.sombrero;
        
        this.inventario = inventario;

        this.key_w = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_a = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_s = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_d = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
       
        //OBJETOS        
        if (this.inventario.includes('pistola')) this.pistola = true; //lleva pistola

        this.frames = [];
        this.frames_normal = [0, 2, 3, 5, 6, 8, 9, 11];
        this.frames_zapatos = [24, 26, 27, 29, 30, 32, 33, 35];
        this.frames_capa = [36, 38, 39, 41, 42, 44, 45, 47];
        this.frames_capa_zapas = [60, 62, 63, 65, 66, 68, 69, 71];
        

        if (this.inventario.includes('zapatos')) {
          this.multiply_velocity (10); //QUE LA MULTIPLIQUE POR ESTE PORCENTAJE
          if (this.inventario.includes('capa')) this.frames = this.frames_capa_zapas;
          else this.frames = this.frames_zapatos;
        }
        else if (this.inventario.includes('capa')){
          this.frames = this.frames_capa;
        }
        else{
          this.frames = this.frames_normal;
        }
        

        this.frames_sombrero = [];
        this.frames_somb = [12, 14, 15, 17, 18, 20, 21, 23];
        this.frames_somb_zapatos = [48, 50, 51, 53, 54, 56, 57, 59];

        if (this.inventario.includes('zapatos') && this.inventario.includes('sombrero')){
          this.frames_sombrero = this.frames_somb_zapatos;
        }
        else{
          this.frames_sombrero = this.frames_somb;
        }
     
        //ANIMACIONES
        this.frame_rate = 4;
        this.scene.anims.create({
            key: 'down',
            frames: this.scene.anims.generateFrameNumbers(type, { start: this.frames[0], end: this.frames[1] }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers(type, { start: this.frames[2], end: this.frames[3] }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers(type, { start: this.frames[4], end: this.frames[5] }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });
        this.scene.anims.create({
            key: 'up',
            frames: this.scene.anims.generateFrameNumbers(type, { start: this.frames[6], end: this.frames[7] }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });
          this.scene.anims.create({
            key: 'stop',
            frames: this.scene.anims.generateFrameNumbers(type, { start: this.frames[0]+1, end: this.frames[0]+1 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });

          //SOMBRERO
          this.scene.anims.create({
            key: 'sombrerodown',
            frames: this.scene.anims.generateFrameNumbers(type, { start: this.frames_sombrero[0], end: this.frames_sombrero[1] }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });

        this.scene.anims.create({
            key: 'sombreroleft',
            frames: this.scene.anims.generateFrameNumbers(type, { start: this.frames_sombrero[2], end: this.frames_sombrero[3] }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });
        this.scene.anims.create({
            key: 'sombreroright',
            frames: this.scene.anims.generateFrameNumbers(type, { start: this.frames_sombrero[4], end: this.frames_sombrero[5] }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });
        this.scene.anims.create({
            key: 'sombreroup',
            frames: this.scene.anims.generateFrameNumbers(type, { start: this.frames_sombrero[6], end: this.frames_sombrero[7] }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });
          this.scene.anims.create({
            key: 'stopsombrero',
            frames: this.scene.anims.generateFrameNumbers(type, { start: this.frames_sombrero[0]+1, end: this.frames_sombrero[0]+1 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });

        
    }

    preload(){
      this.pistola = false; 
      this.sombrero = false;
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
        else if(this.cursorkeys.up.isDown || this.key_w.isDown){
            this.move_up();
            if (this.sombrero) this.anims.play('sombreroup', true);
            else this.anims.play('up', true);
        }
        else if(this.cursorkeys.down.isDown || this.key_s.isDown){
            this.move_down();
            if (this.sombrero) this.anims.play('sombrerodown', true);
            else this.anims.play('down', true);
        }
        else {          
          if (this.sombrero) this.anims.play ("stopsombrero", true);
          else this.anims.play ("stop", true);
          this.stop();
        }

        
        this.update_flecha();

      //  console.log ("player ", this.y);
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