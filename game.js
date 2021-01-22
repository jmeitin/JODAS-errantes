import civil from "./personajes/npcs/civil.js";
import player from "./personajes/player.js";
import policia from "./personajes/npcs/policia.js";


export default class game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });

    this.contenedor_inventario;//para tener todas las imagenes del inventario en un container
    this.objetos_activos = []; //true si el objeto esta activado en ese momento
    this.objetos_activos_activados = []; //si el objeto esta o no activado
  }
  
  init (data){
    this.inventario = data.inventario;
  
  }

  preload() {   
    this.objetos_activos = [];
    this.objetos_activos_activados = [];

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
      if(this.inventario[this.i] === 'bomba_plus' || this.inventario[this.i] === 'bomba_minus' || this.inventario[this.i] === 'capa' || this.inventario[this.i] === 'zapatos')//pasivos
      {
        this.objetos_activos.push(false); //son pasivos
      }
      else if(this.inventario[this.i] == 'sombrero' || this.inventario[this.i] == 'pistola'){
        this.objetos_activos_activados[this.i] = false; //misma pose que en el la lista de objetos_activos

        this.objetos_activos.push(true);
      }
    }

    //VARIABLES DE JUEGO
    this.player_x = 300;
    this.player_y = 900;
    this.player_speed = 200;
    this.control_policial_x = 240;
    this.campo_vision_x = 480; //A DEFINIR
    this.campo_auditivo_x = 800;  //A DEFINIR
    this.npc_speed = 100;
    this.desfase_inventario_x = 600;
    this.desfase_inventario_y = 300;

    // MODIFICAMOS LOS CAMPOS DE VISION EN BASE A LO OBJETOS DEL INVENTARIO
    if (this.inventario.includes('bomba_plus')){ //AUMENTA EL RANGO DE VISION DEL POLICIA
      this.campo_vision_x += this.campo_vision_x * 10/100; //--------------------------------------------------A DEFINIR
      console.log("VEO MEJOR");
    }
    if (this.inventario.includes('bomba_minus')){ //DISMINUYE EL RANGO DE VISION DEL POLICIA
      this.campo_vision_x -= this.campo_vision_x * 10/100; //--------------------------------------------------A DEFINIR
      console.log("VEO MENOS"); //---
    }
    if (this.inventario.includes('capa')){ //DISMINUYE EL RANGO DE VISION DEL POLICIA
      this.campo_vision_x -= this.campo_vision_x * 10/100; //--------------------------------------------------A DEFINIR
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
    this.pasofase = this.map.findObject("person", obj => obj.name === "finfase"); 
    const spawnpoint =this.map.findObject("person", obj => obj.name === "spawnplayer");

    this.flecha = 'flecha';
    this.player = new player(this, spawnpoint.x, spawnpoint.y,  'player', this.cursor_keys, this.player_speed, this.inventario, this.flecha, this.pasofase.x, this.pasofase.y);  
    this.physics.add.collider(this.player, this.colision_layer);
    
    //CIVILES
    const spawnciviles =[
      this.map.findObject("person", obj => obj.name === "spawncivil1"),
      this.map.findObject("person", obj => obj.name === "spawncivil2"),
      this.map.findObject("person", obj => obj.name === "spawncivil3")
     ];

    this.civiles = []; // constructor(scene, x, y, type, speed, fase3){
    

    for (this.i = 0; this.i < spawnciviles.length; this.i++){
      let civil_1 = new civil(this, spawnciviles[this.i].x, spawnciviles[this.i].y, "civil", this.npc_speed, false, false);
      this.physics.add.collider(civil_1, this.colision_layer);
      this.civiles.push(civil_1);
    }
      

    //POLICIA CONTAINER ==> OBJETO VACIO al que hago PADRE de los CAMPOS DE VISION & SPRITE
    const spawnpolice =[
     this.map.findObject("person", obj => obj.name === "spawnpolice1"),
     this.map.findObject("person", obj => obj.name === "spawnpolice2"),
     this.map.findObject("person", obj => obj.name === "spawnpolice3"),
     this.map.findObject("person", obj => obj.name === "spawnpolice4"),
     this.map.findObject("person", obj => obj.name === "spawnpolice5"),
     this.map.findObject("person", obj => obj.name === "spawnpolice6"),
     this.map.findObject("person", obj => obj.name === "spawnpolice7"),
     this.map.findObject("person", obj => obj.name === "spawnpolice8"),
     this.map.findObject("person", obj => obj.name === "spawnpolice9"),
     this.map.findObject("person", obj => obj.name === "spawnpolice10"),
     this.map.findObject("person", obj => obj.name === "spawnpolice11"),
     this.map.findObject("person", obj => obj.name === "spawnpolice12")
    ];

    this.policias=[];

    for (this.i= 0; this.i < spawnpolice.length; this.i++){
      if (this.i === 0 || this.i === 1 || this.i === 2 || this.i === 5 || this.i === 8){
        let police = new policia(this, spawnpolice[this.i].x, spawnpolice[this.i].y, this.npc_speed, 'police', this.campo_vision_x, this.campo_auditivo_x,  this.control_policial_x, this.player, this.civiles, 'img_rango','ex_ama','ex_roja',false);
        this.physics.add.collider(police, this.colision_layer);
        this.policias.push (police);
        console.log ("new policia");
      }
      else {
        let police = new policia(this, spawnpolice[this.i].x, spawnpolice[this.i].y, this.npc_speed, 'police', this.campo_vision_x, this.campo_auditivo_x,  this.control_policial_x, this.player, this.civiles, 'img_rango','ex_ama','ex_roja',true);
        this.physics.add.collider(police, this.colision_layer);
        this.policias.push (police);
        console.log ("else");
      }
    }



    this.colision_layer.setCollisionByProperty({colision: true});   //Si los tiled tienen colision a true, se choca con la pared
    this.cameras.main.startFollow(this.player);    

    

    //CREAMOS INVENTARIO
    this.crea_inventario();
  }

  //BUCLE DE JUEGO
  update(time, delta) {
    this.player.movement_manager();

    if(this.player.pausa()) {
      this.scene.run('game_menu');
      this.scene.pause();
    }

    this.civiles.forEach((civil_1)=>{ //SI PLAYER CHOCA CON UN CIVIL ==> AVISA A LOS POLICIAS
      if (this.physics.overlap(this.player, civil_1)){
        this.policias.forEach((poli)=>{
          poli.player_choco_con_civil(true);
        })
      }
    })

    //PASO A LA FASE 3
    if(this.player.x >= (this.pasofase.x - 96) && this.player.x <= (this.pasofase.x + 96) && this.player.y >= (this.pasofase.y - 96) && this.player.y <= (this.pasofase.y + 96)){
      this.music.stop();
      this.scene.start('tutorial_fase3', {inventario:this.inventario});
    }

    //modificamos posicion de inventario
    this.contenedor_inventario.x = this.player.x - this.desfase_inventario_x;
    this.contenedor_inventario.y = this.player.y - this.desfase_inventario_y;
    
  }

  crea_inventario(){
      this.contenedor_inventario = this.add.container(this.player.x - this.desfase_inventario_x, this.player.y - this.desfase_inventario_y);
      console.log(this.inventario.length);
      this.coloca_me_en = 0;
      
      for(this.i = 0; this.i < this.inventario.length; this.i++){
        this.contenedor_inventario.add(this.add.image(this.coloca_me_en, 0, 'inventory'));
        this.contenedor_inventario.add(this.add.image(this.coloca_me_en, 0, this.inventario[this.i]).setScale(0.3));
        
        this.coloca_me_en += 100;
      }
  }

  funcion_botones(){

    this.boton_pulsado;

    this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event) => {
      switch(event.code) {
          case 'Digit1':
            this.boton_pulsado = 1;
          break;
          case 'Digit2':
            this.boton_pulsado = 2;
          break;
          case 'Digit3':
            this.boton_pulsado = 3;
          break;
          case 'Digit4':
            this.boton_pulsado = 4;
          break;
          case 'Digit5':
            this.boton_pulsado = 5;
          break;
      }

      this.ejecuta_funcion_boton(this.boton_pulsado);
    });

  }

  ejecuta_funcion_boton(boton_pulsado){
    
    this.i = this.boton_pulsado - 1; 
    console.log(this.objetos_activos[this.i])

      if(this.objetos_activos[this.i] == true){ //es un objeto activo

        if(this.objetos_activos_activados[this.i] == false){ //activamos objeto

          this.objetos_activos_activados[this.i] = true;
          console.log("true");

          if (this.inventario[this.i] =='sombrero'){ 
            this.player.set_sombrero(true);
          }
          else if (this.inventario[this.i] =='pistola'){ 
            this.parar_musica();
            this.game.config.victoria = 2;
            this.scene.start('end_menu');
          }
        }
        else if(this.objetos_activos_activados[this.i] == true){ //descativamos objeto

          this.objetos_activos_activados[this.i] = false;
          console.log("false");
        

          if (this.inventario[this.i] =='sombrero'){ 
            this.player.set_sombrero(false);           
          }
        }
      }

  }

  modificar_volumen(cantidad){
    if(this.music.volume + cantidad <= 0) this.music.volume = 0; 
    else this.music.volume += cantidad;
  }

  parar_musica(){
    this.music.stop();
  }
}


