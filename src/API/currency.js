import axios from 'axios'
export const getCurrency = async () => {
  const response = await axios.get(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
  )
  return response.data
}
