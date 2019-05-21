<template>
<div v-cloak>
  <div style="font-family:minecraft; position:absolute; left:-1000px; visibility:hidden;">.</div>
  <h1>2D PLATFORMER</h1>
  <div id="game"></div>
</div>
</template>
<script>
import Phaser from 'phaser'
// utils
import Constants from '../js/utils/Constants.js'

// scenes
import GameScene from '../js/scenes/GameScene.js'
import BootScene from '../js/scenes/BootScene.js'
import OverScene from '../js/scenes/OverScene.js'

export default {
  name: 'Game',
  mounted () {
    // phaser 3.0 => phaser
    let config = {
      title: Constants.TITLE,
      type: Phaser.AUTO,
      width: 500,
      height: 200,
      backgroundColor: Constants.BG_COLOR,
      scene: [
        BootScene,
        GameScene,
        OverScene
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
      }
    }

    const game = new Phaser.Game(config) // eslint-disable-line no-unused-vars
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
  src: url("../assets/Minecraft.ttf");
  font-weight: normal;
}
</style>
