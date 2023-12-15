<script lang="ts">
  import Phaser from "phaser";
  import Gameplay from "./scenes/Gameplay";
  import { onMount } from "svelte";
  let container: HTMLDivElement;

  onMount(() => {
    container.innerHTML = "";

    const config = {
      type: Phaser.AUTO,
      width: 1280,
      height: 720,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200 },
        },
      },
      scene: Gameplay,
      parent: container,
    };

    const game = new Phaser.Game(config);
  });
</script>

<div bind:this={container} />
