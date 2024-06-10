<script lang="ts">
  export let weatherKey: string

  import { getCurrent } from '$lib/fetchers/weather'
  import Icon from '@iconify/svelte'
  import { fade, slide } from 'svelte/transition'

  let weatherPromise = getCurrent(weatherKey)

  setInterval(() => {
    weatherPromise = getCurrent(weatherKey)
  }, 60000)
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
    <h1>{data.forecast.forecastday[0].day.condition.text}</h1>
  </div>
  <div class="flex flex-col mt-3">
    <div class="flex flex-col text-2xl gap-2">
      <div class="flex items-center gap-2">
        <Icon icon="material-symbols:device-thermostat" class="text-3xl" />
        <h1 class="">
          Mért hőmérséklet: <span class="font-semibold">{data.current.temp_c}°C</span>
        </h1>
      </div>
      <div class="flex items-center gap-2">
        <Icon icon="material-symbols:device-thermostat" class="text-3xl" />
        <h1 class="">
          Hőérzet: <span class="font-semibold">{data.current.feelslike_c}°C</span>
        </h1>
      </div>
      <div class="flex items-center gap-2">
        <Icon icon="ph:wind" class="text-3xl" />
        <h1 class="">
          Szélsebesség: <span class="font-semibold">{data.current.wind_kph}km/h</span>
        </h1>
      </div>
    </div>
  </div>
  <!-- TODO: kéne egy forecast -->
{/await}
