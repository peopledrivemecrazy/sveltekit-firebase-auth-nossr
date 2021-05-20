<script context="module">
  export const ssr = true;

  export async function load({ page, session, context, fetch }) {
    console.log({ context, session });
    return { props: { context } };
  }
</script>

<script>
  import Nav from "$lib/Nav.svelte";
  import { authState, currentSession } from "../stores/auth";
  import { onMount } from "svelte";
  import { getStores } from "$app/stores";

  const { session } = getStores();

  import {
    firebaseInit,
    authChange,
    tokenChange,
  } from "../gatekeeper/firebase";
  import { browser } from "$app/env";

  onMount(() => {
    if (!$authState.firebaseControlled) {
      firebaseInit();
    }
    authChange();
    if (browser) tokenChange();
  });

  $: {
    if ($currentSession.email) {
      console.log({ session: $currentSession });
      $session.user = $currentSession;
    }
  }
</script>

<Nav />

<main>
  <slot />
</main>
