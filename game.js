import Player from "./Personajes/Player.js";
import Policia from "./Personajes/Policia.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {   
    this.load.image('guy', './Imgs/jugador1.png');
    // this.load.spritesheet('golem', './Imgs/golem.png',
    // {
    //   frameHeight: 32,
    //   frameWidth:32
    // });
  }

  create() {
    this.add.text(10, 10, "¡Hola, mundo!", { fontColor: 0xffff00 });

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.player = new Player(this, 300, 600, "guy", this.cursorKeys, 10);
    this.policia = new Policia(this, 300, 600, "guy", 0.5);

  }

  update(time, delta) {
    this.player.movementManager();
    this.policia.update();
  }


}
