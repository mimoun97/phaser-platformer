<template>
<div v-cloak>
  <div style="font-family:minecraft; position:absolute; left:-1000px; visibility:hidden;">.</div>
  <h1>2D PLATFORMER</h1>
  <div id="game" style="overflow: hidden;width: 100%;height: 100%;"></div>
</div>
</template>
<script>
import Phaser from 'phaser'
// utils
import Constants from '../js/utils/Constants'
// import Resize from '../js/utils/Resize'

// scenes
import GameScene from '../js/scenes/GameScene'
import BootScene from '../js/scenes/BootScene'
import OverScene from '../js/scenes/OverScene'
import CompleteScene from '../js/scenes/CompleteScene'
import SettingsScene from '../js/scenes/SettingsScene'
import PreloadScene from '../js/scenes/PreloadScene'

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
        SettingsScene,
        PreloadScene,
        BootScene,
        GameScene,
        OverScene,
        CompleteScene,
        // SettingsScene
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
        mode: Phaser.Scale.FIT,
        parent: 'game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: Constants.WIDTH,
        height: Constants.HEIGHT
      },
      loader: {
        baseURL: 'assets'
      },
      url: 'https://phaser-platformer-mimoun1997.netlify.com/'
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
    visibility:hidden; /* de moment no mostrar */
}
@font-face {
  font-family: "minecraft";
  src: url("../assets/fonts/Minecraft.ttf");
  font-weight: normal;
}
</style>
