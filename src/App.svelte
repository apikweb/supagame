<script lang="ts">
  import Phaser from "phaser";
  import Gameplay from "./scenes/Gameplay";
  import { onMount } from "svelte";
  import Join from "./ui/join.svelte";
  import { supabaseClient } from "./lib/supabase";
  import { user } from "./lib/store";
  import Profile from "./ui/profile.svelte";
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
    listenAuth();
  });

function listenAuth() {
  supabaseClient.auth.onAuthStateChange((evt, session) => {
    console.log('auth state changed', session?.user)
    user.set(session?.user)
  })
}
</script>

<Join/>
<Profile/>
<div
  bind:this={container}
  style="width: {width}px; height: {height}px; overflow: hidden"
/>
