import { BKK_KEY, WEATHER_KEY } from '$env/static/private'

/** @type {import('./$types').PageLoad} */
export function load() {
  return {
    bkkKey: BKK_KEY,
    weatherKey: WEATHER_KEY
  }
}
