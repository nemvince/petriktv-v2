<script lang="ts">
  import DepCard from './DepCard.svelte'

  export let apiKey: string

  const stops = {
    reinerToKeleti: 'BKK_F01145',
    reinerToHosok: 'BKK_F01149',
    chazarToZuglo: 'BKK_F02716'
  }
</script>

<div class="flex gap-2">
  <DepCard stopId={stops.reinerToKeleti} bkk_key={apiKey} desc="Keleti" />
  <DepCard stopId={stops.reinerToHosok} bkk_key={apiKey} desc="Hősök tere" />
  <DepCard stopId={stops.chazarToZuglo} bkk_key={apiKey} desc="Zugló" />
</div>
