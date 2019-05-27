/* global Phaser:true */
import Constants from '../utils/Constants'

// images
const wallImg = './img/wall.png'
const groundImg = './img/ground.png'
const playerImg = './img/player.png'
const coinImg = './img/coin.png'
const enemyImg = './img/enemy.png'
const dustImg = './img/dust.png'
const expImg = './img/exp.png'
const heartImg = './img/heart.png'

// ui images
const rightImg = './img/right.png'
const leftImg = './img/left.png'
const jumpImg = './img/jump.png'
const settingsButtonImg = './img/settings.png'
const startImg = './img/start.png'
const fullscreenButtonImg = './img/fullscreen.png'
const backButtonImg = './img/back.png'
const musicButtonsImg = 'img/musicButtons.png'

// audio
const dustAudio = './audio/dust.wav'
const dustAudioMp3 = './audio/dust.mp3'
const clickAudio = './audio/click.wav'
const deadAudio = './audio/dead.wav'
const deadAudioMp3 = './audio/dead.mp3'
const jumpAudio = './audio/jump.wav'
const jumpAudioMp3 = './audio/jump.mp3'
const coinAudio = './audio/coin.wav'
const coinAudioMp3 = './audio/coin.mp3'

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

    this.authorText = this.add.text(Constants.WIDTH / 2 - 60, Constants.HEIGHT / 2 + 30, 'LOADING...', {
      font: '28px minecraft',
      fill: '#3498DB'
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
    this.load.image('settings', settingsButtonImg)
    this.load.image('start', startImg)
    this.load.image('fullscreen', fullscreenButtonImg)
    this.load.image('back', backButtonImg)
    this.load.spritesheet('music', musicButtonsImg, { frameWidth: 48, frameHeight: 48 })

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
    this.scene.start('BootScene')
  }
}

export default PreloadScene
