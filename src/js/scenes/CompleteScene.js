/* global Phaser:true */
import Constants from '../utils/Constants'

class CompleteScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'CompleteScene'
    })
    // eslint-disable-next-line no-unused-expressions
    this.score
  }

  init (data) {
    console.log('CompleteScene init ', data.SCORE)
    this.score = data.SCORE
  }
  preload () { }

  create () {
    console.log('CompleteScene: created()')

    this.playCompleteSound()

    this.cameras.main.backgroundColor.setTo(76, 175, 80)

    let overText = this.add.text(this.sys.game.config.width / 2 + 70, this.sys.game.config.height / 2 + 50,
      'LEVEL COMPLETE!',
      {
        font: '40px minecraft',
        fill: '#fff'
      })

    let scoreText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2,
      this.score,
      {
        font: '72px minecraft',
        fill: '#000'
      })

    let menuText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'MENU', {
      font: '20px minecraft',
      fill: '#f4fc07'
    }).setInteractive()

    // Input Event listeners
    menuText.on('pointerover', () => { menuText.setTint(0x2bff2b) })
    menuText.on('pointerout', () => { menuText.clearTint() })
    menuText.on('pointerdown', () => { this.startGame() })

    //  Center the texts in the game
    Phaser.Display.Align.In.Center(
      overText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 36, this.sys.game.config.width, this.sys.game.config.height)
    )
    Phaser.Display.Align.In.Center(
      scoreText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 24, this.sys.game.config.width, this.sys.game.config.height)
    )
    Phaser.Display.Align.In.Center(
      menuText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 63, this.sys.game.config.width, this.sys.game.config.height)
    )
  }

  startGame () {
    // audio
    let click = this.sound.add('click')
    click.play()

    this.stopMusic()

    this.scene.start('BootScene')
  }

  stopMusic () {
    this.bgMusic.stop()
    Constants.SOUND_PLAYING = false
  }

  playCompleteSound () {
    if (Constants.SOUND_ON === true && Constants.SOUND_PLAYING === true) {
      this.bgMusic = this.sound.add('level-complete', { volume: 0.8, loop: true })
      this.bgMusic.play()
    }
  }

  update () { }
}

export default CompleteScene
