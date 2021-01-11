import gameobject from "../../clases/gameobject.js";
import person from "../person.js";

export default class policia extends person {

    //ew MyContainer(this, 400, 500, 1, 'cop', this.campoVisionX, this.campoAuditivoX); 
    constructor(scene, x, y, speed, image, campo_vision_x, campo_auditivo_x, control_policial_x, player, civiles) {
        super(scene, x, y, image, speed);
        
        this.x1 = x;
        this.y1 = y;
        this.speed1 = speed;
        this.campo_vision_x = campo_vision_x;
        this.campo_auditivo_x = campo_auditivo_x;
        this.control_policial_x = control_policial_x;
        this.player = player;
        this.civiles = civiles;

       this.container = scene.add.container(this.x1, this.y1);   

       //POLICIA ==> TRIGGER ==> CAMPO DE SOSPECHA/CONTROL POLICIAL
       this.control_policial = scene.add.zone(0, 0);
       this.control_policial.setSize( this.control_policial_x,  this.control_policial_x);
       this.scene.physics.world.enable( this.control_policial);
       this.control_policial.body.setAllowGravity(false);
       this.control_policial.body.moves = false;
       
       //POLICIA ==> TRIGGER ==> CAMPO DE VISION
       this.campo_vision = scene.add.zone(0, 0);
       this.campo_vision.setSize(this.campo_vision_x, this.campo_vision_x);
       this.scene.physics.world.enable(this.campo_vision);
       this.campo_vision.body.setAllowGravity(false);
       this.campo_vision.body.moves = false;//no queremos moverlo con el poli

       //POLICIA ==> TRIGGER ==> CAMPO AUDITIVO
       this.campo_auditivo = scene.add.zone(0, 0);
       this.campo_auditivo.setSize(this.campo_auditivo_x, this.campo_auditivo_x);
       this.scene.physics.world.enable(this.campo_auditivo);
       this.campo_auditivo.body.setAllowGravity(false);
       this.campo_auditivo.body.moves = false;//no queremos moverlo con el poli
       

       //EL CONTOINER ES PADRE DEN LOS CAMPOS DE DETECCION Y SIMILARES
       //this.container.add(this.gameobject);
       this.container.add(this.campo_vision);
       this.container.add(this.campo_auditivo);
       this.container.add(this.control_policial);


       this.dir_x = this.get_random_int(-1, 2); //DIRECCION RANDOM
       this.dir_y = this.get_random_int(-1, 2);

        

        this.descubierto = false; // NI SOSPECHO NI HE DESCUBIERTO A PLAYER
        this.persiguiendo = false;
        
        this.reconoce_sombrero = false;
        this.reconoce_sin_sombrero = false;
        


        //ANIMACIONES
        this.frame_rate = 4;
        this.scene.anims.create({
            key: 'poliup',
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
            key: 'polidown',
            frames: this.scene.anims.generateFrameNumbers(image, { start: 12, end: 15 }),
            frameRate: this.frame_rate,
            repeat: -1 //en loop
          });

         
  
  


    }
   

