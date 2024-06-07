export const getCurrent = async (apiKey: string) => {
  const forecast = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Budapest&lang=HU`,
    { mode: 'cors' }
  )

  return await forecast.json()
}
