<template>
<div v-cloak>
  <div style="font-family:minecraft; position:absolute; left:-1000px; visibility:hidden;">.</div>
  <h1 style="visibility:hidden;">2D PLATFORMER</h1>
  <div id="game"></div>
</div>
</template>
<script>
import Phaser from 'phaser'
// utils
import Constants from '../js/utils/Constants.js'
// import Resize from '../js/utils/Resize'

// scenes
import GameScene from '../js/scenes/GameScene.js'
import BootScene from '../js/scenes/BootScene.js'
import OverScene from '../js/scenes/OverScene.js'
import CompleteScene from '../js/scenes/CompleteScene.js'

export default {
  name: 'Game',
  mounted () {
    // phaser 3.0 => phaser
    let config = {
      title: Constants.TITLE,
      type: Phaser.AUTO,
      width: Constants.WIDTH,
      height: Constants.HEIGHT,
      backgroundColor: Constants.BG_COLOR,
      scene: [
        // CompleteScene,
        BootScene,
        GameScene,
        OverScene,
        CompleteScene
      ],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 }
        },
        debug: false
      },
      pixelArt: true,
      audio: {
        disableWebAudio: true
      },
      scale: {
        mode: Phaser.DOM.FIT,
        orientation: Phaser.Scale.Orientation.PORTRAIT,
        parent: 'game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: Constants.WIDTH,
        height: Constants.HEIGHT
      }
    }

    const game = new Phaser.Game(config) // eslint-disable-line no-unused-vars

    function resize () {
      let canvas = document.querySelector('canvas')
      let windowWidth = window.innerWidth
      let windowHeight = window.innerHeight
      let windowRatio = windowWidth / windowHeight
      let gameRatio = Constants.WIDTH / Constants.WIDTH

      if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + 'px'
        canvas.style.height = (windowWidth / gameRatio) + 'px'
      } else {
        canvas.style.width = (windowHeight * gameRatio) + 'px'
        canvas.style.height = windowHeight + 'px'
      }
    }

    resize()
    window.addEventListener('resize', resize(), false)
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
    font-size: 2.5em;
    /* color: #3498DB; */
    font-weight: bold;
    font-family: minecraft, Arial, Helvetica, sans-serif;
    /* box-shadow: inset 0 0 0px 1px black; */
    text-shadow: -6px -3px 2px #0000001a;
}
@font-face {
  font-family: "minecraft";
  src: url("../assets/fonts/Minecraft.ttf");
  font-weight: normal;
}
</style>
