<script>
  import { authState } from "../stores/auth";
  import { loginWithGoogle, doLogOut } from "../gatekeeper/authservice";

  import { switchPath } from "../gatekeeper/pathguard";

  $: hasUserloggedIn = $authState.isLoggedIn;

  async function logout() {
    let k = await doLogOut();
    if (!k.isLoggedIn) {
      switchPath("/");
    }
  }
</script>

<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    {#if hasUserloggedIn}
      <li><a href="/app/dashboard">App</a></li>
      <li>
        logged in as {$authState.user.email}
      </li>
      <li>
        <button on:click={logout}> Logout </button>
      </li>
    {:else}
      <li>
        <button on:click={loginWithGoogle}> Login </button>
      </li>
    {/if}
  </ul>
</nav>

<style>
  nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background-color: #000;
    padding: 1em;
  }
  ul {
    display: flex;
    gap: 1em;
    color: #fff;
  }
  a {
    text-decoration: none;
    color: #fff;
  }
</style>
