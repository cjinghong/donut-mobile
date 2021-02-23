import { create } from "apisauce"

export const getData = () => {
  const apisauce = create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1',
    timeout: 10000,
    headers: {
      Accept: "application/json",
      'X-CMC_PRO_API_KEY': 'd9e1fac7-8ea5-43c3-9c17-3562d2d013e5',
    },
  })

  apisauce.get('/cryptocurrency/map').then((res) => {
    const { data } = res.data

    // Filter only ERC-20 token
    console.log(
      JSON.stringify(
        data.filter((d) => !!d.platform && d.platform.id === 1027)
      )
    )
  }).catch((err) => {
    console.log(err)
  })
}
