<script lang="ts">
  export let weatherKey: string;

  import {getCurrent} from '$lib/fetchers/weather'
  import Icon from '@iconify/svelte';

  let weatherPromise = getCurrent(weatherKey)

  setInterval(() => {
    weatherPromise = getCurrent(weatherKey)
  }, 1800000)
</script>

{#await weatherPromise}
  <Icon icon="mdi:loading" class="text-3xl animate-spin p-0.5 rounded-full bg-white text-cyan-600" />
{:then data}
    <div class="text-2xl flex flex-row justify-center gap-3 items-center">
      {#if data.current.is_day == 1}
      <Icon icon="ep:sunrise" class="text-6xl"></Icon>
      {:else}
      <Icon icon="solar:moon-fog-linear" class="text-6xl mx-auto"></Icon>
    {/if}
    <h1>{data.current.condition.text}</h1>
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