const baseUrl = 'https://futar.bkk.hu/api/query/v1/ws/otp/api/where'

type StopTime = {
  predictedDepartureTime: number
  departureTime: number
  tripId: string
}

type Trip = {
  id: string
  routeId: string
}

export async function getDeparturesForStop(apiKey: string, stopId: string, routeFilter?: string) {
  try {
    const response = await fetch(
      `${baseUrl}/arrivals-and-departures-for-stop.json?key=${apiKey}&stopId=${stopId}&minutesBefore=0&minutesAfter=30`
    )

    const body = await response.json()

    let stopTime: StopTime
    let routeId: string
    let routeShortDesc: string

    if (routeFilter) {
      const trips: { [key: string]: Trip } = body.data.references.trips
      const filt = Object.values(trips).filter((trip) => trip.routeId === routeFilter)

      if (filt.length > 0) {
        const stopTimes: [StopTime] = body.data.entry.stopTimes
        stopTime = stopTimes.filter((stopTime) =>
          filt.map((f) => f.id).includes(stopTime.tripId)
        )[0]
        routeId = routeFilter
        routeShortDesc = body.data.references.routes[routeId].shortName
      } else {
        return null
      }
    } else {
      stopTime = body.data.entry.stopTimes[0]
      routeId = body.data.references.trips[stopTime.tripId].routeId
      routeShortDesc = body.data.references.routes[routeId].shortName
    }

    // multiply by 1000 to convert to milliseconds
    const departureTime = new Date(
      (stopTime.predictedDepartureTime || stopTime.departureTime) * 1000
    )

    // but don't multiply here because BKK can't do math
    const currentTime = new Date(body.currentTime)

    // do this shit to get minutes
    const minutesUntilDeparture = Math.floor(
      (departureTime.getTime() - currentTime.getTime()) / 60000
    )

    // add artificial delay
    // await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      routeShortDesc: routeShortDesc,
      minutesUntilDeparture: minutesUntilDeparture
    }
  } catch {
    return null
  }
}
