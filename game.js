import Civil from "./Personajes/NPCs/Civil.js";
import Player from "./Personajes/Player.js";
import Policia from "./Personajes/NPCs/Policia.js";
import Persona from "./Personajes/Person.js";
import Sprites from "./Clases/sprites.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });

    this.contenedorInventario;
  }
  
  init (data){
    this.inventario = data.inventario;
  
  }

  preload() {   
    this.load.image('guy', './Imgs/jugador1.png');
    this.load.image('cop', './Imgs/poli.png');
    this.load.image('civil', './Imgs/viandante0.png');
    this.load.tilemapTiledJSON('mapajuego','./Mapas/mapajuego.json');
    this.load.image('tilemapjuego', './Mapas/tilemapjuego.png');
    this.load.audio('music', ['./music/game.mp3', './music/game.ogg']);
    this.load.image('Inventory', './Imgs/Inventario/InventorySlot.png');
    // this.load.spritesheet('golem', './Imgs/golem.png',
    // {
    //   frameHeight: 32,
    //   frameWidth:32
    // });
    
  }

  create() {
    this.map = this.make.tilemap({
      key: 'mapajuego',
      tileWidth: 96,
      tileHeight: 96
    });
    const tileset1 = this.map.addTilesetImage('tilemap-export96','tilemapjuego');
    this.backgroundLayer = this.map.createStaticLayer('Capa de patrones 1', tileset1);

    //VARIABLES DE JUEGO
    this.playerX = 300;
    this.playerY = 900;
    this.playerSpeed = 5;
    this.campoVisionX = 400;
    this.campoAuditivoX = 700;  

    //if (this.inventario.includes(''))

    //Musica
    let music=this.sound.add('music', {loop: true});
    music.play();   
    
    
    this.cursorKeys = this.input.keyboard.createCursorKeys();    

     

    this.player = new Player(this, this.playerX, this.playerY, "guy", this.cursorKeys, this.playerSpeed, this.inventario);  

     //POLICIA CONTAINER ==> OBJETO VACIO al que hago PADRE de los CAMPOS DE VISION & SPRITE
    this.policia = new Policia(this, 400, 500, 1, 'cop', this.campoVisionX, this.campoAuditivoX); 
       
    
    //va mal? ==> MOVELEFT NO ES UNA FUNCION. HERENCIA PARA QUE MyContainer herede de Person
   

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

    //CREAMOS INVENTARIO
    this.creaInventario();

  }

  update(time, delta) {
    console.debug(this.civiles.length);

    this.player.movementManager();

    this.jugadorX = this.player.getX(); //ME GUARDO SU POSICION PORQUE LA NECESITARE
    this.jugadorY = this.player.getY();

    if(this.player.pausa()) this.scene.pause();
    else this.scene.resume(); // no vuelve a cargar la escena


    //this.container.moveLeft(); //NO ES UNA FUNCION
    this.policia.update();




    //PLAYER ESTA DENTRO DEL RANGO AUDITIVO
    if (this.physics.overlap(this.player, this.policia.campoAuditivo)){

      this.civiles.forEach((civil) =>{

        //SI PLAYER CHOCA CON UN CIVIL DENTRO DEL RANGO AUDITIVO DE POLICIA
        if (this.physics.overlap(this.player, civil)){  //HACE RUIDO ==> AVISA A POLICIA
         
          this.policia.sospechar(true);
          this.policia.calcularDir(this.jugadorX, this.jugadorY);

           //console.log("UN LADRON!");
        }

      })



      //PLAYER ESTA DENTRO DEL RANGO DE VISION
      if(this.physics.overlap(this.player, this.policia.campoVision)) { 

        // SI POLICIA CHOCA CON PLAYER
        if (this.physics.overlap(this.player, this.policia.sprite)){  //MUERTO
          //FIN DE JUEGO--------------------------------------------------------------------------------------------------------------------
          
          console.log ("Usted queda ARRESTADO");
          if (this.player.hasGun()) {
            console.log ("Pues me SUICIDIO");
          }
        }
  
        else{ //POLICIA VA A POR PLAYER                
          this.policia.calcularDir(this.jugadorX, this.jugadorY);
  
          this.policia.sospechar(true);//
  
        }
      }
  
    
    }

    

    
    //CIVILES
    this.civiles.forEach((civil) =>{     
      civil.update();
    }) 

    //modificamos posicion de inventario
    this.contenedorInventario.x = this.player.x - 600;
    this.contenedorInventario.y = this.player.y - 300;
    
  }

  creaInventario(){
      this.contenedorInventario = this.add.container(this.player.x - 600, this.player.y - 300);
      console.log(this.inventario.length);
      var colocaMeEn = 0;

      for(var i = 0; i < this.inventario.length; i++){

        this.contenedorInventario.add(this.add.image(colocaMeEn, 0, 'Inventory'));
        this.contenedorInventario.add(this.add.image(colocaMeEn, 0, this.inventario[i]).setScale(0.3));
        
        colocaMeEn += 100;

      }

  }


}
