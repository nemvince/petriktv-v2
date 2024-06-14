<script lang="ts">
  import SubDisplay from './SubDisplay.svelte'

  import { getSubs } from '$lib/fetchers/subs'
  import Icon from '@iconify/svelte'

  let subsPromise = getSubs()

  // import Head from "$lib/head.png"
  // import Turbine from "$lib/turbeen.png"

  // refetch every hour
  setInterval(() => {
    subsPromise = getSubs()
  }, 3600000)
</script>

{#await subsPromise}
  <div class="flex justify-center items-center h-full">
    <Icon icon="mdi:loading" class="text-6xl animate-spin" />
    <!-- SPINNY BOY -->
    <!-- <div class="">
        <img src={Head} alt="" class="animate-spin w-[40rem] h-[40rem]">
      </div> -->
  </div>
{:then subs}
  <SubDisplay {subs} />
{:catch error}
  <p>valami nem jo!</p>
  <p>{error}</p>
{/await}
