import button from '../UI/buttonF1.js';

export default class fase1 extends Phaser.Scene {
    
    constructor(){
        super({
            key: 'fase1'
        })
        this.numImgs = 5;
        this.pesoMax = 6;
        this.pesoActual = 0;

        //pesos de objetos
        this.pesoCape = 3;
        this.pesoGun = 1;
        this.pesoShoes = 2;
        this.pesoHat = 3; 
        this.pesoBombPlus = 1; 
        this.pesoBombMinus = 1;
        //añadepesobomba

        this.inventario = [];
    }

    preload(){
        // var imgArray = new Array();

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

        //this.load.image('textbox', '../Imgs/Objetos/textbox.png');
        this.load.image('textoBomba+', '../Imgs/Objetos/ObjTxt/TextBoxBomb+.png');
        this.load.image('textoBomba-', '../Imgs/Objetos/ObjTxt/TextBoxBomb-.png');
        this.load.image('textoCapa', '../Imgs/Objetos/ObjTxt/TextBoxCape.png');
        this.load.image('textoPistola', '../Imgs/Objetos/ObjTxt/TextBoxGun.png');
        this.load.image('textoSombrero', '../Imgs/Objetos/ObjTxt/TextBoxHat.png');
        this.load.image('textoZapatos', '../Imgs/Objetos/ObjTxt/TextBoxShoes.png');

        this.load.image('botonNext', '../Imgs/Botones/FlechaNext.png');
    }

    create(){

        var fondoScale = 7;//tamaño de los tiles de madera de fondo

        //dividimos entre fondoScale para compensar el tamaño incrementado de los tiles que usamos de fondo y que ocupe el tamaño de la ventana
        var fondo = this.add.tileSprite(0, 0, (this.game.renderer.width/fondoScale), (this.game.renderer.height/fondoScale), 'fondo').setScale(fondoScale);
        fondo.setOrigin(0,0);

        this.creaTextos();        

        this.colocaBotones();

        //boton para pasar de fase
        var botonNext = this.add.image(this.game.renderer.width - 150, this.game.renderer.height - 150, 'botonNext');
        botonNext.setInteractive();

        //funcionalidad botonNext
        botonNext.on('pointerover', () => { 
            botonNext.setScale(1.1);            
        });
        
        botonNext.on('pointerout', () => {
            botonNext.setScale(1);
        });

        botonNext.on("pointerdown", ()=>{
            
            var theOtherScene = this.scene.start('main');

        });

        
        
    }

    update(){
        
    }

    creaTextos(){
        this.TbombaPlus = this.add.image(200, 400, 'textoBomba+').setVisible(false);
        this.TbombaPlus.depth = 1;

        this.TbombaMinus = this.add.image(700, 400, 'textoBomba-').setVisible(false);
        this.TbombaMinus.depth = 1;

        this.Tsombrero = this.add.image(1200, 400, 'textoSombrero').setVisible(false);
        this.Tsombrero.depth = 1;       

        this.Tpistola = this.add.image(200, 400, 'textoPistola').setVisible(false);
        this.Tpistola.depth = 1;

        this.Tzapatos = this.add.image(700, 400, 'textoZapatos').setVisible(false);
        this.Tzapatos.depth = 1;

        this.Tcapa = this.add.image(1200, 400, 'textoCapa').setVisible(false);
        this.Tcapa.depth = 1;
    }

    colocaBotones(){
        
        // for(i = 0; i < this.numImgs; i++){

        // }
        //para tener a las imagenes con posiciones relativas
        //var container = this.add.container(this.game.renderer.width/2, this.game.renderer.height/2);
        //var boo = new button(this, 200, 200, 'textbox', 1, 'textbox');
        //this.scene.add.Image(300, 300, )
        
        var bombaPlus = new button(this, 200, 200, 'bomba', 1, this.TbombaPlus, this.inventario, this.pesoMax, this.pesoBomb);

        var bombaMinus = new button(this, 700, 200, 'bomba', 0.6, this.TbombaMinus, this.inventario, this.pesoMax, this.pesoBomb).setScale(0.6);

        var sombrero = new button(this, 1200, 200, 'sombrero', 1, this.Tsombrero, this.inventario, this.pesoMax, this.pesoHat);

        var pistola = new button(this, 200, 600, 'pistola', 1, this.Tpistola, this.inventario, this.pesoMax, this.pesoGun);

        var zapatos = new button(this, 700, 600, 'zapatos', 1, this.Tzapatos, this.inventario, this.pesoMax, this.pesoShoes);

        var capa = new button(this, 1200, 600, 'capa', 1, this.Tcapa, this.inventario, this.pesoMax, this.pesoCape);

        // container.add(bomba);
        // container.add(capa);
        // container.add(sombrero);
        // container.add(pistola);
        // container.add(zapatos);    
        //var botonBomba = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2,"bomba");
    }

    devuelvePesoActual(){
        return this.pesoActual;
    }

    setPesoActual(pesoNuevo){
        this.pesoActual = pesoNuevo;
        console.log(this.pesoActual);
        console.log(this.inventario);
    }
}