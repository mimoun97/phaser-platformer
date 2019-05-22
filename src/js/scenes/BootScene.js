/* global Phaser:true */
// images
import wallImg from '../../assets/img/wall.png'
import groundImg from '../../assets/img/ground.png'
import playerImg from '../../assets/img/player.png'
import coinImg from '../../assets/img/coin.png'
import enemyImg from '../../assets/img/enemy.png'
import rightImg from '../../assets/img/right.png'
import leftImg from '../../assets/img/left.png'
import jumpImg from '../../assets/img/jump.png'

// audio
import dustAudio from '../../assets/audio/dust.wav'
import dustAudioMp3 from '../../assets/audio/dust.mp3'
import clickAudio from '../../assets/audio/click.wav'
import deadAudio from '../../assets/audio/dead.wav'
import deadAudioMp3 from '../../assets/audio/dead.mp3'
import jumpAudio from '../../assets/audio/jump.wav'
import jumpAudioMp3 from '../../assets/audio/jump.mp3'
import coinAudio from '../../assets/audio/coin.wav'
import coinAudioMp3 from '../../assets/audio/coin.mp3'

import Constants from '../utils/Constants'

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
    })

    // load images
    this.load.image('wall', wallImg)
    this.load.image('ground', groundImg)
    this.load.image('coin', coinImg)
    this.load.image('enemy', enemyImg)
    this.load.spritesheet('player', playerImg, {
      frameWidth: 28,
      frameHeight: 22
    })
    // load
    if (Constants.IS_MOBILE === true) {
      this.loadControllers()
    }

    // load audios
    this.load.audio('coin', [ coinAudio, coinAudioMp3 ])
    this.load.audio('dead', [ deadAudio, deadAudioMp3 ])
    this.load.audio('dust', [ dustAudio, dustAudioMp3 ])
    this.load.audio('jump', [ jumpAudio, jumpAudioMp3 ])
    this.load.audio('click', clickAudio)
  }

  loadControllers () {
    this.textures.addBase64('right', rightImg)
    this.textures.addBase64('left', leftImg)
    this.textures.addBase64('jump', jumpImg)
    // this.load.image('right', rightImg)
    // this.load.image('left', lefttImg)
    // this.load.image('jump', jumpImg)
  }

  create () {
    console.log('BootScene: created()')

    var text = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, '2D PLATFORMER', {
      font: '48px minecraft',
      fill: '#ffffff'
    })

    var authorText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'by mimoun1997', {
      font: '28px minecraft',
      fill: '#eee'
    })

    var startText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'START', {
      font: '20px minecraft',
      fill: '#f4fc07'
    }).setInteractive()

    // Input Event listeners
    startText.on('pointerover', () => { startText.setTint(0x2bff2b) })
    startText.on('pointerout', () => { startText.clearTint() })
    startText.on('pointerdown', () => { this.startGame() })

    //  Center the texts in the game
    Phaser.Display.Align.In.Center(
      text,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 36, this.sys.game.config.width, this.sys.game.config.height)
    )
    Phaser.Display.Align.In.Center(
      authorText,
      this.add.zone(this.sys.game.config.width / 2 - 7, this.sys.game.config.height / 2, this.sys.game.config.width, this.sys.game.config.height)
    )
    Phaser.Display.Align.In.Center(
      startText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 40, this.sys.game.config.width, this.sys.game.config.height)
    )
  }

  startGame () {
    // audio
    let click = this.sound.add('click')
    click.play()
    this.scene.start('GameScene')
  }
}

export default BootScene
