import civil from "./personajes/npcs/civil.js";
import player from "./personajes/player.js";
import policia from "./personajes/npcs/policia.js";


export default class game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });

    this.contenedor_inventario;//para tener todas las imagenes del inventario en un container
    this.indices_objetos_activos = []; //guarda que objetos del inventario son activos y cuales pasivos
    this.objetos_activados = []; //true si el objeto esta activado en ese momento

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

    this.load.spritesheet('player', 'imgs/jugador_spritesheet.png', { frameWidth: 150, frameHeight: 150 });
    this.load.spritesheet('zapatillas', 'imgs/zapatillas_spritesheet.png', { frameWidth: 150, frameHeight: 150 });
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

    this.sprite_player ='player';
    if (this.inventario.includes('zapatos')) this.sprite_player = 'zapatillas';

    //asignamos si los objetos del inventario son activos o pasivos(true=>activos)
    for(this.i = 0; this.i < this.inventario.length; this.i++){
      if(this.inventario[this.i] == 'bomba_plus' || this.inventario[this.i] == 'bomba_minus' || this.inventario[this.i] == 'capa' || this.inventario[this.i] == 'zapatos')//pasivos
      {
        this.objetos_activados.push(true); //son pasivos
      }
      else if(this.inventario[this.i] == 'sombrero' || this.inventario[this.i] == 'pistola'){
        this.indices_objetos_activos.push(this.i); // sombreo bomba plus  pistola ==> 0, 2
        this.objetos_activados.push(false);
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
    

    this.player = new player(this, this.player_x, this.player_y,  this.sprite_player, this.cursor_keys, this.player_speed, this.inventario);  
    this.colision_layer.setCollisionByProperty({colision: true});
    //POLICIA CONTAINER ==> OBJETO VACIO al que hago PADRE de los CAMPOS DE VISION & SPRITE
    this.policia = new policia(this, 400, 500, 1, 'police', this.campo_vision_x, this.campo_auditivo_x,  this.control_policial_x); 

    this.cameras.main.startFollow(this.player);    

    //CIVILES
    this.civiles = [];
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 10; j++){
        if(((i < 3 || i > 6) || (j < 3 || j > 6))){
          if(i < 2 || i > 7){
            let civil_1 = new civil(this, ((Math.random() * 50) - 25) + 600 + 60 * i, ((Math.random() * 50) - 25) + 500 + 70 * j, "civil", 100);
            this.civiles.push(civil_1);
          }
          else{
            let civil_1 = new civil(this, 600 + 60 * i, 500 + 70 * j, "civil", 100);
            this.civiles.push(civil_1);
          }
        }
      }
    }

    //CREAMOS INVENTARIO
    this.crea_inventario();

  }

  update(time, delta) {

    this.player.movement_manager();
    if(this.player.pausa()) {
      this.scene.run('game_menu');
      this.scene.pause();
    }

    this.jugador_x = this.player.get_x(); //ME GUARDO SU POSICION PORQUE LA NECESITARE
    this.jugador_y = this.player.get_y();

    //PLAYER ESTA DENTRO DEL RANGO AUDITIVO
    if (this.physics.overlap(this.player, this.policia.campo_auditivo)){

      this.civiles.forEach((civil) =>{

        //SI PLAYER CHOCA CON UN CIVIL DENTRO DEL RANGO AUDITIVO DE POLICIA
        if (this.physics.overlap(this.player, civil)){  //HACE RUIDO ==> AVISA A POLICIA
         
          //this.policia.sospechar(true);    
          this.policia.calcular_dir(this.jugador_x, this.jugador_y);      

         // console.log("Quien anda ahi?!");
        }

      })

      // if (this.policia.get_sospecha()){ //si sospecho, me muevo hacia el
      //   this.policia.calcular_dir(this.jugador_x, this.jugador_y);
      // }


      //PLAYER ESTA DENTRO DEL RANGO DE VISION
      if(this.physics.overlap(this.player, this.policia.campo_vision)) { 
        //this.policia.sospechar(true);

        //si te conoce va rapido, si no lento
        this.policia.calcular_dir(this.jugador_x, this.jugador_y); 

        

        //CONTROL POLICIAL
        if(this.physics.overlap(this.player,  this.policia.control_policial)){
          console.log('CONTROL POLICIAL');
          //el policia descubre que eres terrorista

          // SI POLICIA CHOCA CON PLAYER
          if (this.physics.overlap(this.player, this.policia)){  //MUERTO
                //FIN DE JUEGO-------------------------------------------------------------------------------------------------------------------
          
             console.log ("Usted queda ARRESTADO");
             this.player.set_speed(0); //el player ya no se puede mover
             this.policia.set_speed(0);

             if (this.player.has_gun()) {
              console.log ("Pues me SUICIDIO");
             }   
          }
  
          // else{ //ve a player ==> AQUI IMPORTA LA CAPA / SOMBRERO
          //   this.policia.calcular_dir(this.jugador_x, this.jugador_y); //se mueve a investigar
           
          
          //   if (this.player.es_un_individuo_sospechoso() && !this.policia.get_descubierto()){ //si le veo malas pintas
          //     this.policia.descurbrir_player(true); //le descubri
          //     console.log('ES MALA GENTE. A POR EL');
          //   }                  
  
          // }

        } //control policial

        
        
      } //rango de vision

      //si sospechaba de el, pero no es un individuo sospechoso ==> dejo de sospechar
    //   else if (this.policia.get_sospecha() == true){ //SI ME SALGO QUE ME DEJE DE PERSEGUIR?---------------------
    //     this.policia.sospechar(false);
    //       //console.log('Prosiga buen señor');
    //  } //campo auditivo
  
    
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

      this.i = 0; // 0, 2
      while (this.i < this.indices_objetos_activos.length && event.key != this.indices_objetos_activos[this.i] + 1 ) this.i++;

      if (this.i < this.indices_objetos_activos.length){ // ES ACTIVO ==> activar o descativar
        if (this.objetos_activados[this.i] == false){
          this.objetos_activados[this.i] = true;
          console.log("true");

          if (this.inventario[this.i] =='sombrero'){ 
            //this.player.poner_sombrero();
            console.log("Te has puesto el sombrero");
          }
          else if (this.inventario[this.i] =='pistola'){ 
            //ANIMACION - CAMBIO ESCENA
            //----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            console.log("ME PEGO UN TIRO");
          }
          
        }
        else{
          this.objetos_activados[this.i] = false;
          console.log("false");
        

          if (this.inventario[this.i] =='sombrero'){ 
            //this.player.poner_sombrero();
            console.log("Te has quitado el sombrero");
          }
          


        }
        console.log (this.inventario[this.i]);
    

      }
      

    });
  }

  modificar_volumen(cantidad){
    if(this.music.volume + cantidad <= 0) this.music.volume = 0; 
    else this.music.volume += cantidad;
  }

  parar_musica(){
    this.music.loop = false;
  }
}


