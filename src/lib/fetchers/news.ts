const baseUrl = 'https://helyettesites.petrik.hu/api/?status=napihir'

const MODE = import.meta.env.MODE

export const getNews = async () => {
  let news: News[] = []

  if (MODE === 'development') {
    news = [
      {
        alert: 'Ez egy figyelmeztetés',
        day: '0000-00-00'
      },
      {
        alert: 'Ez egy figyelmeztetés de ez már egy másik napra van ami nagyon hosszú lehet',
        day: '0000-00-00'
      }
    ]
  }

  const response = await fetch(baseUrl)

  const rt = await response.text()
  if (rt !== '"empty"') {
    const input = JSON.parse(rt)
    news.push(...input)
  }

  return news
}

export interface News {
  alert: string
  day: string
}
