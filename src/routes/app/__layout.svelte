<script>
  import { authState } from "../../stores/auth";

  import { onMount } from "svelte";
  import Sidebar from "$lib/Sidebar.svelte";
  let guarded = false;
  onMount(() => {
    guarded = $authState.isLoggedIn;
    console.log({ guarded });
    if (guarded === false) {
      window.location.href = "/";
    }
  });
</script>

{#if guarded}
  <section>
    <div>
      <Sidebar />
    </div>
    <div>
      <slot />
    </div>
  </section>
{/if}

<style>
  section {
    margin-top: 2em;
    padding: 0 2em;
    display: grid;
    grid-template-columns: 4fr 8fr;
    box-sizing: border-box;
    min-height: calc(100vh - 40px);
  }
</style>
