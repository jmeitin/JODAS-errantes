import Civil from "./Personajes/NPCs/Civil.js";
import Player from "./Personajes/Player.js";
import Policia from "./Personajes/NPCs/Policia.js";
import MyContainer from "./Personajes/NPCs/MyContainer.js";
import Persona from "./Personajes/Person.js";
import Sprites from "./Clases/sprites.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {   
    this.load.image('guy', './Imgs/jugador1.png');
    this.load.image('civil', './Imgs/viandante0.png');
    this.load.tilemapTiledJSON('mapajuego','./Mapas/mapajuego.json');
    this.load.image('tilemapjuego', './Mapas/tilemapjuego.png');
    // this.load.spritesheet('golem', './Imgs/golem.png',
    // {
    //   frameHeight: 32,
    //   frameWidth:32
    // });
  }

  create() {
    this.map = this.make.tilemap({
      key: 'mapajuego',
      tileWidth: 64,
      tileHeight: 64
    });
    const tileset1 = this.map.addTilesetImage('tilemapjuego','tilemapjuego');
    this.backgroundLayer = this.map.createStaticLayer('Capa de patrones 1', tileset1);
    
    this.cursorKeys = this.input.keyboard.createCursorKeys();    
   
    //policias = []; //array
    

    this.player = new Player(this, 300, 900, "guy", this.cursorKeys, 10);

    //POLICIA ==> SPRITE
    this.policia = new Sprites(this, 0, 0, "guy");

    //POLICIA ==> TRIGGER ==> CAMPO DE VISION
    this.campoVision = this.add.zone(0, 0);
    this.campoVision.setSize(400, 400);
    this.physics.world.enable(this.campoVision);
    this.campoVision.body.setAllowGravity(false);
    this.campoVision.body.moves = false;//no queremos moverlo con el poli

    //POLICIA ==> TRIGGER ==> CAMPO AUDITIVO
    this.campoAuditivo = this.add.zone(0, 0);
    this.campoAuditivo.setSize(700, 700);
    this.physics.world.enable(this.campoAuditivo);
    this.campoAuditivo.body.setAllowGravity(false);
    this.campoAuditivo.body.moves = false;//no queremos moverlo con el poli

    //POLICIA CONTAINER ==> OBJETO VACIO al que hago PADRE de los CAMPOS DE VISION & SPRITE
    this.container = new MyContainer(this, 400, 500, 1); 
    this.container.add(this.policia, 0); //los hago hijos    
    this.container.add(this.campoVision, 1);
    this.container.add (this.campoAuditivo, 2);
    
    //va mal? ==> MOVELEFT NO ES UNA FUNCION. HERENCIA PARA QUE MyContainer herede de Person
   // Object.assign(MyContainer.prototype, Persona); //assign entre clases ==> MyContainer puede utilizar persona



    this.cameras.main.startFollow(this.player);
    

    //CIVILES
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

    this.jugadorX = this.player.getX(); //ME GUARDO SU POSICION PORQUE LA NECESITARE
    this.jugadorY = this.player.getY();

    if(this.player.pausa()) this.scene.pause();
    else this.scene.resume(); // no vuelve a cargar la escena


    //this.container.moveLeft(); //NO ES UNA FUNCION
    this.container.update();
    //this.policia.update();


    //PLAYER ESTA DENTRO DEL RANGO AUDITIVO
    if (this.physics.overlap(this.player, this.campoAuditivo)){

      this.civiles.forEach((civil) =>{

        //SI PLAYER CHOCA CON UN CIVIL DENTRO DEL RANGO AUDITIVO DE POLICIA
        if (this.physics.overlap(this.player, civil)){  //HACE RUIDO ==> AVISA A POLICIA
         
          this.container.sospechar(true);
          this.container.calcularDir(this.jugadorX, this.jugadorY);

           console.log("UN LADRON!");
        }

      })



      //PLAYER ESTA DENTRO DEL RANGO DE VISION
      if(this.physics.overlap(this.player, this.campoVision)) { 

        // SI POLICIA CHOCA CON PLAYER
        if (this.physics.overlap(this.player, this.policia)){  //MUERTO
         
          console.log ("MUERTO");
        }
  
        else{ //POLICIA VA A POR PLAYER
                
          this.container.calcularDir(this.jugadorX, this.jugadorY);
  
          this.container.sospechar(true);
  
        }
      }
  
    
    }

    
    //CIVILES
    this.civiles.forEach((civil) =>{     
      civil.update();
    }) 

    
    
  }


}
