/* global Phaser:true */
import Constants from '../utils/Constants'

class BootScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'BootScene'
    })
  }
  create () {
    console.log('BootScene: created()')

    this.titleText = this.add.text(Constants.WIDTH / 2, Constants.HEIGHT / 2, '2D PLATFORMER', {
      font: '48px minecraft',
      fill: '#ffffff'
    })

    this.authorText = this.add.text(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'by mimoun1997', {
      font: '28px minecraft',
      fill: '#eee'
    })

    this.startButton = this.add.sprite(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'start').setInteractive()
    this.startButton.on('pointerover', () => { this.startButton.alpha = 0.7 })
    this.startButton.on('pointerout', () => { this.startButton.alpha = 1 })
    this.startButton.on('pointerdown', () => { this.startGame() })

    this.settingsButton = this.add.sprite(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'settings').setInteractive()
    this.settingsButton.on('pointerover', () => { this.settingsButton.alpha = 0.7 })
    this.settingsButton.on('pointerout', () => { this.settingsButton.alpha = 1 })
    this.settingsButton.on('pointerdown', () => { this.scene.start('SettingsScene') })

    this.fullscreenButton = this.add.image(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'fullscreen').setInteractive()
    this.fullscreenButton.on('pointerover', () => { this.fullscreenButton.alpha = 0.7 })
    this.fullscreenButton.on('pointerout', () => { this.fullscreenButton.alpha = 1 })
    this.fullscreenButton.on('pointerdown', () => { this.fullscreen() })

    //  Center the texts in the game
    Phaser.Display.Align.In.Center(
      this.titleText,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 - 36, Constants.WIDTH, Constants.HEIGHT)
    )
    Phaser.Display.Align.In.Center(
      this.authorText,
      this.add.zone(Constants.WIDTH / 2 - 7, Constants.HEIGHT / 2, Constants.WIDTH, Constants.HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.settingsButton,
      this.add.zone(Constants.WIDTH / 2 - this.settingsButton.displayWidth - 40, Constants.HEIGHT / 2 + 50, Constants.WIDTH, Constants.HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.startButton,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 + 50, Constants.WIDTH, Constants.HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.fullscreenButton,
      this.add.zone(Constants.WIDTH / 2 + this.fullscreenButton.displayWidth + 40, Constants.HEIGHT / 2 + 50, Constants.WIDTH, Constants.HEIGHT)
    )
  }

  fullscreen () {
    // TODO fullscreen 800x600?
    // if (this.scale.isfullscreen) {
    //   console.log('IS_fullscreen')
    //   this.scale.stopfullscreen()
    //   // On stop fulll screen
    // } else {
    //   console.log('START fullscreen')
    //   this.scale.startfullscreen()
    //   // On start fulll screen
    // }
  }

  startGame () {
    // audio
    let click = this.sound.add('click')
    if (Constants.IS_MOBILE) { click.play() }
    this.scene.start('GameScene')
  }
}

export default BootScene
