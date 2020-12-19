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

        this.imgPesoActual;

        this.bombaPlus;
    }

    preload(){
        //cargamos fondo
        this.load.image('fondo', '../Imgs/Planks/plank1.png');

        //cargamos imagenes de objetos
        this.load.image('bombaMinus', '../Imgs/Objetos/bombMinus.png')
        this.load.image('bombaPlus', '../Imgs/Objetos/bomb.png');
        this.load.image('capa', '../Imgs/Objetos/capa.png');
        this.load.image('pistola', '../Imgs/Objetos/shotgun1.png');
        this.load.image('sombrero', '../Imgs/Objetos/sombrero.png');
        this.load.image('zapatos', '../Imgs/Objetos/zapatos.png');

        //cargamos imagenes textos de objetos
        this.load.image('textoBomba+', '../Imgs/Objetos/ObjTxt/TextBoxBomb+.png');
        this.load.image('textoBomba-', '../Imgs/Objetos/ObjTxt/TextBoxBomb-.png');
        this.load.image('textoCapa', '../Imgs/Objetos/ObjTxt/TextBoxCape.png');
        this.load.image('textoPistola', '../Imgs/Objetos/ObjTxt/TextBoxGun.png');
        this.load.image('textoSombrero', '../Imgs/Objetos/ObjTxt/TextBoxHat.png');
        this.load.image('textoZapatos', '../Imgs/Objetos/ObjTxt/TextBoxShoes.png');
       
        //numeros
        this.load.spritesheet('nums', '../Imgs/Numeros/Numberssheet.png', { frameWidth: 23, frameHeight: 35});
        this.load.image('slash', '../Imgs/Numeros/Slash.png');

        //boton para continuar
        this.load.image('botonNext', '../Imgs/Botones/FlechaNext.png');
    } 

    create(){

        var fondoScale = 7;//tamaño de los tiles de madera de fondo

        //dividimos entre fondoScale para compensar el tamaño incrementado de los tiles que usamos de fondo y que ocupe el tamaño de la ventana
        var fondo = this.add.tileSprite(0, 0, (this.game.renderer.width/fondoScale), (this.game.renderer.height/fondoScale), 'fondo').setScale(fondoScale);
        fondo.setOrigin(0,0);

        this.creaNumeros();

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
            
            this.scene.start('main', {inventario:this.inventario}); //fase 2

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

        var bombaPlus = new button(this, 200, 200, 'bombaPlus', 1, this.TbombaPlus, this.inventario, this.pesoMax, this.pesoBombPlus);

        var bombaMinus = new button(this, 700, 200, 'bombaMinus', 0.6, this.TbombaMinus, this.inventario, this.pesoMax, this.pesoBombMinus).setScale(0.6);

        var sombrero = new button(this, 1200, 200, 'sombrero', 1, this.Tsombrero, this.inventario, this.pesoMax, this.pesoHat);

        var pistola = new button(this, 200, 600, 'pistola', 1, this.Tpistola, this.inventario, this.pesoMax, this.pesoGun);

        var zapatos = new button(this, 700, 600, 'zapatos', 1, this.Tzapatos, this.inventario, this.pesoMax, this.pesoShoes);

        var capa = new button(this, 1200, 600, 'capa', 1, this.Tcapa, this.inventario, this.pesoMax, this.pesoCape);
    }

    creaNumeros(){
        var contenedorNums = this.add.container(1150, 50);

        this.imgPesoActual = this.add.sprite(-20, 0, 'nums', this.pesoActual);
        this.slash = this.add.image(0, 0, 'slash');
        this.imgPesoMax = this.add.sprite(20, 0, 'nums', this.pesoMax);
        
        contenedorNums.add(this.imgPesoActual);
        contenedorNums.add(this.slash);
        contenedorNums.add(this.imgPesoMax);
    }

    devuelvePesoActual(){
        return this.pesoActual;
    }

    setPesoActual(pesoNuevo){
        this.pesoActual = pesoNuevo;
        console.log(this.pesoActual);
        this.imgPesoActual.setFrame(this.pesoActual);
        // = this.add.sprite(1150, 50, 'nums', this.pesoActual);
        console.log(this.inventario);
    }

    setAlfa(gradient, thing){
        this.thing.alfa = gradient;
    }
}