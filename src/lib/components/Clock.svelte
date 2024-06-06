<script lang="ts">
  let clockText: string;

  function updateClock() {
    const now = new Date();
    // HH:MM
    clockText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  updateClock();
  setInterval(updateClock, 1000);
</script>

<span contenteditable="true" bind:innerText={clockText}></span>