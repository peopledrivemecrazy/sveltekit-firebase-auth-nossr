<script context="module">
  export const load = async ({ fetch, page }) => {
    let slug = page.params.slug;

    return {
      props: { slug },
    };
  };
</script>

<script>
  export let slug;


</script>

App {slug}
