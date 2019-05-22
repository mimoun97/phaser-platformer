/* global Phaser:true */

import Constants from '../utils/Constants'

class GameScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'GameScene'
    })
    this.score = 0
    this.scoreText = ''
    this.soundOn = true
    this.MAX_SCORE = 30
  }
  init (data) {
    console.log('GameScene init ', this.score)
    this.score = 0

    this.soundConfig = { mute: false, volume: Constants.VOLUME, rate: 1, detune: 0, seek: 0 }
  }

  preload () {}

  create () {
    console.log('GameScene: created()')

    this.createLevel()

    if (Constants.IS_MOBILE === true) {
      this.addMobileInputs()
    }
  }

  update () {
    if (this.player) this.player.anims.play('idle', true)

    this.inputs()

    if (this.score === this.MAX_SCORE) {
      this.transitionTo('CompleteScene', { SCORE: this.score })
    }
  }

  addSounds () {
    this.deadSound = this.add.audio('dead', 0.4)
    this.jumpSound = this.add.audio('jump', 0.4)
    this.dustSound = this.add.audio('dust', 0.4)
    this.coinSound = this.add.audio('coin', 0.4)
  }

  inputs () {
    if (this.cursors.left.isDown || this.moveLeft) {
      this.player.body.velocity.x = -200
      this.player.setFrame(2)
      this.sound.mute = false
    } else if (this.cursors.right.isDown || this.moveRight) {
      this.player.body.velocity.x = 200
      this.player.setFrame(1)
      this.sound.mute = false
    } else {
      this.player.body.velocity.x = 0
      this.player.setFrame(3)
    }

    if (this.player.body.touching.down && this.player.y > 100) {
      if (this.hasJumped) {
        this.dustSound.play()
        this.dust.x = this.player.x
        this.dust.y = this.player.y + 10
        this.dust.start(true, 300, null, 8)
      }

      this.hasJumped = false
    }

    if (this.cursors.up.isDown) {
      this.jumpPlayer()
    }
  }

  transitionTo (scene, data) {
    console.log('transitionTo `{data}`')
    this.scene.start(scene, data)
  }

  jumpPlayer () {
    this.player.setVelocityY(-220)
    this.player.setFrame(3)
    let audio = this.sound.add('jump', this.soundConfig)
    audio.play()
  }

  takeCoin (player, coin) {
    // TODO millorar amb una animació
    coin.disableBody(true, true)

    console.log('takeCoin')

    this.updateScore()

    let audio = this.sound.add('coin', this.soundConfig)
    audio.play()
  }

  die (player, enemy) {
    // TODO millorar amb una animació
    player.disableBody(true, true)

    enemy.disableBody(true, true)

    // TODO executar so que pertoca
    let audio = this.sound.add('dead', this.soundConfig)
    audio.play()

    this.cameras.main.shake(300, 0, false, this.transitionTo('OverScene', { SCORE: this.score }))
  }

  updateScore () {
    this.score += 10
    console.log(this.scoreText)
    this.scoreText.setTint(0x2bff2b)
    this.scoreText.setText(this.score)
    this.scoreText.clearTint()
  }

  createLevel () {
    // this.cameras.main.backgroundColor.setTo(52, 152, 219);

    this.level = this.physics.add.staticGroup()

    // this.add.image(500/2 - 160, 200/2, 'wall');
    // this.add.image(500/2 + 160, 200/2, 'wall');
    // this.ground = this.physics.add.image(500/2, 200/2 + 30, 'ground');

    this.level.create(500 / 2 - 160, 200 / 2, 'wall')
    this.level.create(500 / 2 + 160, 200 / 2, 'wall')
    this.level.create(500 / 2, 200 / 2 + 30, 'ground')

    this.player = this.physics.add.sprite(500 / 2, 200 / 2 - 50, 'player')
    this.player.setCollideWorldBounds(true)
    this.player.body.gravity.y = 600
    this.player.setBounce(0.2)

    this.physics.add.collider(this.player, this.level)

    // cursors
    this.cursors = this.input.keyboard.createCursorKeys()

    this.coins = this.physics.add.group()
    this.coins.create(140, 200 / 2, 'coin')
    this.coins.create(170, 200 / 2, 'coin')
    this.coins.create(200, 200 / 2, 'coin')

    this.physics.add.collider(this.coins, this.level)
    this.physics.add.overlap(this.player, this.coins, this.takeCoin, null, this)

    // animations
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
      frameRate: 5,
      repeat: -1
    })

    this.scoreText = this.add.text(20, 20, this.score, {
      font: '30px minecraft',
      fill: '#ffffff'
    })

    this.enemies = this.physics.add.group()
    this.enemies.create(500 / 2 + 120, 200 / 2 - 100, 'enemy')
    this.physics.add.collider(this.enemies, this.level)

    this.physics.add.overlap(this.player, this.enemies, this.die, null, this)
  }

  addMobileInputs () {
    let controlsY = 60
    this.jumpButton = this.add.image(Constants.WIDTH - 72, Constants.HEIGHT / 2 + controlsY, 'jump').setInteractive()
    this.jumpButton.inputEnabled = true
    this.jumpButton.on('pointerdown', () => { this.jumpPlayer() })

    // this.jumpButton.events.onInputDown.add(this.jumpPlayer, this)
    this.jumpButton.alpha = 0.5

    this.moveLeft = false
    this.moveRight = false

    this.leftButton = this.add.image(0 + 72, Constants.HEIGHT / 2 + controlsY, 'left').setInteractive()
    this.leftButton.inputEnabled = true
    this.leftButton.on('pointerover', () => { this.moveLeft = true })
    this.leftButton.on('pointerout', () => { this.moveLeft = false })
    this.leftButton.on('pointerdown', () => { this.moveLeft = true })
    this.leftButton.on('pointerup', () => { this.moveLeft = false })
    this.leftButton.alpha = 0.5

    this.rightButton = this.add.image(0 + 72 * 2, Constants.HEIGHT / 2 + controlsY, 'right').setInteractive()
    this.rightButton.inputEnabled = true
    this.rightButton.on('pointerover', () => { this.moveRight = true })
    this.rightButton.on('pointerout', () => { this.moveRight = false })
    this.rightButton.on('pointerdown', () => { this.moveRight = true })
    this.rightButton.on('pointerup', () => { this.moveRight = false })
    this.rightButton.alpha = 0.5
  }
}

export default GameScene
