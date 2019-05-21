/* global Phaser:true */

class OverScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'OverScene'
    })
    this.score = 45
  }
  preload () {}

  create () {
    console.log('OverScene: created()')

    this.cameras.main.backgroundColor.setTo(120, 120, 120)

    let overText = this.add.text(this.sys.game.config.width / 2 + 70, this.sys.game.config.height / 2 + 50,
        'GAME OVER',
        {
            font: '40px minecraft',
            fill: '#fff'
        })

    let scoreText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2,
      this.score,
      {
        font: '72px minecraft',
        fill: '#fff'
      })

      //  Center the texts in the game
    Phaser.Display.Align.In.Center(
        overText,
        this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 36, this.sys.game.config.width, this.sys.game.config.height)
      )
    Phaser.Display.Align.In.Center(
        scoreText,
        this.add.zone(this.sys.game.config.width / 2 - 7, this.sys.game.config.height / 2 + 24, this.sys.game.config.width, this.sys.game.config.height)
      )
  }

  update () {}

  getRandomRgb() {
    return Math.floor(Math.random() * 256)
  }
}

export default OverScene
