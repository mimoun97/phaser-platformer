import Phaser from 'phaser'

// images
import wallImg from '../../assets/wall.png'
import groundImg from '../../assets/ground.png'
import playerImg from '../../assets/player.png'
import coinImg from '../../assets/coin.png'
import enemyImg from '../../assets/enemy.png'

// audio
import dustAudio from '../../assets/dust.wav'
class BootScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'BootScene'
    })
  }
  preload () {
    const progress = this.add.graphics()

    // Register a load progress event to show a load bar
    this.load.on('progress', (value) => {
      progress.clear()
      progress.fillStyle(0xffffff, 1)
      progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60)
    })

    // Register a load complete event to launch the title screen when all files are loaded
    this.load.on('complete', () => {
      progress.destroy()
      this.scene.start('GameScene')
    })

    this.load.image('wall', wallImg)
    this.load.image('ground', groundImg)
    this.load.spritesheet('player', playerImg, {
      frameWidth: 28,
      frameHeight: 22
    })

    this.load.audio('dust', dustAudio)

    this.load.image('coin', coinImg)

    this.load.image('enemy', enemyImg)

    // this.load.image("logo", "assets/logo.png");
  }
}

export default BootScene
