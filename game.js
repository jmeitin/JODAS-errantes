import Persona from "./Personajes/Persona.js"

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {   
    this.load.image('guy', './Imgs/jugador1.png');

  }

  create() {
    this.add.text(10, 10, "¡Hola, mundo!", { fontColor: 0xffff00 });

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.player = new Persona(this, 300, 500, "guy", this.cursorKeys);
    
    

  }

  update(time, delta) {
    //this.player.moveLeft();
    this.player.movementManager();
  }


}
