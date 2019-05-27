/* eslint-disable */
/* global Phaser:true */

class BasicButton extends Phaser.GameObjects.Sprite {
  constructor (config) {
    // check if config contains a scene
    if (!config.scene) {
      console.log('missing scene')
      return
    }
    // check if config contains a key
    if (!config.key) {
      console.log('missing key!')
      return
    }
    super(config.scene, 0, 0, config.key, config.up)
  }

  onOff () {
    	this.setFrame(this.config.on)
  }
  onOn () {
    	this.setFrame(this.config.off)
  }
}

export default BasicButton
