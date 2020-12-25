import button from '../ui/button_f1.js';

export default class fase1 extends Phaser.Scene {
    
    constructor(){
        super({
            key: 'fase1'
        })
        this.num_imgs = 5;
        this.peso_max = 5;
        this.peso_actual = 0;

        //pesos de objetos
        this.peso_cape = 3;
        this.peso_gun = 1;
        this.peso_shoes = 2;
        this.peso_hat = 3; 
        this.peso_bomb_plus = 1; 
        this.peso_bomb_minus = 1;
        //añadepesobomba

        this.inventario = [];

        this.img_peso_actual;

        this.bombaPlus;
    }

    preload(){
        //cargamos fondo
        this.load.image('fondo', '../imgs/planks/plank1.png');

        //cargamos imagenes de objetos
        this.load.image('bomba_minus', '../imgs/objetos/bomb_minus.png')
        this.load.image('bomba_plus', '../imgs/objetos/bomb.png');
        this.load.image('capa', '../imgs/objetos/capa.png');
        this.load.image('pistola', '../imgs/objetos/shotgun1.png');
        this.load.image('sombrero', '../imgs/objetos/sombrero.png');
        this.load.image('zapatos', '../imgs/objetos/zapatos.png');

        //cargamos imagenes textos de objetos
        this.load.image('texto_bomba+', '../imgs/objetos/obj_txt/text_box_bomb+.png');
        this.load.image('texto_bomba-', '../imgs/objetos/obj_txt/text_box_bomb-.png');
        this.load.image('texto_capa', '../imgs/objetos/obj_txt/text_box_cape.png');
        this.load.image('texto_pistola', '../imgs/objetos/obj_txt/text_box_gun.png');
        this.load.image('texto_sombrero', '../imgs/objetos/obj_txt/text_box_hat.png');
        this.load.image('texto_zapatos', '../imgs/objetos/obj_txt/text_box_shoes.png');
       
        //numeros
        this.load.spritesheet('nums', '../imgs/numeros/numberssheet.png', { frameWidth: 23, frameHeight: 35});
        this.load.image('slash', '../imgs/numeros/slash.png');

        //boton para continuar
        this.load.image('boton_next', '../imgs/botones/flecha_next.png');
        this.load.audio('soundbutton', '../sounds/seleccion.mp3');
        this.load.audio('soundbutton2', '../sounds/maxobjetos.mp3');
        this.load.audio('soundbutton3', '../sounds/continue.mp3');
    } 

    create(){
        const config = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }; 
          let sound1=this.sound.add('soundbutton', config);
          let sound2=this.sound.add('soundbutton2', config);
          let sound3=this.sound.add('soundbutton3', config);
        var fondo_scale = 7;//tamaño de los tiles de madera de fondo

        //dividimos entre fondoScale para compensar el tamaño incrementado de los tiles que usamos de fondo y que ocupe el tamaño de la ventana
        var fondo = this.add.tileSprite(0, 0, (this.game.renderer.width/fondo_scale), (this.game.renderer.height/fondo_scale), 'fondo').setScale(fondo_scale);
        fondo.setOrigin(0,0);

        this.crea_numeros();

        this.crea_textos();        

        this.coloca_botones();

        //boton para pasar de fase
        var boton_next = this.add.image(this.game.renderer.width - 150, this.game.renderer.height - 150, 'boton_next');
        boton_next.setInteractive();

        //funcionalidad botonNext
        boton_next.on('pointerover', () => { 
            boton_next.setScale(1.1);            
        });
        
        boton_next.on('pointerout', () => {
            boton_next.setScale(1);
        });

        boton_next.on("pointerdown", ()=>{
            sound3.play();
            this.scene.start('main', {inventario:this.inventario}); //fase 2

        });

        
        
    }

    update(){
        
    }

    crea_textos(){
        this.tbomba_plus = this.add.image(200, 400, 'texto_bomba+').setVisible(false);
        this.tbomba_plus.depth = 1;

        this.tbomba_minus = this.add.image(700, 400, 'texto_bomba-').setVisible(false);
        this.tbomba_minus.depth = 1;

        this.tsombrero = this.add.image(1200, 400, 'texto_sombrero').setVisible(false);
        this.tsombrero.depth = 1;       

        this.tpistola = this.add.image(200, 400, 'texto_pistola').setVisible(false);
        this.tpistola.depth = 1;

        this.tzapatos = this.add.image(700, 400, 'texto_zapatos').setVisible(false);
        this.tzapatos.depth = 1;

        this.tcapa = this.add.image(1200, 400, 'texto_capa').setVisible(false);
        this.tcapa.depth = 1;
    }

    coloca_botones(){

        var bomba_plus = new button(this, 200, 200, 'bomba_plus', 1, this.tbomba_plus, this.inventario, this.peso_max,  this.peso_bomb_plus);

        var bomba_minus = new button(this, 700, 200, 'bomba_minus', 0.6, this.tbomba_minus, this.inventario, this.peso_max,  this.peso_bomb_minus).setScale(0.6);

        var sombrero = new button(this, 1200, 200, 'sombrero', 1, this.tsombrero, this.inventario, this.peso_max, this.peso_shoes);

        var pistola = new button(this, 200, 600, 'pistola', 1, this.tpistola, this.inventario, this.peso_max, this.peso_gun);

        var zapatos = new button(this, 700, 600, 'zapatos', 1, this.tzapatos, this.inventario, this.peso_max, this.peso_shoes);

        var capa = new button(this, 1200, 600, 'capa', 1, this.tcapa, this.inventario, this.peso_max, this.peso_cape );
    }

    crea_numeros(){
        var contenedorNums = this.add.container(1150, 50);

        this.img_peso_actual = this.add.sprite(-20, 0, 'nums',  this.peso_actual);
        this.slash = this.add.image(0, 0, 'slash');
        this.img_peso_max = this.add.sprite(20, 0, 'nums', this.peso_max);
        
        contenedorNums.add(this.img_peso_actual);
        contenedorNums.add(this.slash);
        contenedorNums.add(this.img_peso_max);
    }

    devuelve_peso_actual(){
        return  this.peso_actual;
    }

    set_peso_actual(peso_nuevo){
        this.peso_actual = peso_nuevo;
        console.log( this.peso_actual);
        this.img_peso_actual.setFrame( this.peso_actual);
        // = this.add.sprite(1150, 50, 'nums', this.pesoActual);
        console.log(this.inventario);
    }
}