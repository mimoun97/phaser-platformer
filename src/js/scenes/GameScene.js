/* global Phaser:true */

import Constants from '../utils/Constants'

class GameScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'GameScene'
    })
  }
  init (data) {
    console.log('GameScene init data: ', data)
    this.MAX_SCORE = 30 // max lives
    this.score = data.SCORE || 0
    this.lives = 1 // data.LIVES || 3
    this.scoreText = '' + this.score
    this.livesText = '' + this.lives
    // sound and music
    this.soundOn = Constants.SOUND_ON
    this.soundConfig = { mute: false, volume: Constants.VOLUME, rate: 1, detune: 0, seek: 0 }
  }

  preload () {}

  create () {
    console.log('GameScene: created()')
    this.addSounds()
    this.createLevel()
    this.setParticles()

    if (Constants.IS_MOBILE) {
      this.addMobileInputs()
    }
  }

  update () {
    if (this.player) this.player.anims.play('idle', true)

    this.inputs()

    if (this.score === this.MAX_SCORE) {
      if (this.scene.get('BootScene').bgMusic && this.scene.get('BootScene').bgMusic.isPlaying) {
        this.scene.get('BootScene').bgMusic.stop()
      }
      this.transitionTo('CompleteScene', { SCORE: this.score })
    }
  }

  addSounds () {
    this.deadSound = this.sound.add('dead', this.soundConfig)
    this.jumpSound = this.sound.add('jump', this.soundConfig)
    this.dustSound = this.sound.add('dust', this.soundConfig)
    this.coinSound = this.sound.add('coin', this.soundConfig)
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
      console.log('IN THE AIR')
      if (this.hasJumped) {
        console.log('in the ground')
        this.dustSound.play()
        // this.dust.setX(this.player.x)
        // this.dust.setY(this.player.y + 10)
        console.log('DUST: ', this.dust)
        this.dust.emitters.first.emitParticle(15, this.player.x, this.player.y + 10)
        this.exp.emitters.first.emitParticle(5, this.player.x, this.player.y + 10)
      }

      this.hasJumped = false
    }

    if (this.player.body.touching.down) {
      console.log('touching down')
      this.jumps = 2
      this.hasJumped = false
    }

    if (this.cursors.up.isDown && this.jumps > 0) {
      this.jumpPlayer()
      this.jumps--
      console.error('jumps: ', this.jumps)
    }
  }

  transitionTo (scene, data) {
    console.log('transitionTo `{data}`')
    this.scene.start(scene, data)
  }

  jumpPlayer () {
    this.player.setVelocityY(-220)
    this.player.setFrame(3)
    this.hasJumped = true
    this.jumpSound.play()
  }

  takeCoin (player, coin) {
    coin.disableBody(true)
    this.tweens.add({
      targets: coin,
      y: 50,
      scaleX: 0,
      ease: 'Linear',
      duration: 160,
      yoyo: false,
      repeat: 0,
      onStart: () => { console.log('onStart tweens') },
      onComplete: () => { coin.disableBody(true, true) }
    })
    this.updateScore()
    this.coinSound.play()
  }

  die (player, enemy) {
    this.player.setScale(0, 0)
    this.tweens.add({
      targets: player,
      callbackScope: this,
      y: 80,
      scaleX: 1,
      scaleY: 1,
      ease: 'Linear',
      duration: 300,
      yoyo: false,
      repeat: 0,
      onComplete: () => { player.x = 250; player.y = 0 }
    })

    enemy.disableBody(true, true)
    this.cameras.main.shake(300)
    this.deadSound.play()

    // scores & lives
    this.updateLives()

    // no lives? wait to shake and die
    if (this.lives === 0) {
      player.disableBody(true, true)
      this.time.addEvent({
        delay: 300,
        callback: () => { this.gameOver() },
        loop: false,
        repeat: 0
      })
    }
  }

  gameOver () {
    if (this.scene.get('BootScene').bgMusic && this.scene.get('BootScene').bgMusic.isPlaying) {
      this.scene.get('BootScene').bgMusic.stop()
    }
    this.transitionTo('OverScene', { SCORE: this.score })
  }

  updateScore () {
    this.score += 10
    this.scoreText.setText(this.score)
  }

  updateLives () {
    this.lives -= 1
    this.livesText.setText(this.lives)
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

    this.scoreText = this.add.text(0 + 20, 20, this.score, {
      font: '30px minecraft',
      fill: '#f1c40f'
    })

    this.livesText = this.add.text(Constants.WIDTH - 40, 20, this.lives, {
      font: '30px minecraft',
      fill: '#e74c3c'
    })

    this.enemies = this.physics.add.group()
    this.enemies.create(Constants.WIDTH / 2 + 120, Constants.HEIGHT / 2, 'enemy')
    this.physics.add.collider(this.enemies, this.level)

    this.physics.add.overlap(this.player, this.enemies, this.die, null, this)
  }

  addMobileInputs () {
    let controlsY = 60
    this.jumpButton = this.add.image(Constants.WIDTH - 72, Constants.HEIGHT / 2 + controlsY, 'jump').setInteractive()
    this.jumpButton.inputEnabled = true
    this.jumpButton.on('pointerdown', () => { this.jumpPlayer() })
    this.jumpButton.alpha = 0.5
    this.jumpButton.setScale(0.6)

    this.moveLeft = false
    this.moveRight = false

    this.leftButton = this.add.image(0 + 72, Constants.HEIGHT / 2 + controlsY, 'left').setInteractive()
    this.leftButton.inputEnabled = true
    this.leftButton.on('pointerover', () => { this.moveLeft = true })
    this.leftButton.on('pointerout', () => { this.moveLeft = false })
    this.leftButton.on('pointerdown', () => { this.moveLeft = true })
    this.leftButton.on('pointerup', () => { this.moveLeft = false })
    this.leftButton.alpha = 0.5
    this.leftButton.setScale(0.6)

    this.rightButton = this.add.image(0 + 72 * 2, Constants.HEIGHT / 2 + controlsY, 'right').setInteractive()
    this.rightButton.inputEnabled = true
    this.rightButton.on('pointerover', () => { this.moveRight = true })
    this.rightButton.on('pointerout', () => { this.moveRight = false })
    this.rightButton.on('pointerdown', () => { this.moveRight = true })
    this.rightButton.on('pointerup', () => { this.moveRight = false })
    this.rightButton.alpha = 0.5
    this.rightButton.setScale(0.6)
  }

  setParticles () {
    this.dust = this.add.particles('dust')
    this.dust.createEmitter(
      {
        x: this.player.x, // Constants.WIDTH / 2,
        y: this.player.y + 10, // Constants.HEIGHT / 2,
        quantity: { min: 1, max: 1 },
        speedX: { min: -100, max: 100 },
        speedY: { min: -100, max: 100 },
        gravityY: 0,
        gravityX: 0,
        // tint: 0x2bff2b,
        // maxParticles: 20,
        lifespan: 300,
        on: false,
        active: true,
        emitCallback: () => { }
      })

    this.exp = this.add.particles('exp')
    this.exp.createEmitter(
      {
        x: this.player.x, // Constants.WIDTH / 2,
        y: this.player.y + 10, // Constants.HEIGHT / 2,
        quantity: { min: 1, max: 1 },
        speedX: { min: -150, max: 150 },
        speedY: { min: -150, max: 150 },
        gravityY: 0,
        gravityX: 0,
        // maxParticles: 20,
        lifespan: 200,
        on: false,
        active: true,
        emitCallback: () => { }
      })
  }
}

export default GameScene
