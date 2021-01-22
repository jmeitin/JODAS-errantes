import Civil from "../personajes/npcs/civil.js";
import Bomba from "../clases/bombaf3.js";
export default class fase3 extends Phaser.Scene {
    
    constructor(){
        super({
            key: 'fase3'
        });
        this.contenedor_inventario;
    }
    init (data){
        this.inventario = data.inventario;
      
      }

    preload(){
        this.load.image('civil', './imgs/viandante0.png');
        this.load.tilemapTiledJSON('mapa_fase3','./mapas/mapa_fase3.json');
        this.load.image('tilemapjuego', './mapas/tilemapjuego.png');
        this.load.audio('music', ['./music/game.mp3', './music/game.ogg']);
        this.load.image('bomba', './imgs/bomba.png');
        this.load.image('carroza', './imgs/carroza.png');
        this.load.image('victoria', './imgs/fondos/victoria.png');
        this.load.image('derrota', './imgs/fondos/derrota.png');
        this.load.image('inventory', 'imgs/inventario/inventory_slot.png');
        this.input.setDefaultCursor('url(../imgs/cursor.png), pointer');
    }

    create(){
        this.map_fase3 = this.make.tilemap({
            key: 'mapa_fase3',
            tileWidth: 96,
            tileHeight: 96
        });
        const tileset1 = this.map_fase3.addTilesetImage('tilemap-export96','tilemapjuego');
        this.backgroundLayer = this.map_fase3.createStaticLayer('capa1', tileset1);

        this.bomba = new Bomba(this, -500, 0, "bomba");
        this.lanzada = false;
        this.fixed = false;
        this.initScale = 1;
        this.crea_inventario();
        if(this.inventario.includes('bomba_plus')){
            this.initScale += 0.25;
        }
        if(this.inventario.includes('bomba_minus')){
            this.initScale -= 0.25; 
        }
        this.scale = this.initScale;
        this.pointer = this.input.activePointer;
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
        this.carroza = new Civil(this, 870, 1020, "carroza", 50, true);
        this.civiles = [];
        for(let i = 0; i < 10; i++){
           for(let j = 0; j < 10; j++){
                if(((i < 3 || i > 6) || (j < 3 || j > 6))){
                    if(i < 2 || i > 7){
                        let civil = new Civil(this, ((Math.random() * 50) - 25) + 600 + 60 * i, ((Math.random() * 50) - 25) + 700 + 70 * j, "civil", (Math.random() + 0.5) * 50, true);
                        this.civiles.push(civil);
                    }
                    else{
                        let civil = new Civil(this, 600 + 60 * i, 700 + 70 * j, "civil", 50,true);
                        this.civiles.push(civil);
                    }
                }
            }
        }
        this.text = this.add.text(0, 0,  'Puntuación: ' + this.game.config.score);
        this.text.setFontSize(50);
        
    }

    update(){
        this.text.setText('Puntuación: ' + this.game.config.score)
        if(!this.fixed && this.pointer.isDown){
            this.bomba.Fix();
            this.fixed = true;
            //this.lanzada = true;
            //game.time.events.add(Phaser.Timer.SECOND, destroyBomb, this)
            //this.input.setDefaultCursor('default, pointer');
        }
        if(this.fixed && !this.lanzada){
            if(this.scale < this.initScale + 0.5){
                this.scale += 0.01;
            }
            else{
                this.scale = this.initScale;
            }
            this.bomba.setScale(this.scale);
            if(!this.pointer.isDown){
                this.lanzada = true;
            }
        }
        this.civiles.forEach((civil) =>{  
            if (this.lanzada === true && this.physics.overlap(this.bomba, civil)){
                console.log(this.score);
                civil.destroy(true);
                this.game.config.score += 10;
            }   
            /*else if(this.lanzada){
                civil.setSpeed(0);
            }*/
            
        })
        if(this.lanzada === true && this.physics.overlap(this.bomba, this.carroza)){
            this.carroza.destroy(true);
            this.game.config.score += 100;
            this.game.config.victoria = 1;
            console.log("carroza morida");
        }
        /*else if(this.lanzada){
            this.carroza.setSpeed(0);
        }*/

        if(this.lanzada){
            this.music.stop();
            this.scene.start('end_menu');
        }
        
    }
    
    crea_inventario(){
        this.contenedor_inventario = this.add.container(100, 100);
        console.log(this.inventario.length);
        this.coloca_me_en = 0;
        
        for(this.i = 0; this.i < this.inventario.length; this.i++){
          this.contenedor_inventario.add(this.add.image(this.coloca_me_en, 0, 'inventory'));
          this.contenedor_inventario.add(this.add.image(this.coloca_me_en, 0, this.inventario[this.i]).setScale(0.3));
          
          this.coloca_me_en += 100;
  
        }
  
    }
}
