<template>
  <div id="game"></div>
</template>
<script>
import Phaser from "phaser";
//images
import wallImg from "../assets/wall.png";
import groundImg from "../assets/ground.png";
import playerImg from "../assets/player.png";
import coinImg from "../assets/coin.png";
import enemyImg from "../assets/enemy.png";

//audio
import dustAudio from "../assets/dust.wav";
let score = 0
let scoreText

function takeCoin(player, coin) {
    //TODO millorar amb una animació
    coin.disableBody(true, true)
    console.log('takeCoin');

    score += 10

    scoreText.setText('Score: '+score)

    //TODO executar so que pertoca 
}

function die(player, enemie) {
    //TODO millorar amb una animació
    player.disableBody(true, true)

    enemie.disableBody(true, true)


    //TODO executar so que pertoca 
}

export default {
  name: "Game",
  mounted() {
    //phaser 3.0 => phaser
    //phaser 2.X => phaser-ce
    let config = {
      type: Phaser.AUTO,
      width: 500,
      height: 200,
      scene: {
        //no hi ha estats sino scenes
        preload: preload,
        create: create,
        update: update
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200 }
        }
      }
    };

    // eslint-disable-next-line
    new Phaser.Game(config);

    function preload() {
      console.log("preload");

      this.load.image("wall", wallImg);
      this.load.image("ground", groundImg);
      this.load.spritesheet("player", playerImg, {
        frameWidth: 28,
        frameHeight: 22
      });

      this.load.audio("dust", dustAudio);

      this.load.image("coin", coinImg);

      this.load.image("enemy", enemyImg);



      //this.load.image("logo", "assets/logo.png");
      
    }

    function create() {
      //this.add.image(400, 300, "logo");
      console.log("created");

      this.cameras.main.backgroundColor.setTo(52, 152, 219);

      this.level = this.physics.add.staticGroup();

      //this.add.image(500/2 - 160, 200/2, 'wall');
      //this.add.image(500/2 + 160, 200/2, 'wall');
      //this.ground = this.physics.add.image(500/2, 200/2 + 30, 'ground');

      this.level.create(500 / 2 - 160, 200 / 2, "wall");
      this.level.create(500 / 2 + 160, 200 / 2, "wall");
      this.level.create(500 / 2, 200 / 2 + 30, "ground");

      this.player = this.physics.add.sprite(500 / 2, 200 / 2 - 50, "player");
      this.player.setCollideWorldBounds(true);
      this.player.setBounce(0.2);

      this.physics.add.collider(this.player, this.level);

      //this.dustSound = this.add.audio('dust', 0.1)
      //cursors
      this.cursors = this.input.keyboard.createCursorKeys();

      //animations
      this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("player", { start: 3, end: 5 }),
        frameRate: 5,
        repeat: -1
      });

      this.coins = this.physics.add.group()
      this.coins.create(140, 200 / 2, "coin");
      this.coins.create(170, 200 / 2, "coin");
      this.coins.create(200, 200 / 2, "coin");

      this.physics.add.collider(this.coins, this.level);
      this.physics.add.overlap(this.player, this.coins, takeCoin, null, this)

      //score 
      scoreText = this.add.text(20, 20, 'score: '+ score, { fontSize: '15px', fill: '#000'})

      this.enemies = this.physics.add.group()
      this.enemies.create(500 / 2 + 120, 200 / 2 - 100, "enemy")
      this.physics.add.collider(this.enemies, this.level);

      this.physics.add.overlap(this.player, this.enemies, die, null, this)


    }

    function update() {
      this.player.anims.play("idle", true);

      if (this.cursors.left.isDown) {
        console.log("left");
        this.player.setVelocityX(-160);
        this.player.setFrame(2);
      } else if (this.cursors.right.isDown) {
        console.log("right");
        this.player.setVelocityX(160);
        this.player.setFrame(1);
      } else {
        this.player.setVelocityX(0);
      }

      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-160);
        this.player.setFrame(3);
      }
    }
  }
};
</script>
