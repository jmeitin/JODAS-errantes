import button from '../UI/buttonF1.js';

export default class fase1 extends Phaser.Scene {
    
    constructor(){
        super({
            key: 'fase1'
        })
        this.numImgs = 5;
        
    }

    preload(){
        // 8var imgArray = new Array();

        // for(i = 0; i < this.numImgs; i++){
        //     imgArray[i] = new Image();
        // }
        // // imgArray[0] = new Image();
        // // imgArray[1] = new Image();
        // // imgArray[2] = new Image();
        // // imgArray[3] = new Image();
        // // imgArray[4] = new Image();

        // imgArray[0].src = '../Imgs/Objetos/bomb.png';
        // imgArray[1].src = '../Imgs/Objetos/capa.png';
        // imgArray[2].src = '../Imgs/Objetos/shotgun1.png';
        // imgArray[3].src = '../Imgs/Objetos/sombrero.png';
        // imgArray[4].src = '../Imgs/Objetos/zapatos.png';

        this.load.image('fondo', '../Imgs/Planks/plank1.png');

        this.load.image('bomba', '../Imgs/Objetos/bomb.png');
        this.load.image('capa', '../Imgs/Objetos/capa.png');
        this.load.image('pistola', '../Imgs/Objetos/shotgun1.png');
        this.load.image('sombrero', '../Imgs/Objetos/sombrero.png');
        this.load.image('zapatos', '../Imgs/Objetos/zapatos.png');

        this.load.image('textbox', '../Imgs/Objetos/textbox.png');
    }

    create(){
        let listaObjetos = ['bomba' , 'capa' , 'pistola' , 'sombrero' , 'zapatos'];          
        let inventario = [];
        
        var fondoScale = 7;//tamaño de los tiles de madera de fondo

        //dividimos entre fondoScale para compensar el tamaño incrementado de los tiles que usamos de fondo y que ocupe el tamaño de la ventana
        var fondo = this.add.tileSprite(0, 0, (this.game.renderer.width/fondoScale), (this.game.renderer.height/fondoScale), 'fondo').setScale(fondoScale);
        fondo.setOrigin(0,0);

        this.colocaBotones();


        
    }

    update(){

    }

    colocaBotones(){
        
        // for(i = 0; i < this.numImgs; i++){

        // }
        //para tener a las imagenes con posiciones relativas
        //var container = this.add.container(this.game.renderer.width/2, this.game.renderer.height/2);
        //var boo = new button(this, 200, 200, 'textbox', 1, 'textbox');
        //this.scene.add.Image(300, 300, )
        var bomba = new button(this, 200, 200, 'bomba', 1, 'textbox');
        
        var capa = new button(this, 700, 200, 'capa', 1, 'textbox');

        var sombrero = new button(this, 1200, 200, 'sombrero', 1, 'textbox');

        var pistola = new button(this, 200, 600, 'pistola', 1, 'textbox');

        var zapatos = new button(this, 700, 600, 'zapatos', 1, 'textbox');

        // container.add(bomba);
        // container.add(capa);
        // container.add(sombrero);
        // container.add(pistola);
        // container.add(zapatos);    
        //var botonBomba = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2,"bomba");
    }
}