<script lang="ts">
  export let weatherKey: string

  import { getCurrent } from '$lib/fetchers/weather'
  import Icon from '@iconify/svelte'

  let weatherPromise = getCurrent(weatherKey)

  setInterval(() => {
    weatherPromise = getCurrent(weatherKey)
  }, 60000)

  let weatherVideo: HTMLVideoElement
  let weatherVideoSrc: HTMLSourceElement

  setInterval(() => {
    weatherVideoSrc.src = `https://cdn.idokep.hu/terkep/hu970/felhokep2.mp4?a${Math.random()}`
    weatherVideo.load()
    weatherVideo.play()
  }, 600000)
</script>

{#await weatherPromise}
  <div class="flex items-center justify-center h-full">
    <Icon
      icon="mdi:loading"
      class="text-6xl animate-spin p-0.5 rounded-full bg-white text-emerald-600"
    />
  </div>
{:then data}
  <div class="text-3xl flex flex-row justify-center gap-3 items-center">
    {#if data.current.is_day == 1}
      {#if data.forecast.forecastday[0].day.daily_chance_of_rain > 10}
        <Icon icon="carbon:rain" class="text-6xl"></Icon>
      {:else}
        <Icon icon="ep:sunrise" class="text-6xl"></Icon>
      {/if}
    {:else}
      <Icon icon="solar:moon-fog-linear" class="text-6xl"></Icon>
    {/if}
    <h1>{data.forecast.forecastday[0].day.condition.text} - {data.current.temp_c}°C</h1>
  </div>
  <div class="flex flex-col mt-1">
    <div class="flex flex-row justify-between text-2xl px-6">
      <div class="flex items-center gap-2">
        <Icon icon="material-symbols:device-thermostat" class="text-3xl" />
        <h1 class="">
          Hőérzet: <span class="font-semibold">{data.current.feelslike_c}°C</span>
        </h1>
      </div>
      <div class="flex items-center gap-2">
        <Icon icon="ph:wind" class="text-3xl" />
        <h1 class="">
          Szél: <span class="font-semibold">{data.current.wind_kph}km/h</span>
        </h1>
      </div>
    </div>
  </div>
  <video muted autoplay loop class="rounded-2xl shadow-sm mt-4 px-2" bind:this={weatherVideo}>
    <source
      src="https://cdn.idokep.hu/terkep/hu970/felhokep2.mp4?a"
      bind:this={weatherVideoSrc}
      type="video/mp4"
    />
  </video>
  <!-- TODO: kéne egy forecast -->
{/await}
