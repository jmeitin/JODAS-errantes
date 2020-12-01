import Civil from "./Personajes/Civil.js";
import Player from "./Personajes/Player.js";
import Policia from "./Personajes/Policia.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {   
    this.load.image('guy', './Imgs/jugador1.png');
    this.load.image('civil', './Imgs/viandante0.png');
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
    this.civiles = [];
    for(let i = 0; i < 10; i++){
      let civil = new Civil(this, 600 + 70 * i, 600, "civil", 1).setScale(3);
      this.civiles.push(civil);
    }

  }

  update(time, delta) {
    console.debug(this.civiles.length);
    this.player.movementManager();
    this.policia.update();
    for(let i = 0; i < 10; i++){
      this.civiles[i].update();
    }
  }


}
