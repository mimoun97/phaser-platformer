/* global Phaser:true */

class CompleteScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'CompleteScene'
        })
        this.score
    }

    init(data) {
        console.log('CompleteScene init ', data.SCORE)
        this.score = data.SCORE;
    }
    preload() { }

    create() {
        console.log('CompleteScene: created()')

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

        let restartText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'RESTART', {
            font: '20px minecraft',
            fill: '#f4fc07'
        }).setInteractive()

        // Input Event listeners
        restartText.on('pointerover', () => { restartText.setTint(0x2bff2b) })
        restartText.on('pointerout', () => { restartText.clearTint() })
        restartText.on('pointerdown', () => { this.scene.start('GameScene') })

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
            restartText,
            this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 63, this.sys.game.config.width, this.sys.game.config.height)
        )
    }

    update() { }
}

export default CompleteScene
