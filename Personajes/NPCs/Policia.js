import Sprites from "../../Clases/Sprites.js";

export default class Policia extends Phaser.GameObjects.Container {

    //ew MyContainer(this, 400, 500, 1, 'cop', this.campoVisionX, this.campoAuditivoX); 
    constructor(scene, x, y, speed,  image, campoVisionX, campoAuditivoX, controlPolicialX, children) {
        super(scene, x, y, children);
        // ...
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.campoVisionX = campoVisionX;
        this.campoAuditivoX = campoAuditivoX;
        this.controlPolicialX = controlPolicialX;


       this.scene.add.existing(this);
       this.scene.physics.add.existing(this); 

       //POLICIA ==> SPRITE
       this.sprite = new Sprites(this.scene, 0, 0, image);
    

       //POLICIA ==> TRIGGER ==> CAMPO DE SOSPECHA/CONTROL POLICIAL
       this.controlPolicial = scene.add.zone(0, 0);
       this.controlPolicial.setSize(this.controlPolicialX, this.controlPolicialX);
       this.scene.physics.world.enable(this.controlPolicial);
       this.controlPolicial.body.setAllowGravity(false);
       this.controlPolicial.body.moves = false;
       
       //POLICIA ==> TRIGGER ==> CAMPO DE VISION
       this.campoVision = scene.add.zone(0, 0);
       this.campoVision.setSize(this.campoVisionX, this.campoVisionX);
       this.scene.physics.world.enable(this.campoVision);
       this.campoVision.body.setAllowGravity(false);
       this.campoVision.body.moves = false;//no queremos moverlo con el poli

       //POLICIA ==> TRIGGER ==> CAMPO AUDITIVO
       this.campoAuditivo = scene.add.zone(0, 0);
       this.campoAuditivo.setSize(this.campoAuditivoX, this.campoAuditivoX);
       this.scene.physics.world.enable(this.campoAuditivo);
       this.campoAuditivo.body.setAllowGravity(false);
       this.campoAuditivo.body.moves = false;//no queremos moverlo con el poli
       

       //EL CONTOINER ES PADRE DEN LOS CAMPOS DE DETECCION Y SIMILARES
       this.add(this.sprite);
       this.add(this.campoVision);
       this.add(this.campoAuditivo);
       this.add(this.controlPolicial);


       this.dirX = this.getRandomInt(-1, 2); //DIRECCION RANDOM
       this.dirY = this.getRandomInt(-1, 2);

        

        this.descubierto = false; // NI SOSPECHO NI HE DESCUBIERTO A PLAYER
        this.sospecha = false;
    }
   

    // preUpdate(time, delta) {}

    update(){
        this.move();
        console.log('Container');

        //PLAYER ESTA DENTRO DEL RANGO AUDITIVO
    
       
    }   

    move(){
       if (this.dirX != 0 && this.dirY !=0){ //DIAGONAL
           this.moveX();
           this.moveY();
       }

       else if (this.dirX == 0 && this.dirY !=0){ //VERTICAL
           this.moveY();
       }
       
       else if (this.dirX != 0 && this.dirY == 0){ //HORIZONTAL
           this.moveX();
       }
       else{ //quieto

       }//
    }

    moveX(){
        this.x += this.dirX * this.speed;
    }

    moveY(){
        this.y += this.dirY * this.speed;
    }


    //CALCULA LA DIR EN LA QUE TIENE QUE SEGUIR AL JUGADOR
    calcularDir(jugadorX, jugadorY){
        this.jugadorX = jugadorX;
        this.jugadorY = jugadorY;    
  
        //get angle
        this.angle = Math.atan2(this.jugadorY - this.y, this.jugadorX - this.x); //CALCULA EL ANGULO

        this.dirX = Math.cos(this.angle);
        this.dirY = Math.sin(this.angle);
    }

    descurbrirAPlayer(descubierto){
        this.descubierto = descubierto;
        if(this.descubierto){
            this.speed = this.speed*2;
        }
        
        console.log('descubierto: ', this.speed); 
    }

    sospechar(sospechar){
        this.sospecha = sospechar;
    }
    getSospecha (){
        return this.sospecha;
    }
    getDescubierto(){
        return this.descubierto;
    }

    


    // Retorna un entero aleatorio entre min (incluido) y max (excluido)
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }





    //persona
    moveLeft(){
        this.x += this.speed;
    }

    moveRight(){
        this.x+= this.speed;
    }

    moveUp(){
        this.y-= this.speed;
    }

    moveDown(){
        this.y+= this.speed;
    }

    setSpeed (speed){
        this.speed = speed;
    }
    
}