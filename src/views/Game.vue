<template>
  <div id="game"></div>
</template>
<script>
import Phaser from 'phaser'
//images
import wallImg from '../assets/wall.png'
import groundImg from '../assets/ground.png'
import playerImg from '../assets/player.png'

//audio
import dustAudio from '../assets/dust.wav'


export default {
  name: "Game",
  mounted() {
      //phaser 3.0 => phaser
      //phaser 2.X => phaser-ce
    let config = {
      type: Phaser.AUTO,
      width: 500,
      height: 200,
      scene: { //no hi ha estats sino scenes
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
    }

    // eslint-disable-next-line
    new Phaser.Game(config)

    function preload () {
      console.log('preload')

      this.load.image('wall', wallImg)
      this.load.image('ground', groundImg)
      this.load.spritesheet('player', playerImg, {frameWidth: 28, frameHeight: 22})

      this.load.audio('dust', dustAudio);      

      //this.load.image("logo", "assets/logo.png");
    }

    function create () {
      //this.add.image(400, 300, "logo");
      console.log('created')

      this.cameras.main.backgroundColor.setTo(52, 152, 219)

      this.level = this.physics.add.staticGroup()

      //this.add.image(500/2 - 160, 200/2, 'wall');
      //this.add.image(500/2 + 160, 200/2, 'wall');
      //this.ground = this.physics.add.image(500/2, 200/2 + 30, 'ground');

      this.level.create(500/2 - 160, 200/2, 'wall')
      this.level.create(500/2 + 160, 200/2, 'wall')
      this.level.create(500/2, 200/2 + 30, 'ground')

      this.player = this.physics.add.sprite(500/2, 200/2 - 50,   'player');
      this.player.setCollideWorldBounds(true);
      this.player.setBounce(0.2);

      this.physics.add.collider(this.player, this.level)


      //this.dustSound = this.add.audio('dust', 0.1)
      //cursors
      this.cursors = this.input.keyboard.createCursorKeys()


      //animations
      this.anims.create({
          key: 'idle',
          frames: this.anims.generateFrameNumbers('player', {start, end}),
          
      })
    }

    function update () {
        if (this.cursors.left.isDown) {
            console.log('left')
            this.player.setVelocityX(-160)
            this.player.setFrame(1)
        }
        else if (this.cursors.right.isDown) {
            console.log('right')
            this.player.setVelocityX(160)
            this.player.setFrame(2)
        }
        else {
            this.player.setVelocityX(0)
        }


        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-160)
            this.player.setFrame(3)
        }

    }
  }
}
</script>
