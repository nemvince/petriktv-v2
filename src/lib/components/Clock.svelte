<script lang="ts">
  let dateText: string
  let clockText: string

  function updateClock() {
    const now = new Date()
    // Day, HH:MM
    dateText = now.toLocaleDateString('hu-HU', { dateStyle: 'full' })
    clockText = now.toLocaleTimeString('hu-HU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  updateClock()
  setInterval(updateClock, 1000)
</script>

<span>{dateText}</span>
<span class="font-semibold">{clockText}</span>
