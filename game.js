import Civil from "./Personajes/Civil.js";
import Player from "./Personajes/Player.js";
import Policia from "./Personajes/Policia.js";
import MyContainer from "./Personajes/MyContainer.js";
import Persona from "./Personajes/Person.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {   
    this.load.image('guy', './Imgs/jugador1.png');
    this.load.image('civil', './Imgs/viandante0.png');
    // this.load.spritesheet('golem', './Imgs/golem.png',
    // {
    //   frameHeight: 32,
    //   frameWidth:32
    // });
  }

  create() {
    this.cursorKeys = this.input.keyboard.createCursorKeys();    
   

    this.player = new Player(this, 300, 900, "guy", this.cursorKeys, 10);

    //TRIGGER ==> TRIGGER
    this.campoVision = this.add.zone(0, 0);
    this.campoVision.setSize(400, 400);
    this.physics.world.enable(this.campoVision);
    this.campoVision.body.setAllowGravity(false);
    this.campoVision.body.moves = true;//queremos moverlo con el poli
   // this.trigger.moves(10, 0); ==> como mover un trigger?

    this.policia = new Policia(this, 0, 0, "guy", 0.5);

    //CONTAINER
    this.container = new MyContainer(this, 400, 500, 1); 
    this.container.add(this.campoVision, 1);
    //this.policia.add(this.campoVision, 0);

    this.container.add(this.policia, 0); //los hago hijos
    
    //va mal?
    Object.assign(MyContainer.prototype, Persona); //assign entre clases ==> MyContainer puede utilizar persona



    this.cameras.main.startFollow(this.player);
    

    this.civiles = [];
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 10; j++){
        if(((i < 3 || i > 6) || (j < 3 || j > 6))){
          if(i < 2 || i > 7){
            let civil = new Civil(this, ((Math.random() * 50) - 25) + 600 + 60 * i, ((Math.random() * 50) - 25) + 500 + 70 * j, "civil", Math.random() + 0.5).setScale(3);
            this.civiles.push(civil);
          }
          else{
            let civil = new Civil(this, 600 + 60 * i, 500 + 70 * j, "civil", 1).setScale(3);
            this.civiles.push(civil);
          }
        }
      }
    }

  }

  update(time, delta) {
    console.debug(this.civiles.length);

    this.player.movementManager();
    if(this.player.pausa()) this.scene.pause();
    else this.scene.resume(); // no vuelve a cargar la escena
    //this.container.moveLeft(); //NO ES UNA FUNCION
    //this.container.update();
    //this.policia.update();



    //POLICIA VE A PLAYER
    if(this.physics.overlap(this.player, this.campoVision)) { 
      //this.plauyer.matar();
      console.log("Colision");
    }

    

    
    for(let i = 0; i < this.civiles.length; i++){
      this.civiles[i].update();
    }
  }


}
