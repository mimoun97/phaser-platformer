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
import settingsButtonImg from '../../assets/img/settings.png'
import startImg from '../../assets/img/start.png'
import fullscreenButtonImg from '../../assets/img/fullscreen.png'
import backButtonImg from '../../assets/img/back.png'
import musicButtonsImg from '../../assets/img/musicButtons.png'

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

class PreloadScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'PreloadScene'
    })
  }
  init (data) {
    console.log('PreloadScene: init()')
    Constants.IS_MOBILE = this.isMobile()
  }
  preload () {
    this.addProgress()

    this.loadGameImages()

    this.loadUiElements()

    this.loadAudios()
  }

  isMobile () {
    return this.sys.game.device.os.iPhone || this.sys.game.device.os.android || this.sys.game.device.os.iPad ||
    this.sys.game.device.os.windowsPhone
  }

  addProgress () {
    let authorText = this.add.text(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'LOADING...', {
      font: '28px minecraft',
      fill: '#eee'
    })

    const rect = this.add.graphics()
    rect.fillRect(0, Constants.HEIGHT / 2, Constants.WIDTH, 60)
    rect.fillStyle(0x55ffff, 1)

    const progress = this.add.graphics()
    // Register a load progress event to show a load bar
    this.load.on('progress', (value) => {
      progress.clear()
      progress.fillStyle(0xffffff, 0.5)
      progress.fillRect(0, Constants.HEIGHT / 2, Constants.WIDTH * value, 60)
    })

    // Register a load complete event to launch the title screen when all files are loaded
    this.load.on('complete', () => {
      progress.destroy()
    })
  }

  loadGameImages () {
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
  }

  loadControllers () {
    this.textures.addBase64('right', rightImg)
    this.textures.addBase64('left', leftImg)
    this.textures.addBase64('jump', jumpImg)
    // this.load.image('right', rightImg)
    // this.load.image('left', lefttImg)
    // this.load.image('jump', jumpImg)
  }

  loadUiElements () {
    // load ui
    this.textures.addBase64('settings', settingsButtonImg)
    this.textures.addBase64('start', startImg)
    this.textures.addBase64('fullscreen', fullscreenButtonImg)
    this.textures.addBase64('back', backButtonImg)
    // this.textures.addBase64('music', musicButtonsImg)
    this.load.spritesheet('music', 'img/musicButtons.png', { frameWidth: 48, frameHeight: 48 })

    if (Constants.IS_MOBILE) {
      this.loadControllers()
    }
  }

  loadAudios () {
    // load audios
    this.load.audio('coin', [ coinAudio, coinAudioMp3 ])
    this.load.audio('dead', [ deadAudio, deadAudioMp3 ])
    this.load.audio('dust', [ dustAudio, dustAudioMp3 ])
    this.load.audio('jump', [ jumpAudio, jumpAudioMp3 ])
    this.load.audio('click', clickAudio)
  }

  create () {
    console.log('PreloadScene: created()')
    this.scene.start('SettingsScene')
    // this.scene.start('BootScene')
  }
}

export default PreloadScene
