<script lang="ts">
  import Clock from '../Clock.svelte'
  import Departures from '../departures/Departures.svelte'

  import { getVersion } from '@tauri-apps/api/app'

  export let apiKey: string

  // import AppIcon from "$lib/icon.png"
</script>

<nav
  class="rounded-xl p-2 px-3 bg-emerald-600 bg-opacity-50 justify-between shadow-xl flex items-center"
>
  <div class="flex flex-row items-end">
    <!-- <img src={AppIcon} alt="App Icon" class="w-8 grayscale contrast-200" /> -->
    <h1 class="text-3xl">
      Petrik<span class="font-semibold">TV</span>
    </h1>
    {#await getVersion() then version}
      <span class="text-xl">v{version}</span>
    {:catch}
      <span class="text-xl">dev</span>
    {/await}
  </div>

  <Departures {apiKey} />

  <div class="text-2xl">
    <Clock />
  </div>
</nav>
