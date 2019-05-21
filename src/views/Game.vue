<template>
<div v-cloak>
  <div style="font-family:minecraft; position:absolute; left:-1000px; visibility:hidden;">.</div>
  <h1>2D Platformer</h1>
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
        GameScene
      ],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 }
        },
        debug: false
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
  color:#3498DB;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}
@font-face {
  font-family: "minecraft";
  src: url("../assets/Minecraft.ttf");
  font-weight: normal;
}
</style>
