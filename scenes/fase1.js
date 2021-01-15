import button from '../ui/button_f1.js';

export default class fase1 extends Phaser.Scene {
    
    constructor(){
        super({
            key: 'fase1'
        })
        this.peso_max = 5;
        this.peso_actual = 0;

        //pesos de objetos
        this.peso_cape = 3;
        this.peso_gun = 1;
        this.peso_shoes = 2;
        this.peso_hat = 3; 
        this.peso_bomb_plus = 1; 
        this.peso_bomb_minus = 1;

        this.inventario = [];

        this.img_peso_actual;

        this.bombaPlus;
    }

    preload(){
        this.peso_actual = 0;
        this.inventario = [];
        
        //cargamos fondo
        this.load.image('fondo', 'imgs/planks/plank1.png');

        //cargamos imagenes de objetos
        this.load.image('bomba_minus', 'imgs/objetos/bomb_minus.png')
        this.load.image('bomba_plus', 'imgs/objetos/bomb.png');
        this.load.image('capa', 'imgs/objetos/capa.png');
        this.load.image('pistola', 'imgs/objetos/shotgun1.png');
        this.load.image('sombrero', 'imgs/objetos/sombrero.png');
        this.load.image('zapatos', 'imgs/objetos/zapatos.png');

        //cargamos imagenes textos de objetos
        this.load.image('texto_bomba+', 'imgs/objetos/obj_txt/text_box_bomb+.png');
        this.load.image('texto_bomba-', 'imgs/objetos/obj_txt/text_box_bomb-.png');
        this.load.image('texto_capa', 'imgs/objetos/obj_txt/text_box_cape.png');
        this.load.image('texto_pistola', 'imgs/objetos/obj_txt/text_box_gun.png');
        this.load.image('texto_sombrero', 'imgs/objetos/obj_txt/text_box_hat.png');
        this.load.image('texto_zapatos', 'imgs/objetos/obj_txt/text_box_shoes.png');
       
        //numeros
        this.load.spritesheet('nums', 'imgs/numeros/numberssheet.png', { frameWidth: 23, frameHeight: 35});
        this.load.image('slash', 'imgs/numeros/slash.png');

        //foto de tutorial
        this.load.image('tutorialf1', 'imgs/tutoriales/tutorialf1.png');

        //boton para continuar
        this.load.image('boton_next', 'imgs/botones/flecha_next.png');
        this.load.audio('soundbutton', 'sounds/seleccion.mp3');
        this.load.audio('soundbutton2', 'sounds/maxobjetos.mp3');
        this.load.audio('soundbutton3', 'sounds/continue.mp3');
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
        this.fondo_scale = 7;//tamaño de los tiles de madera de fondo

        //dividimos entre fondoScale para compensar el tamaño incrementado de los tiles que usamos de fondo y que ocupe el tamaño de la ventana
        this.fondo = this.add.tileSprite(0, 0, (this.game.renderer.width/this.fondo_scale), (this.game.renderer.height/this.fondo_scale), 'fondo').setScale(this.fondo_scale);
        this.fondo.setOrigin(0,0);

        this.crea_numeros();

        this.crea_textos();        

        this.coloca_botones();

        //boton para pasar de fase
        this.boton_next = this.add.image(this.game.renderer.width - 150, this.game.renderer.height - 150, 'boton_next');
        this.boton_next.setInteractive();

        //funcionalidad botonNext
        this.boton_next.on('pointerover', () => { 
            this.boton_next.setScale(1.1);            
        });
        
        this.boton_next.on('pointerout', () => {
            this.boton_next.setScale(1);
        });

        this.boton_next.on("pointerdown", ()=>{
            sound3.play();
            this.scene.start('tutorial_fase2', {inventario:this.inventario}); //fase 2

        });

        //texto de tutorial cuando abres la pagina
        this.tutorialText = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2,'tutorialf1').setScale(2);
        this.tutorialText.setInteractive();

        this.tutorialText.on('pointerdown', () => {
            this.tutorialText.setVisible(false);
        });

        
        
    }

    update(){
        
    }

    crea_textos(){

        this.txtposX = 650;
        this.txtposY = 650;
        this.tbomba_plus = this.add.image(this.txtposX, this.txtposY, 'texto_bomba+').setVisible(false);
        this.tbomba_plus.depth = 1;

        this.tbomba_minus = this.add.image(this.txtposX, this.txtposY, 'texto_bomba-').setVisible(false);
        this.tbomba_minus.depth = 1;

        this.tsombrero = this.add.image(this.txtposX, this.txtposY, 'texto_sombrero').setVisible(false);
        this.tsombrero.depth = 1;       

        this.tpistola = this.add.image(this.txtposX, this.txtposY, 'texto_pistola').setVisible(false);
        this.tpistola.depth = 1;

        this.tzapatos = this.add.image(this.txtposX, this.txtposY, 'texto_zapatos').setVisible(false);
        this.tzapatos.depth = 1;

        this.tcapa = this.add.image(this.txtposX, this.txtposY, 'texto_capa').setVisible(false);
        this.tcapa.depth = 1;
    }

    coloca_botones(){

        this.bomba_plus = new button(this, 400, 350, 'bomba_plus', 1, this.tbomba_plus, this.inventario, this.peso_max,  this.peso_bomb_plus);

        this.bomba_minus = new button(this, 850, 150, 'bomba_minus', 0.6, this.tbomba_minus, this.inventario, this.peso_max,  this.peso_bomb_minus).setScale(0.6);

        this.sombrero = new button(this, 600, 150, 'sombrero', 1, this.tsombrero, this.inventario, this.peso_max, this.peso_hat);

        this.pistola = new button(this, 300, 150, 'pistola', 1, this.tpistola, this.inventario, this.peso_max, this.peso_gun);

        this.zapatos = new button(this, 750, 400, 'zapatos', 1, this.tzapatos, this.inventario, this.peso_max, this.peso_shoes);

        this.capa = new button(this, 1100, 250, 'capa', 1, this.tcapa, this.inventario, this.peso_max, this.peso_cape );
    }

    crea_numeros(){
        this.contenedor_nums = this.add.container(1150, 50).setScale(2);

        this.img_peso_actual = this.add.sprite(-20, 0, 'nums',  this.peso_actual);
        this.slash = this.add.image(0, 0, 'slash');
        this.img_peso_max = this.add.sprite(20, 0, 'nums', this.peso_max);
        
        this.contenedor_nums.add(this.img_peso_actual);
        this.contenedor_nums.add(this.slash);
        this.contenedor_nums.add(this.img_peso_max);
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