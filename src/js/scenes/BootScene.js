/* global Phaser:true */
// images
import wallImg from '../../assets/img/wall.png'
import groundImg from '../../assets/img/ground.png'
import playerImg from '../../assets/img/player.png'
import coinImg from '../../assets/img/coin.png'
import enemyImg from '../../assets/img/enemy.png'
import dustImg from '../../assets/img/dust.png'
import expImg from '../../assets/img/exp.png'
import heartImg from '../../assets/img/heart.png'

// ui images
import rightImg from '../../assets/img/right.png'
import leftImg from '../../assets/img/left.png'
import jumpImg from '../../assets/img/jump.png'
import settingsImg from '../../assets/img/settings.png'
import startImg from '../../assets/img/start.png'
import fullscreenImg from '../../assets/img/fullscreen.png'

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
  init (data) {
    Constants.IS_MOBILE = this.isMobile()
  }
  preload () {
    const progress = this.add.graphics()

    // Register a load progress event to show a load bar
    this.load.on('progress', (value) => {
      progress.clear()
      progress.fillStyle(0xffffff, 1)
      progress.fillRect(0, Constants.HEIGHT / 2, Constants.WIDTH * value, 60)
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
    this.load.image('dust', dustImg)
    this.load.image('exp', expImg)
    this.textures.addBase64('heart', heartImg)
    this.load.spritesheet('player', playerImg, {
      frameWidth: 28,
      frameHeight: 22
    })
    // load ui
    this.textures.addBase64('settings', settingsImg)
    this.textures.addBase64('start', startImg)
    this.textures.addBase64('fullscreen', fullscreenImg)

    // load
    if (Constants.IS_MOBILE) {
      this.loadControllers()
    }

    // load audios
    this.load.audio('coin', [ coinAudio, coinAudioMp3 ])
    this.load.audio('dead', [ deadAudio, deadAudioMp3 ])
    this.load.audio('dust', [ dustAudio, dustAudioMp3 ])
    this.load.audio('jump', [ jumpAudio, jumpAudioMp3 ])
    this.load.audio('click', clickAudio)
  }

  isMobile () {
    return this.sys.game.device.os.iPhone || this.sys.game.device.os.android || this.sys.game.device.os.iPad ||
    this.sys.game.device.os.windowsPhone
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

    let text = this.add.text(Constants.WIDTH / 2, Constants.HEIGHT / 2, '2D PLATFORMER', {
      font: '48px minecraft',
      fill: '#ffffff'
    })

    let authorText = this.add.text(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'by mimoun1997', {
      font: '28px minecraft',
      fill: '#eee'
    })

    // var startText = this.add.text(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'START', {
    //   font: '20px minecraft',
    //   fill: '#f4fc07'
    // }).setInteractive()
    let startText = this.add.sprite(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'start').setInteractive()
    startText.alpha = 0.7

    // Input Event listeners
    startText.on('pointerover', () => { startText.alpha = 1 })
    startText.on('pointerout', () => { startText.alpha = 0.7 })
    startText.on('pointerdown', () => { this.startGame() })

    let settings = this.add.sprite(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'settings').setInteractive()
    settings.alpha = 0.7
    // Input Event listeners
    settings.on('pointerover', () => { settings.alpha = 1 })
    settings.on('pointerout', () => { settings.alpha = 0.7 })
    settings.on('pointerdown', () => { this.scene.start('SettingsScene') })

    let fullscreen = this.add.image(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'fullscreen').setInteractive()
    fullscreen.on('pointerup', () => { this.fullscreen() })

    //  Center the texts in the game
    Phaser.Display.Align.In.Center(
      text,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 - 36, Constants.WIDTH, Constants.HEIGHT)
    )
    Phaser.Display.Align.In.Center(
      authorText,
      this.add.zone(Constants.WIDTH / 2 - 7, Constants.HEIGHT / 2, Constants.WIDTH, Constants.HEIGHT)
    )
    Phaser.Display.Align.In.Center(
      startText,
      this.add.zone(Constants.WIDTH / 2 + startText.displayWidth / 2 + 20, Constants.HEIGHT / 2 + 40, Constants.WIDTH, Constants.HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      settings,
      this.add.zone(Constants.WIDTH / 2 - settings.displayWidth / 2 - 20, Constants.HEIGHT / 2 + 40, Constants.WIDTH, Constants.HEIGHT)
    )
  }

  fullscreen () {
    console.log(this.sys.game.device)

    let canvas = this.sys.game.canvas
    // let fullscreen = this.sys.game.device.fullscreen

    if (!fullscreen.available) {
      return
    }
    // document.getElementById('game')[fullscreen.request]()
    canvas[fullscreen.request]()

    // window['game']['canvas'][this.sys.game.device.fullscreen.request]()
  }

  startGame () {
    // audio
    let click = this.sound.add('click')
    click.play()
    this.scene.start('GameScene')
  }
}

export default BootScene
