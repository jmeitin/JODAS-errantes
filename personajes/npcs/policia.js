import gameobject from "../../clases/gameobject.js";
import person from "../person.js";

export default class policia extends person {

    //ew MyContainer(this, 400, 500, 1, 'cop', this.campoVisionX, this.campoAuditivoX); 
    constructor(scene, x, y, speed, image, campo_vision_x, campo_auditivo_x, control_policial_x, player, civiles, img_rango_para, ex_ama_para, ex_roja_para, arriba_abajo_para) {
        super(scene, x, y, image, speed);

        this.body.setSize(70, 130); //ajustar el collider del objeto

        this.timer_arriba = this.scene.time.addEvent({delay: 5000, callback:this.cambia_dir_y, callbackScope:this, loop:true});
        this.timer_derecha = this.scene.time.addEvent({delay: 5000, callback: this.cambia_dir_x, callbackScope:this, loop:true});
        this.timer_arriba.paused = true;
        this.timer_derecha.paused = true;

        let img_rango = img_rango_para;
        this.imagen_rango = this.scene.add.image(this.x,this.y,img_rango)
        this.imagen_rango.setBlendMode(Phaser.BlendModes.ADD);
        if(campo_vision_x < 480)this.imagen_rango.setScale(0.9);
        else if(campo_vision_x > 480)this.imagen_rango.setScale(1.1);
        
        this.rango_per = this.scene.add.image(this.x,this.y,img_rango).setScale(2);
        this.rango_per.setAlpha(0);
        this.rango_per.setBlendMode(Phaser.BlendModes.SCREEN);

        
        this.exc_ama = this.scene.add.image(this.x,this.y-150, ex_ama_para).setScale(0.5);
        this.exc_roja = this.scene.add.image(this.x,this.y-150, ex_roja_para).setScale(0.5);
        this.exc_ama.setAlpha(0);
        this.exc_roja.setAlpha(0);

        this.arriba_abajo = arriba_abajo_para;
        this.speed1 = speed;
        this.campo_vision_x = campo_vision_x;
        this.campo_auditivo_x = campo_auditivo_x;
        this.control_policial_x = control_policial_x;
        this.player = player;
        this.civiles = civiles;

       this.container = scene.add.container(x, y);   

        //Campo de control circular
        this.control_policial = new Phaser.Geom.Circle(0,0,this.control_policial_x);
        this.scene.physics.world.enable(this.control_policial);
        this.control_policial.body.setAllowGravity(false);
        this.control_policial.body.moves = false;//no queremos moverlo con el poli

        //Campo de vision circular
        this.campo_vision = new Phaser.Geom.Circle(0,0,this.campo_vision_x);
        this.scene.physics.world.enable(this.campo_vision);
        this.campo_vision.body.setAllowGravity(false);
        this.campo_vision.body.moves = false;//no queremos moverlo con el poli

        //Campo auditivo circular
        this.campo_auditivo = new Phaser.Geom.Circle(0,0,this.campo_auditivo_x);
        this.scene.physics.world.enable(this.campo_auditivo);
        this.campo_auditivo.body.setAllowGravity(false);
        this.campo_auditivo.body.moves = false;//no queremos moverlo con el poli


       this.dir_x = 0;
       this.dir_y = 0;

        this.player_civil = false; //choco player con civil?

        this.descubierto = false; // NI SOSPECHO NI HE DESCUBIERTO A PLAYER
        this.persiguiendo = false;
        
        this.reconoce_sombrero = false;
        this.reconoce_sin_sombrero = false;
        

        this.last_time=new Date().getTime();         //para que los policias no se queden parados cuando colisionen
        this.current_time = this.last_time;



        //ANIMACIONES
        this.frame_rate = 4;
        this.scene.anims.create({
            key: 'polifront',
            frames: this.scene.anims.generateFrameNumbers(image, { start: 0, end: 3 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });

          this.scene.anims.create({
          key: 'polileft',
            frames: this.scene.anims.generateFrameNumbers(image, { start: 4, end: 7 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });

          this.scene.anims.create({
          key: 'poliright',
            frames: this.scene.anims.generateFrameNumbers(image, { start: 8, end: 11 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });

         
          this.scene.anims.create({
            key: 'poliback',
            frames: this.scene.anims.generateFrameNumbers(image, { start: 12, end: 15 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });

    }
   

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        this.dibuja_rango();
        this.move();
        this.dibuja_exc();
        this.rangos_vision();  
        this.current_time = new Date().getTime();
    }   

    dibuja_rango(){
        this.imagen_rango.setPosition(this.x,this.y);
        this.rango_per.setPosition(this.x,this.y);
    }

    dibuja_exc(){
        this.exc_ama.setPosition(this.x,this.y-150);
        this.exc_roja.setPosition(this.x,this.y-150);
    }

    cambia_dir_y(){
        this.dir_y = -this.dir_y;
    }
    cambia_dir_x(){
        this.dir_x = -this.dir_x;
    }

    move(){
        //si no veo a player && ha pasado cierto tiempo cambio de dir
        if(!Phaser.Geom.Circle.ContainsPoint(this.campo_vision,this.player) && this.current_time >=this.last_time + 5000){
            this.exc_ama.setAlpha(0);
            this.exc_roja.setAlpha(0);
            this.rango_per.setAlpha(0);

            if(this.arriba_abajo){
                this.dir_x = 0;
                if(this.dir_y === 0) this.dir_y = 1;
                this.timer_arriba.paused = false;
            }
            else{
                this.dir_y = 0;
                if(this.dir_x === 0) this.dir_x = -1;
                this.timer_derecha.paused = false;
            }

            this.last_time = new Date().getTime();
           // console.log ("nuevo start");
        }
        //else this.last_time = new Date().getTime();
       // else console.log ("idiota");

        if (this.dir_x > 0){
            this.move_right();
            this.anims.play('poliright', true);
        }
        else if (this.dir_x < 0){
            this.move_left();
            this.anims.play('polileft', true);  
        }
        else if (this.dir_y > 0){
            this.move_down();
            this.anims.play('polifront', true);
        }
        else if (this.dir_y < 0){
            this.move_up();
            this.anims.play('poliback', true);
        }
        else {
            this.stop ();
            //this.anims.play('poliup', true);
        }
         

        this.campo_vision.x = this.x;
        this.campo_vision.y = this.y;     
        this.campo_auditivo.x = this.x;
        this.campo_auditivo.y = this.y;
        this.control_policial.x=this.x;
        this.control_policial.y = this.y;
    }

   

    //CALCULA LA DIR EN LA QUE TIENE QUE SEGUIR AL JUGADOR
    calcular_dir(jugador_x, jugador_y){
        this.jugador_x = jugador_x;
        this.jugador_y = jugador_y;    
        
        //get angle
        this.dirxxx = this.jugador_x - this.x;
        this.diryyy = this.jugador_y - this.y;
       // console.log ("DIR X = ", this.dirxxx);
        //console.log ("DIR Y = ", this.diryyy);

        this.xabsoluto = Math.abs(this.dirxxx);
        this.yabsoluto = Math.abs(this.diryyy);

        if (this.xabsoluto > this.yabsoluto){ //EJE HORIZONTAL
            if (this.dirxxx > 0) this.dir_x = 1;
            else this.dir_x = -1;
    
            this.dir_y = 0;
        }
        else { //EJE VERTICAL
            if (this.diryyy > 0) this.dir_y = 1;
            else this.dir_y = -1;

            this.dir_x = 0;//
        }
       // console.log ("DIR X = ", this.dir_x);
       // console.log ("DIR Y = ", this.dir_y);
    }

    player_choco_con_civil(choque){
        this.player_civil = choque;
    }

    rangos_vision (){
           ///////////////////////////////////////////////ZONA DE RADIOS POLICIA///////////////////////////////////////////////////

           this.jugador_x = this.player.x; //ME GUARDO SU POSICION PORQUE LA NECESITARE
           this.jugador_y = this.player.y;
   
           //PLAYER ESTA DENTRO DEL RANGO AUDITIVO
           if (Phaser.Geom.Circle.ContainsPoint(this.campo_auditivo,this.player)){

               if (this.player_civil){ //PLAYER HA CHOCADO CON UN CIVIL
                this.calcular_dir(this.jugador_x, this.jugador_y);    
                this.exc_roja.setAlpha(0);
                this.exc_ama.setAlpha(1);  
                console.log("OIDO COCINA!");
                this.player_civil = false;
               }
   
           
               //PLAYER ESTA DENTRO DEL RANGO DE VISION
               if(Phaser.Geom.Circle.ContainsPoint(this.campo_vision,this.player)) { 
                this.timer_arriba.paused = true;
                this.timer_derecha.paused = true;
                   this.exc_ama.setAlpha(0);
                   this.exc_roja.setAlpha(1);
                   this.rango_per.setAlpha(1);
                   this.dibuja_exc(false);

                   this.calcular_dir(this.jugador_x, this.jugador_y); 
   
                   //si le he visto con la bomba previamente(ha entrado en radio pequeño), empiezo a perseguirle rapido
                   if(this.descubierto && !this.persiguiendo){
                       if(this.reconoce_sombrero && this.player.sombrero || this.reconoce_sin_sombrero && !this.player.sombrero){      
                            this.set_persiguiendo(true, this.player.sombrero);
                            console.log("rapido");                                                         
                       }
                   }
                   
   
                   //CONTROL POLICIAL
                   if(Phaser.Geom.Circle.ContainsPoint(this.control_policial,this.player)){
                       if(!this.persiguiendo){
                           //el policia descubre que eres terrorista
                           this.set_persiguiendo(true, this.player.sombrero);
                           this.set_descubierto(true);
                       }
                       
                       console.log('CONTROL POLICIAL');
                       
   
                       // SI POLICIA CHOCA CON PLAYER
                       if (this.scene.physics.overlap(this.player, this)){  //MUERTO
                               //FIN DE JUEGO-------------------------------------------------------------------------------------------------------------------
                           
                           console.log ("Usted queda ARRESTADO");
                           this.player.set_speed(0); //el player ya no se puede mover
                           this.set_speed(0);
                           let suicidio = false;
   
                           if (this.player.has_gun()) {
                               console.log ("Pues me SUICIDIO");
                               this.scene.game.config.victoria = 2;
                             }
                           // meter tambien un timer o algo
                           this.scene.parar_musica();
                           if(this.scene.game.config.victoria !== 2) this.scene.game.config.victoria = 0;
                           this.scene.scene.start('end_menu');
                       }
   
                   } //control policial
   
                   
                   
               } //rango de vision
   
               else{
                   if(this.persiguiendo){
                       this.set_persiguiendo(false, this.player.sombrero);
                   }
               }        
           }//  //campo auditivo
    }

    set_descubierto(descubierto){
        this.descubierto = descubierto;
        
        
        if(this.descubierto) console.log('descubierto: ', this.speed1); 
    }

    get_descubierto(){
        return this.descubierto;
    }

    get_persiguiendo(){
        return this.persiguiendo;
    }

    set_persiguiendo(persigue, lleva_sombrero){
        this.persiguiendo = persigue;
        if(lleva_sombrero){
            this.reconoce_sombrero = true;
        }
        else{
            this.reconoce_sin_sombrero = true;
        }

        if(this.persiguiendo){
            this.multiply_speed(1.2);
            console.log("rapido");
        }
        else{
            this.multiply_speed(0.8);
            console.log("lento");
        }
    }

    get_reconoce_sombrero(){
        return this.reconoce_sombrero;
    }

    get_reconoce_sin_sombrero(){
        return this.reconoce_sin_sombrero;
    }
    
    set_reconoce_sombrero(){
        this.reconoce_sombrero = true;
    }

    set_reconoce_sin_sombrero(){
        this.reconoce_sin_sombrero = true;
    }

    


    // Retorna un entero aleatorio entre min (incluido) y max (excluido)
    get_random_int(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }










    
}