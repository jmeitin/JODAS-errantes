import gameobject from "../../clases/gameobject.js";

export default class policia extends Phaser.GameObjects.Container {

    //ew MyContainer(this, 400, 500, 1, 'cop', this.campoVisionX, this.campoAuditivoX); 
    constructor(scene, x, y, speed,  image, campo_vision_x, campo_auditivo_x, control_policial_x, children) {
        super(scene, x, y, children);
        // ...
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.campo_vision_x = campo_vision_x;
        this.campo_auditivo_x = campo_auditivo_x;
        this.control_policial_x = control_policial_x;


       this.scene.add.existing(this);
       this.scene.physics.add.existing(this); 

       //POLICIA ==> SPRITE
       this.gameobject = new gameobject(this.scene, 0, 0, image);
    

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
       this.add(this.gameobject);
       this.add(this.campo_vision);
       this.add(this.campo_auditivo);
       this.add(this.control_policial);


       this.dir_x = this.get_random_int(-1, 2); //DIRECCION RANDOM
       this.dir_y = this.get_random_int(-1, 2);

        

        this.descubierto = false; // NI SOSPECHO NI HE DESCUBIERTO A PLAYER
        this.sospecha = false;
    }
   

    // preUpdate(time, delta) {}
    preUpdate(time, delta){
        this.move();
        console.log('Container');

        //PLAYER ESTA DENTRO DEL RANGO AUDITIVO
    }   

    move(){
       if (this.dir_x != 0 && this.dir_y !=0){ //DIAGONAL
           this.move_x();
           this.move_y();
       }

       else if (this.dir_x == 0 && this.dir_y !=0){ //VERTICAL
           this.move_y();
       }
       
       else if (this.dir_x != 0 && this.dir_y == 0){ //HORIZONTAL
           this.move_x();
       }
       else{ //quieto

       }//
    }

    move_x(){
        this.x += this.dir_x * this.speed;
    }

    move_y(){
        this.y += this.dir_y * this.speed;
    }


    //CALCULA LA DIR EN LA QUE TIENE QUE SEGUIR AL JUGADOR
    calcular_dir(jugador_x, jugador_y){
        this.jugador_x = jugador_x;
        this.jugador_y = jugador_y;    
  
        //get angle
        this.angle = Math.atan2(this.jugador_y - this.y, this.jugador_x - this.x); //CALCULA EL ANGULO

        this.dir_x = Math.cos(this.angle);
        this.dir_y = Math.sin(this.angle);
    }

    descurbrir_player(descubierto){
        this.descubierto = descubierto;
        if(this.descubierto){
            this.speed = this.speed*2;
        }
        
        console.log('descubierto: ', this.speed); 
    }

    sospechar(sospechar){
        this.sospecha = sospechar;
    }
    get_sospecha (){
        return this.sospecha;
    }
    get_descubierto(){
        return this.descubierto;
    }

    


    // Retorna un entero aleatorio entre min (incluido) y max (excluido)
    get_random_int(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }





    //persona
    move_left(){
        this.x += this.speed;
    }

    move_right(){
        this.x+= this.speed;
    }

    move_up(){
        this.y-= this.speed;
    }

    move_down(){
        this.y+= this.speed;
    }

    set_speed (speed){
        this.speed = speed;
    }
    
}