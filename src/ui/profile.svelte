<script lang="ts">
  import { supabaseClient } from "../lib/supabase";
  import { user } from "../lib/store";

function login() {
    console.log('login');
    supabaseClient.auth.signInWithOAuth({provider: 'google' })

}

function logout() {
  supabaseClient.auth.signOut();
}
</script>

<div id="profile">
  {#if $user}
  {$user?.user_metadata.full_name}
  <button on:click={logout}>logout</button>
  {:else}

    <button on:click={login}>login with google</button>
  {/if}
</div>

<style>
  #profile {
    position: absolute;
    top: 0;
    left: 20px;
  }
</style>