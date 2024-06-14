<script lang="ts">
  import { getDeparturesForStop } from '$lib/fetchers/bkk'

  import Icon from '@iconify/svelte'

  export let bkk_key: string
  export let stopId: string | [string, string]
  export let desc: string

  let depPromise: Promise<{ routeShortDesc: string; minutesUntilDeparture: number } | null>

  const getHosok = async (dep1: string, dep2: string) => {
    const dep1data = await getDeparturesForStop(bkk_key, dep1)
    const dep2data = await getDeparturesForStop(bkk_key, dep2, 'BKK_0301')

    if (dep1data === null) {
      return dep2data
    } else if (dep2data === null) {
      return dep1data
    }

    return dep1data.minutesUntilDeparture < dep2data.minutesUntilDeparture ? dep1data : dep2data
  }

  if (typeof stopId === 'object') {
    // this is hosok tere code babyyyy
    depPromise = getHosok(stopId[0], stopId[1])

    setInterval(() => {
      depPromise = getHosok(stopId[0], stopId[1])
    }, 30000)
  } else {
    depPromise = getDeparturesForStop(bkk_key, stopId)

    setInterval(() => {
      depPromise = getDeparturesForStop(bkk_key, stopId)
    }, 30000)
  }
</script>

<div class="flex items-center gap-2 bg-emerald-900 rounded-full pl-4">
  <h1 class="text-2xl font-semibold">{desc}</h1>
  {#await depPromise}
    <div class="bg-cyan-600 rounded-full p-1 flex gap-1 pr-3 items-center font-semibold">
      <Icon
        icon="mdi:loading"
        class="text-3xl animate-spin p-0.5 rounded-full bg-white text-cyan-600"
      />
      <span class="text-white text-2xl">...</span>
    </div>
  {:then dep}
    {#if dep}
      <span class="text-2xl">
        {#if dep.minutesUntilDeparture > 0}
          {dep.minutesUntilDeparture}'
        {:else}
          Indul!
        {/if}
      </span>
      <div class="bg-cyan-600 rounded-full p-1 flex gap-2 pr-3 items-center font-semibold">
        <Icon icon="mdi:bus" class="text-3xl p-0.5 rounded-full bg-white text-cyan-600" />
        <span class="text-white text-2xl">{dep.routeShortDesc}</span>
      </div>
    {/if}
  {:catch error}
    <Icon icon="mdi:error" class="text-2xl" />
    {error.message}
  {/await}
</div>
