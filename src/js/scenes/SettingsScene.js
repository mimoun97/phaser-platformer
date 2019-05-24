/* global Phaser:true */
import Constants from '../utils/Constants'

require('../../assets/img/heart.png')

class SettingsScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'SettingsScene'
    })
  }
  init (data) {
    console.log('SettingsScene init data: ', data)
  }

  preload () {
    this.load.image('back', 'img/back.png')
    this.load.spritesheet('music', 'img/musicButtons.png', { frameWidth: 48, frameHeight: 48 })
  }

  create () {
    console.log('SettingsScene: created()')
    this.titleText = this.add.text(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'SETTINGS', {
      font: '28px minecraft',
      fill: '#ffffff'
    })

    this.addButtons()
  }

  addButtons () {
    this.backButton = this.add.image(Constants.WIDTH / 2, Constants.HEIGHT / 2 + 60, 'back').setInteractive()
    this.backButton.flipX = true
    this.backButton.on('pointerover', () => { this.backButton.alpha = 0.7 })
    this.backButton.on('pointerout', () => { this.backButton.alpha = 1 })
    this.backButton.on('pointerdown', () => { this.scene.start('BootScene') })

    this.musicButton = this.add.image(Constants.WIDTH / 2, Constants.HEIGHT / 2 - 40, 'music').setInteractive()
    this.musicButton.on('pointerover', () => { this.musicButton.alpha = 0.7 })
    this.musicButton.on('pointerout', () => { this.musicButton.alpha = 1 })
    this.musicButton.on('pointerdown', () => { this.switchMusic() })

    Phaser.Display.Align.In.Center(
      this.titleText,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 - 80, Constants.WIDTH, Constants.HEIGHT)
    )
  }

  switchMusic () {
    console.log('MUSIC', Constants.SOUND_ON)
    Constants.SOUND_ON = !Constants.SOUND_ON
    this.musicButton.setFrame( Constants.SOUND_ON ? 1 : 0)
  }
}

export default SettingsScene
