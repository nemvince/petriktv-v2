<script lang="ts">
  import '$lib/app.css'

  import shouldWeUpdate from '$lib/updater'

  setInterval(() => {
    shouldWeUpdate()
  }, 3600000)

  const keyCheck = (e: KeyboardEvent) => {
    if (e.key === 'r') {
      shouldWeUpdate()
    }
  }
</script>

<svelte:window on:keydown={keyCheck} />

<slot />
