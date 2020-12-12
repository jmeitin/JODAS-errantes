export default class MyContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, speed, children) {
        super(scene, x, y, children);
        // ...
        this.x = x;
        this.y = y;
        this.speed = speed;
       // this.speed = speed;

       this.dirX = this.getRandomInt(-1, 2);

       this.dirY = this.getRandomInt(-1, 2);

        this.scene.physics.add.existing(this); //

        this.sospecha = false;
    }
   

    // preUpdate(time, delta) {}

    update(){
        //this.calcularDif();
        //this.update();
        //this.x-=speed;
       // this.x -= 1;

       


       this.move();
        console.log('Container');

       
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

       }
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

    sospechar(sospecha){
        this.sospecha = sospecha;
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

    
}