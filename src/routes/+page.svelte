<script lang="ts">
  import type { PageData } from './$types'
  import Subs from '../lib/components/subs/Subs.svelte'
  import TopBar from '$lib/components/bars/TopBar.svelte'
  import BottomBar from '$lib/components/bars/BottomBar.svelte'
  import Box from '$lib/components/Box.svelte'
  import Weather from '$lib/components/Weather.svelte'
  import { getNews } from '$lib/fetchers/news'
  import PetrikLogo from '$lib/icon.png'
  export let data = {} as PageData

  let newsPromise = getNews()

  setInterval(() => {
    newsPromise = getNews()
  }, 1800000)
</script>

<div
  class="h-svh bg-gradient-to-l from-emerald-800 to-emerald-950 text-white p-2 flex flex-col gap-3"
>
  <TopBar apiKey={data.bkkKey} />

  <div class="grid grid-cols-3 gap-3 h-full">
    <div class="grid gap-3 col-span-1">
      <Box>
        <Weather weatherKey={data.weatherKey} />
      </Box>
      <Box>
        <div class="flex items-center justify-center h-full animate-pulse grayscale">
          <img src={PetrikLogo} alt="" class="h-full max-h-56" />
        </div>
      </Box>
    </div>
    <Box class="col-span-2">
      <Subs />
    </Box>
  </div>

  {#await newsPromise then news}
    {#if news}
      <BottomBar {news} />
    {/if}
  {/await}
</div>
