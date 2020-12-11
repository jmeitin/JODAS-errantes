import button from '../UI/button.js';

export default class fase1 extends Phaser.Scene {
    
    constructor(){
        super({
            key: 'fase1'
        })
        this.numImgs = 5;
    }

    preload(){
        this.load.image('fondo', '../Imgs/Planks/plank1.png');

        this.load.image('bomba', '../Imgs/Objetos/bomb.png');
        this.load.image('capa', '../Imgs/Objetos/capa.png');
        this.load.image('pistola', '../Imgs/Objetos/shotgun1.png');
        this.load.image('sombrero', '../Imgs/Objetos/sombrero.png');
        this.load.image('zapatos', '../Imgs/Objetos/zapatos.png');
    }

    create(){
        var fondoScale = 7;//tamaño de los tiles de madera de fondo

        //dividimos entre fondoScale para compensar el tamaño incrementado de los tiles que usamos de fondo y que ocupe el tamaño de la ventana
        var fondo = this.add.tileSprite(0, 0, (this.game.renderer.width/fondoScale), (this.game.renderer.height/fondoScale), 'fondo').setScale(fondoScale);
        fondo.setOrigin(0,0);

        this.colocaImgs();


        
    }

    update(){

    }

    colocaImgs(){
        
        //para tener a las imagenes con posiciones relativas
        var container = this.add.container(this.game.renderer.width/2, this.game.renderer.height/2);
        
        var bomba = new button(this, -this.game.renderer.width/2 + 200, -this.game.renderer.height/2 + 200, 'bomba', 4);
        
        var capa = new button(this, 0, -200, 'capa', 7);

        container.add(bomba);
        container.add(capa);
        //var botonBomba = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2,"bomba");
    }
}