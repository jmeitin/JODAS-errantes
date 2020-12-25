import Civil from "./Personajes/NPCs/Civil.js";
import Player from "./Personajes/Player.js";
import Policia from "./Personajes/NPCs/Policia.js";


export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });

    this.contenedorInventario;//para tener todas las imagenes del inventario en un container
    this.activosInventario = [];//guarda que objetos del inventario son activos y cuales pasivos
  }
  
  init (data){
    this.inventario = data.inventario;
  
  }

  preload() {   
    this.load.image('guy', '/Imgs/jugador1.png');
    this.load.image('cop', '/Imgs/poli.png');
    this.load.image('civil', '/Imgs/viandante0.png');
    this.load.tilemapTiledJSON('mapajuego','/Mapas/mapajuego.json');
    this.load.image('tilemapjuego', '/Mapas/tilemapjuego.png');
    this.load.audio('music', ['/music/game.mp3', '/music/game.ogg']);
    this.load.image('Inventory', '/Imgs/Inventario/InventorySlot.png');
    
  }

  create() {
    this.map = this.make.tilemap({
      key: 'mapajuego',
      tileWidth: 96,
      tileHeight: 96
    });
    const tileset1 = this.map.addTilesetImage('tilemap-export96','tilemapjuego');
    this.backgroundLayer = this.map.createStaticLayer('capa1', tileset1);
    this.colisionLayer = this.map.createStaticLayer('colision',tileset1);

    //asignamos si los objetos del inventario son activos o pasivos(true=>activos)
    for(var i = 0; i < this.inventario.length; i++){
      if(this.inventario[i] == 'bombaPlus' || this.inventario[i] == 'bombaMinus' || this.inventario[i] == 'capa' || this.inventario[i] == 'zapatos')//pasivos
      {
        this.activosInventario.push(false);
      }
      else if(this.inventario[i] == 'sombrero' || this.inventario[i] == 'pistola'){
        this.activosInventario.push(true);
      }
    }

    //VARIABLES DE JUEGO
    this.playerX = 300;
    this.playerY = 900;
    this.playerSpeed = 5;
    this.controlPolicialX = 400;
    this.campoVisionX = 800; //A DEFINIR
    this.campoAuditivoX = 1200;  //A DEFINIR

    // MODIFICAMOS LOS CAMPOS DE VISION EN BASE A LO OBJETOS DEL INVENTARIO
    if (this.inventario.includes('bombaPlus')){ //AUMENTA EL RANGO DE VISION DEL POLICIA
      this.campoVisionX += this.campoVisionX * 5/100; //--------------------------------------------------A DEFINIR
      console.log("VEO MEJOR");
    }
    if (this.inventario.includes('bombaMinus')){ //DISMINUYE EL RANGO DE VISION DEL POLICIA
      this.campoVisionX -= this.campoVisionX * 5/100; //--------------------------------------------------A DEFINIR
      console.log("VEO MENOS"); //---
    }
    if (this.inventario.includes('capa')){ //DISMINUYE EL RANGO DE VISION DEL POLICIA
      this.campoVisionX -= this.campoVisionX * 5/100; //--------------------------------------------------A DEFINIR
      console.log("VEO MENOS"); //---
    }

    //MUSICA
    const config = {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
  }; 
    let music=this.sound.add('music', config);
    music.play();   
    
    //Keyboard inputs
    this.cursorKeys = this.input.keyboard.createCursorKeys();    

    this.funcionBotones();
    

    this.player = new Player(this, this.playerX, this.playerY, "guy", this.cursorKeys, this.playerSpeed, this.inventario);  
    this.colisionLayer.setCollisionByProperty({colision: true});
    //POLICIA CONTAINER ==> OBJETO VACIO al que hago PADRE de los CAMPOS DE VISION & SPRITE
    this.policia = new Policia(this, 400, 500, 1, 'cop', this.campoVisionX, this.campoAuditivoX, this.controlPolicialX); 
 
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
    //console.debug(this.civiles.length);

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
         
          //this.policia.sospechar(true);    
          this.policia.calcularDir(this.jugadorX, this.jugadorY);      

          console.log("Quien anda ahi?!");
        }

      })

      if (this.policia.getSospecha()){ //si sospecho, me muevo hacia el
        this.policia.calcularDir(this.jugadorX, this.jugadorY);
      }


      //PLAYER ESTA DENTRO DEL RANGO DE VISION
      if(this.physics.overlap(this.player, this.policia.campoVision)) { 
        this.policia.sospechar(true);//

        

        //CONTROL POLICIAL
        if(this.physics.overlap(this.player, this.policia.controlPolicial)){

          // SI POLICIA CHOCA CON PLAYER
          if (this.physics.overlap(this.player, this.policia.sprite)){  //MUERTO
                //FIN DE JUEGO-------------------------------------------------------------------------------------------------------------------
          
             console.log ("Usted queda ARRESTADO");
             this.player.setSpeed(0); //el player ya no se puede mover
             this.policia.setSpeed(0);

             if (this.player.hasGun()) {
              console.log ("Pues me SUICIDIO");
             }   
          }
  
          else{ //ve a player ==> AQUI IMPORTA LA CAPA / SOMBRERO
            this.policia.calcularDir(this.jugadorX, this.jugadorY); //se mueve a investigar
           
          
            if (this.player.esUnIndividuoSospechoso() && !this.policia.getDescubierto()){ //si le veo malas pintas
              this.policia.descurbrirAPlayer(true); //le descubri
              console.log('ES MALA GENTE. A POR EL');
            }                  
  
          }

        } //control policial

        
        
      } //rango de vision

      //si sospechaba de el, pero no es un individuo sospechoso ==> dejo de sospechar
      else if (this.policia.getSospecha() == true){ //SI ME SALGO QUE ME DEJE DE PERSEGUIR?---------------------
        this.policia.sospechar(false);
          //console.log('Prosiga buen señor');
     } //campo auditivo
  
    
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

  funcionBotones(){
    let lugarInventario;//el hueco del inventario que hemos pulado

    window.addEventListener('keypress', (event)=>{
      if(event.key === '1'){
        lugarInventario = 0;//debido a la posicion de las teclas debe ser 1 menos en todos menos el 0, que sera pos 9
      }
      else if(event.key === '2'){
        lugarInventario = 1;
      }
      else if(event.key === '3'){
        lugarInventario = 2;
      }
      else if(event.key === '4'){
        lugarInventario = 3;
      }
      else if(event.key === '5'){
        lugarInventario = 4;
      }
      else if(event.key === '6'){
        lugarInventario = 5;
      }
      else if(event.key === '7'){
        lugarInventario = 6;
      }
      else if(event.key === '8'){
        lugarInventario = 7;
      }
      else if(event.key === '9'){
        lugarInventario = 8;
      }
      else if(event.key === '0'){
        lugarInventario = 9;
      }

      if(this.activosInventario[lugarInventario] == true){
        //accion de objeto...
        console.log("activo");
      }
    });
  }

}


