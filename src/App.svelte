<script lang="ts">
  import Phaser from "phaser";
  import Gameplay from "./scenes/Gameplay";
  import { onMount } from "svelte";
  import Join from "./ui/join.svelte";
  let container: HTMLDivElement;
  let width = 0;
  let height = 0;

  const createGame = () => {
    container.innerHTML = "";
    width = window.innerWidth;
    height = window.innerHeight;

    const config = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
          gravity: { y: 200 },
        },
      },
      scene: Gameplay,
      parent: container,
    };

    const game = new Phaser.Game(config);
  };

  onMount(() => {
    createGame();
  });
</script>

<Join/>
<div
  bind:this={container}
  style="width: {width}px; height: {height}px; overflow: hidden"
/>
