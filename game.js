import civil from "./personajes/npcs/civil.js";
import player from "./personajes/player.js";
import policia from "./personajes/npcs/policia.js";


export default class game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });

    this.contenedor_inventario;//para tener todas las imagenes del inventario en un container
    //this.indices_objetos_activos = []; //guarda que objetos del inventario son activos y cuales pasivos
    this.objetos_activos = []; //true si el objeto esta activado en ese momento
    this.objetos_activos_activados = []; //si el objeto esta o no activado
  }
  
  init (data){
    this.inventario = data.inventario;
  
  }

  preload() {   
    this.load.image('cop', 'imgs/poli.png');
    this.load.image('civil', 'imgs/viandante0.png');
    this.load.tilemapTiledJSON('mapajuego','mapas/mapajuego.json');
    this.load.image('tilemapjuego', 'mapas/tilemapjuego.png');
    this.load.audio('music', ['music/game.mp3', 'music/game.ogg']);
    this.load.image('inventory', 'imgs/inventario/inventory_slot.png');
    this.load.image('flecha','imgs/flecha_direccion.png');
    this.load.image('img_rango','imgs/indicador_rango.png');
    this.load.image('ex_ama','imgs/exclamacion_amarilla.png');
    this.load.image('ex_roja','imgs/exclamacion_roja.png');

    this.load.spritesheet('player', 'imgs/jugador_spritesheet_ampliado.png', { frameWidth: 150, frameHeight: 150 });
    this.load.spritesheet('police', 'imgs/policeman.png', {frameWidth: 85, frameHeight: 135 });
    
  }

  create() {
    this.map = this.make.tilemap({
      key: 'mapajuego',
      tileWidth: 96,
      tileHeight: 96
    });

    const tileset1 = this.map.addTilesetImage('tilemap-export96','tilemapjuego');
    this.background_layer = this.map.createStaticLayer('capa1', tileset1);
    this.colision_layer = this.map.createStaticLayer('colision',tileset1);
  
    //asignamos si los objetos del inventario son activos o pasivos(true=>activos)
    for(this.i = 0; this.i < this.inventario.length; this.i++){
      if(this.inventario[this.i] == 'bomba_plus' || this.inventario[this.i] == 'bomba_minus' || this.inventario[this.i] == 'capa' || this.inventario[this.i] == 'zapatos')//pasivos
      {
        this.objetos_activos.push(false); //son pasivos
      }
      else if(this.inventario[this.i] == 'sombrero' || this.inventario[this.i] == 'pistola'){
        //this.indices_objetos_activos.push(this.i); 
        //indicamos que inicialmente el objeto activo no esta activado
        //this.j = 0;
        this.objetos_activos_activados[this.i] = false; //misma pose que en el la lista de objetos_activos
        //this.j++;

        this.objetos_activos.push(true);
      }
    }

    //VARIABLES DE JUEGO
    this.player_x = 300;
    this.player_y = 900;
    this.player_speed = 200;
    this.control_policial_x = 400;
    this.campo_vision_x = 800; //A DEFINIR
    this.campo_auditivo_x = 1200;  //A DEFINIR

    // MODIFICAMOS LOS CAMPOS DE VISION EN BASE A LO OBJETOS DEL INVENTARIO
    if (this.inventario.includes('bomba_plus')){ //AUMENTA EL RANGO DE VISION DEL POLICIA
      this.campo_vision_x += this.campo_vision_x * 5/100; //--------------------------------------------------A DEFINIR
      console.log("VEO MEJOR");
    }
    if (this.inventario.includes('bomba_minus')){ //DISMINUYE EL RANGO DE VISION DEL POLICIA
      this.campo_vision_x -= this.campo_vision_x * 5/100; //--------------------------------------------------A DEFINIR
      console.log("VEO MENOS"); //---
    }
    if (this.inventario.includes('capa')){ //DISMINUYE EL RANGO DE VISION DEL POLICIA
      this.campo_vision_x -= this.campo_vision_x * 5/100; //--------------------------------------------------A DEFINIR
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

    this.music=this.sound.add('music', config);
    this.music.play();   
    
    //Keyboard inputs
    this.cursor_keys = this.input.keyboard.createCursorKeys();    

    this.funcion_botones();
    const spawnpoint =this.map.findObject("person", obj => obj.name === "spawnplayer");

    this.flecha = 'flecha';
    this.player = new player(this, spawnpoint.x, spawnpoint.y - 400,  'player', this.cursor_keys, this.player_speed, this.inventario, this.flecha);  
    this.physics.add.collider(this.player, this.colision_layer);
    
    //CIVILES
    const spawnciviles =[
      this.map.findObject("person", obj => obj.name === "spawncivil1"),
      this.map.findObject("person", obj => obj.name === "spawncivil2")
     ];

    this.civiles = []; // constructor(scene, x, y, type, speed, fase3){
    
    for(let i = 0; i < 2; i++){
      for(let j = 0; j < 4; j++){
        let civil_1 = new civil(this, spawnciviles[this.i].x + Math.random(-100, 100), spawnciviles[this.i].y + Math.random(-100, 100), "civil", 100, false);
        this.physics.add.collider(civil_1, this.colision_layer);
        this.civiles.push(civil_1);
      }
    }

    //POLICIA CONTAINER ==> OBJETO VACIO al que hago PADRE de los CAMPOS DE VISION & SPRITE
    const spawnpolice =[
     this.map.findObject("person", obj => obj.name === "spawnpolice1"),
     this.map.findObject("person", obj => obj.name === "spawnpolice2"),
     this.map.findObject("person", obj => obj.name === "spawnpolice3"),
     this.map.findObject("person", obj => obj.name === "spawnpolice4"),
     this.map.findObject("person", obj => obj.name === "spawnpolice5"),
     this.map.findObject("person", obj => obj.name === "spawnpolice6")
    ];
    this.policias=[];
    for(let i = 0; i < 6; i++){
      let police = new policia(this, spawnpolice[i].x, spawnpolice[i].y, 100, 'police', this.campo_vision_x, this.campo_auditivo_x,  this.control_policial_x, this.player, this.civiles, 'img_rango','ex_ama','ex_roja');
      this.physics.add.collider(police, this.colision_layer);
      this.policias.push (police);
    }

    this.colision_layer.setCollisionByProperty({colision: true});   //Si los tiled tienen colision a true, se choca con la pared
    this.cameras.main.startFollow(this.player);    

    

    //CREAMOS INVENTARIO
    this.crea_inventario();

  }

  update(time, delta) {

    this.player.movement_manager();
    
    

    if(this.player.pausa()) {
      this.scene.run('game_menu');
      this.scene.pause();
    }

    //modificamos posicion de inventario
    this.contenedor_inventario.x = this.player.x - 600;
    this.contenedor_inventario.y = this.player.y - 300;
    
  }

  crea_inventario(){
      this.contenedor_inventario = this.add.container(this.player.x - 600, this.player.y - 300);
      console.log(this.inventario.length);
      this.coloca_me_en = 0;
      
      for(this.i = 0; this.i < this.inventario.length; this.i++){
        this.contenedor_inventario.add(this.add.image(this.coloca_me_en, 0, 'inventory'));
        this.contenedor_inventario.add(this.add.image(this.coloca_me_en, 0, this.inventario[this.i]).setScale(0.3));
        
        this.coloca_me_en += 100;

      }

  }

  funcion_botones(){
    window.addEventListener('keypress', (event)=>{

      this.i = event.key - 1; //

      if(this.objetos_activos[this.i] == true){ //es un objeto activo

        if(this.objetos_activos_activados[this.i] == false){ //activamos objeto

          this.objetos_activos_activados[this.i] = true;
          console.log("true");

          if (this.inventario[this.i] =='sombrero'){ 
            this.player.set_sombrero(true);

            this.policias.forEach((police)=>{
              if(!this.physics.overlap(this.player, police.campo_vision)){
                console.log("Te has puesto el sombrero");
  
                if(!police.get_reconoce_sombrero()){
                  police.set_descubierto(false);
                  //this.policia.
                }
  
              }
            })
           
          }
          else if (this.inventario[this.i] =='pistola'){ 
            //ANIMACION - CAMBIO ESCENA
            //----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            console.log("ME PEGO UN TIRO");
          }

        }
        else if(this.objetos_activos_activados[this.i] == true){ //descativamos objeto

          this.objetos_activos_activados[this.i] = false;
          console.log("false");
        

          if (this.inventario[this.i] =='sombrero'){ 
            this.player.set_sombrero(false);
            this.policias.forEach((police)=>{
              if(!this.physics.overlap(this.player, police.campo_vision)){
                console.log("Te has quitado el sombrero");
  
                if(!police.get_reconoce_sin_sombrero()){
                  police.set_descubierto(false);
                }
  
              }
            })
            
          }
        }
        
      }

      //this.i = 0; // 0, 2

      //while (this.i < this.indices_objetos_activos.length && event.key != this.indices_objetos_activos[this.i] + 1 ) this.i++;

      // if (this.i < this.indices_objetos_activos.length){ // ES ACTIVO ==> activar o descativar
      //   if (this.objetos_activados[this.i] == false){
      //     this.objetos_activados[this.i] = true;
      //     console.log("true");

      //     if (this.inventario[this.i] =='sombrero'){ 
      //       this.player.set_sombrero(true);
            
      //       if(!this.physics.overlap(this.player, this.policia.campo_vision)){
      //         console.log("Te has puesto el sombrero");

      //         if(!this.policia.get_reconoce_sombrero()){
      //           this.policia.set_descubierto(false);
      //           //this.policia.
      //         }

      //       }
      //     }
      //     else if (this.inventario[this.i] =='pistola'){ 
      //       //ANIMACION - CAMBIO ESCENA
      //       //----------------------------------------------------------------------------------------------------------------------------------------------------------------------
      //       console.log("ME PEGO UN TIRO");
      //     }
          
      //   }
      //   else{
      //     this.objetos_activados[this.i] = false;
      //     console.log("false");
        

      //     if (this.inventario[this.i] =='sombrero'){ 
      //       this.player.set_sombrero(false);

      //       if(!this.physics.overlap(this.player, this.policia.campo_vision)){
      //         console.log("Te has quitado el sombrero");

      //         if(!this.policia.get_reconoce_sin_sombrero()){
      //           this.policia.set_descubierto(false);
      //         }

      //       }
      //     }
      //   }
      //   console.log (this.inventario[this.i]);
    

      // }
      

    });
  }

  modificar_volumen(cantidad){
    if(this.music.volume + cantidad <= 0) this.music.volume = 0; 
    else this.music.volume += cantidad;
  }

  parar_musica(){
    this.music.stop();
  }
}


