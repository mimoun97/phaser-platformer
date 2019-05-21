/* global Phaser:true */
let score = 0
let scoreText

class GameScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'GameScene'
    })
  }
  preload () {

  }

  create () {
    console.log('GameScene: created()')

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
    this.player.setBounce(0.2)

    this.physics.add.collider(this.player, this.level)

    // this.dustSound = this.add.audio('dust', 0.1)
    // cursors
    this.cursors = this.input.keyboard.createCursorKeys()

    // animations
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
      frameRate: 5,
      repeat: -1
    })

    this.coins = this.physics.add.group()
    this.coins.create(140, 200 / 2, 'coin')
    this.coins.create(170, 200 / 2, 'coin')
    this.coins.create(200, 200 / 2, 'coin')

    this.physics.add.collider(this.coins, this.level)
    this.physics.add.overlap(this.player, this.coins, this.takeCoin, null, this)

    // score
    scoreText = this.add.text(20, 20, 'score: ' + score, {
      fontSize: '15px',
      fill: '#000'
    })

    this.enemies = this.physics.add.group()
    this.enemies.create(500 / 2 + 120, 200 / 2 - 100, 'enemy')
    this.physics.add.collider(this.enemies, this.level)

    this.physics.add.overlap(this.player, this.enemies, this.die, null, this)

    this.gameover = this.add
      .text(200 / 2 + 70, 200 / 2, 'GAME OVER', {
        fontSize: '40px',
        fill: '#000'
      })
      .setVisible(false)
  }

  update () {
    this.player.anims.play('idle', true)

    if (this.cursors.left.isDown) {
      console.log('left')
      this.player.setVelocityX(-160)
      this.player.setFrame(2)
    } else if (this.cursors.right.isDown) {
      console.log('right')
      this.player.setVelocityX(160)
      this.player.setFrame(1)
    } else {
      this.player.setVelocityX(0)
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-160)
      this.player.setFrame(3)
    }

    this.cameras.main.on('camerashakestart', () => {
      this.gameover.setVisible(true)
    })

    this.cameras.main.on('camerashakecomplete', () => {
      this.gameover.setVisible(false)
    })
  }

  takeCoin (player, coin) {
    // TODO millorar amb una animació
    coin.disableBody(true, true)
    console.log('takeCoin')

    score += 10

    scoreText.setText('Score: ' + score)

    // TODO executar so que pertoca
  }

  die (player, enemy) {
    // TODO millorar amb una animació
    player.disableBody(true, true)

    enemy.disableBody(true, true)

    // TODO executar so que pertoca

    player.scene.cameras.main.shake(500)
  }
}

export default GameScene
