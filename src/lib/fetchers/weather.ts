export const getCurrent = async (apiKey: string) => {
  const forecast = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=47.504998,19.0873761&lang=HU`,
    { mode: 'cors' }
  )

  const data = await forecast.json()

  // await new Promise(resolve => setTimeout(resolve, 1000));

  return data
}
