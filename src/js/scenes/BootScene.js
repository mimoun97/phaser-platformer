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

    let titleText = this.add.text(Constants.WIDTH / 2, Constants.HEIGHT / 2, '2D PLATFORMER', {
      font: '48px minecraft',
      fill: '#ffffff'
    })

    let authorText = this.add.text(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'by mimoun1997', {
      font: '28px minecraft',
      fill: '#eee'
    })

    let startButton = this.add.sprite(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'start').setInteractive()
    startButton.alpha = 0.7

    // Input Event listeners
    startButton.on('pointerover', () => { startButton.alpha = 1 })
    startButton.on('pointerout', () => { startButton.alpha = 0.7 })
    startButton.on('pointerdown', () => { this.startGame() })

    let settingsButton = this.add.sprite(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'settings').setInteractive()
    settingsButton.alpha = 0.7
    // Input Event listeners
    settingsButton.on('pointerover', () => { settingsButton.alpha = 1 })
    settingsButton.on('pointerout', () => { settingsButton.alpha = 0.7 })
    settingsButton.on('pointerdown', () => { this.scene.start('SettingsScene') })

    let fullscreenButton = this.add.image(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'fullscreen').setInteractive()
    fullscreenButton.alpha = 0.7
    fullscreenButton.on('pointerover', () => { fullscreenButton.alpha = 1 })
    fullscreenButton.on('pointerout', () => { fullscreenButton.alpha = 0.7 })
    fullscreenButton.on('pointerdown', () => { this.fullscreen() })

    //  Center the texts in the game
    Phaser.Display.Align.In.Center(
      titleText,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 - 36, Constants.WIDTH, Constants.HEIGHT)
    )
    Phaser.Display.Align.In.Center(
      authorText,
      this.add.zone(Constants.WIDTH / 2 - 7, Constants.HEIGHT / 2, Constants.WIDTH, Constants.HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      settingsButton,
      this.add.zone(Constants.WIDTH / 2 - settingsButton.displayWidth - 40, Constants.HEIGHT / 2 + 50, Constants.WIDTH, Constants.HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      startButton,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 + 50, Constants.WIDTH, Constants.HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      fullscreenButton,
      this.add.zone(Constants.WIDTH / 2 + fullscreenButton.displayWidth + 40, Constants.HEIGHT / 2 + 50, Constants.WIDTH, Constants.HEIGHT)
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
    click.play()
    this.scene.start('GameScene')
  }
}

export default BootScene