    // preUpdate(time, delta) {}
    preUpdate(time, delta){
        super.preUpdate(time, delta);
        //this.move();
       // console.log('Container');
        if (this.dir_y > 0.5){
           this.anims.play('poliup', true);
           this.move_up();
           //this.anims.play('right', true);
        }
        else if (this.dir_y < -0.5){
           this.anims.play('polidown', true);
           this.move_down();
           // console.log("ANIM");
        }
        else if (this.dir_x < 0){
            this.anims.play('polileft', true);
            this.move_left();
            // console.log("ANIM");
         }
         else if (this.dir_x > 0){
            this.anims.play('poliright', true);
            this.move_right();
         }
        
       // this.anims.play('polidown', true);

        


        ///////////////////////////////////////////////ZONA DE RADIOS POLICIA///////////////////////////////////////////////////

        this.jugador_x = this.player.get_x(); //ME GUARDO SU POSICION PORQUE LA NECESITARE
        this.jugador_y = this.player.get_y();

        //PLAYER ESTA DENTRO DEL RANGO AUDITIVO
        if (this.scene.physics.overlap(this.player, this.campo_auditivo)){

            this.civiles.forEach((civil) =>{
                //SI PLAYER CHOCA CON UN CIVIL DENTRO DEL RANGO AUDITIVO DE POLICIA
                if (this.scene.physics.overlap(this.player, civil)){  //HACE RUIDO ==> AVISA A POLICIA               
                    this.calcular_dir(this.jugador_x, this.jugador_y);      
                    // console.log("Quien anda ahi?!");
                }
            })

        
            //PLAYER ESTA DENTRO DEL RANGO DE VISION
            if(this.scene.physics.overlap(this.player, this.campo_vision)) { 
                console.log(this.get_reconoce_sin_sombrero());
                this.calcular_dir(this.jugador_x, this.jugador_y); 

                //si le he visto con la bomba previamente(ha entrado en radio pequeño), empiezo a perseguirle rapido
                if(this.get_descubierto() && !this.get_persiguiendo()){
                    this.set_persiguiendo(true, this.player.get_sombrero());
                }
                

                //CONTROL POLICIAL
                if(this.scene.physics.overlap(this.player,  this.control_policial)){
                    if(!this.get_persiguiendo()){
                        //el policia descubre que eres terrorista
                        this.set_persiguiendo(true, this.player.get_sombrero());
                        this.set_descubierto(true);
                    }
                    
                    console.log('CONTROL POLICIAL');
                    

                    // SI POLICIA CHOCA CON PLAYER
                    if (this.scene.physics.overlap(this.player, this)){  //MUERTO
                            //FIN DE JUEGO-------------------------------------------------------------------------------------------------------------------
                        
                        console.log ("Usted queda ARRESTADO");
                        this.player.set_speed(0); //el player ya no se puede mover
                        this.set_speed(0);

                        if (this.player.has_gun()) {
                            console.log ("Pues me SUICIDIO");
                            //FALTA ANIMACION-------------------------------------------------------------------------------------------------------------------
                        }
                        // imagen fin partida
                        // meter tambien un timer o algo
                        this.scene.parar_musica();
                        this.scene.scene.start('end_menu',{vic:false,score:0});
                    }

                } //control policial

                
                
            } //rango de vision

            else{
                if(this.get_persiguiendo()){
                    this.set_persiguiendo(false, this.player.get_sombrero());
                }
            }        
        }//  //campo auditivo
    }   

    move(){
        this.xabsoluto=Math.abs(this.dir_x);
        this.yabsoluto=Math.abs(this.dir_y);
        if(this.dir_x > 0 &&this.dir_y>0){      //derecha y arriba
            if(this.xabsoluto>this.yabsoluto){
                this.move_right();  
                //this.container.x += this.speed;        
            }
            else{
                this.move_up();
                //this.container.y += this.speed;   
            }
        }
        else if(this.dir_x > 0 &&this.dir_y<0){             //derecha abajo
            if(this.xabsoluto>this.yabsoluto){
                this.move_right();
                //this.container.x += this.speed; 
            }
            else{
                this.move_down();
                //this.container.y -= this.speed;   
            }
        }
        else if(this.dir_x < 0 &&this.dir_y<0){             //izquierda abajo
            if(this.xabsoluto>this.yabsoluto){
                this.move_left();
                //this.container.x -= this.speed; 
            }
            else{
                this.move_down();
                //this.container.y -= this.speed;   
            }
        }
        else if(this.dir_x < 0 &&this.dir_y>0){             //izquierda arriba
            if(this.xabsoluto>this.yabsoluto){
                this.move_left();
                //this.container.x -= this.speed; 
            }
            else{
                this.move_up();
                //this.container.y += this.speed;   
            }
        }
        else{
            this.move_down();
        }
      
    }

    /*move_x(){
        this.x += this.dir_x * this.speed;
        this.container.x += this.dir_x * this.speed;
    }

    move_y(){
        this.y += this.dir_y * this.speed;
        this.container.y += this.dir_y * this.speed;
    }*/


    //CALCULA LA DIR EN LA QUE TIENE QUE SEGUIR AL JUGADOR
    calcular_dir(jugador_x, jugador_y){
        this.jugador_x = jugador_x;
        this.jugador_y = jugador_y;    
  
        //get angle
        this.angle = Math.atan2(this.jugador_y - this.y1, this.jugador_x - this.x1); //CALCULA EL ANGULO

        this.dir_x = Math.cos(this.angle);
        this.dir_y = Math.sin(this.angle);
    }

    set_descubierto(descubierto){
        this.descubierto = descubierto;
        
        
        console.log('descubierto: ', this.speed1); 
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
            this.multiply_speed(2);
        }
        else{
            this.multiply_speed(0.5);
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


    


    //persona




    
}