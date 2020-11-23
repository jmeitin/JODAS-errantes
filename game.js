import Persona from "./Personajes/Persona.js"

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {   
    this.load.image('guy', './Imgs/jugador1.png');
    //this.load.spritesheet('guy', './Imgs/golem.png', 80, 111, {frameWidth:16, frameHeight:16});
    //this.load.atlas('guyAtlas', './Imgs/golem.png');
  }

  create() {
    this.add.text(10, 10, "¡Hola, mundo!", { fontColor: 0xffff00 });
    //this.add.image(500, 500, 'guy');

    //this.player = new Persona(100,100,30, 'blue');
    this.player = new Persona(this, 500, 500, "guy");
    //this.player.draw();
    
    //this.input.onDown.
    //this.add.sprite(200, 200, )
    //golem = this.add.sprite(200, 200, 'guyAtlas');

  }

  update(time, delta) {
    this.player.moveLeft();
    this.player.body.setVelocityX(0);
    this.player.body.setVelocityY(0);
  }


}
