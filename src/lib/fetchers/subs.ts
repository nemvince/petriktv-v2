const baseUrl = 'https://helyettesites.petrik.hu/api/index.php?status=napihely'

const periods = [
  {
    period: 0,
    starttime: '7:10',
    endtime: '7:55'
  },
  {
    period: 1,
    starttime: '8:00',
    endtime: '8:45'
  },
  {
    period: 2,
    starttime: '8:55',
    endtime: '9:40'
  },
  {
    period: 3,
    starttime: '9:55',
    endtime: '10:40'
  },
  {
    period: 4,
    starttime: '10:50',
    endtime: '11:35'
  },
  {
    period: 5,
    starttime: '11:45',
    endtime: '12:30'
  },
  {
    period: 6,
    starttime: '12:50',
    endtime: '13:35'
  },
  {
    period: 7,
    starttime: '13:45',
    endtime: '14:30'
  },
  {
    period: 8,
    starttime: '14:35',
    endtime: '15:20'
  },
  {
    period: 9,
    starttime: '15:20',
    endtime: '16:00'
  },
  {
    period: 10,
    starttime: '16:00',
    endtime: '16:40'
  },
  {
    period: 11,
    starttime: '16:45',
    endtime: '17:25'
  },
  {
    period: 12,
    starttime: '17:30',
    endtime: '18:10'
  },
  {
    period: 13,
    starttime: '18:15',
    endtime: '18:55'
  },
  {
    period: 14,
    starttime: '19:00',
    endtime: '19:40'
  },
  {
    period: 15,
    starttime: '19:45',
    endtime: '20:25'
  },
  {
    period: 16,
    starttime: '20:30',
    endtime: '21:10'
  }
]

type Sub = {
  tname: string
  ora: number
  helytan: string
  terem: string
  class: string
  ovh: string
  day: string
}

type SubInput = {
  tname: string
  ora: string
  helytan: string
  terem: string
  class: string
  ovh: string
  day: string
}

type PaginatedData = {
  page: number
  totalPages: number
  data: Sub[]
}

const paginate = (data: Sub[], pageSize: number): PaginatedData[] => {
  const paginatedData: PaginatedData[] = []
  let pageNumber = 1
  const totalPages = Math.ceil(data.length / pageSize)

  for (let i = 0; i < data.length; i += pageSize) {
    const pageData = data.slice(i, i + pageSize)
    paginatedData.push({ page: pageNumber, totalPages: totalPages, data: pageData })
    pageNumber++
  }

  return paginatedData
}

export const getSubs = async (): Promise<PaginatedData[]> => {
  const response = await fetch(baseUrl)

  const resbody = await response.text()

  if (resbody === '') {
    return []
  }

  const input: SubInput[] = JSON.parse(resbody)

  const data: Sub[] = input.map((item: SubInput) => {
    return {
      tname: item.tname,
      ora: parseInt(item.ora.charAt(0)),
      helytan: item.helytan,
      terem: item.terem,
      class: item.class,
      ovh: item.ovh,
      day: item.day
    }
  })

  data.sort((a, b) => a.ora - b.ora)

  const now = new Date()
  const nowTime = now.getHours() * 60 + now.getMinutes()
  const nextPeriod = periods.find((period) => {
    const start = period.starttime.split(':')
    const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1])
    return startMinutes > nowTime
  })

  if (!nextPeriod) return []

  return paginate(
    data.filter((item) => item.ora >= nextPeriod.period - 1),
    16
  )
}
