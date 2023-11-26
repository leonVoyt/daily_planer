import axios from 'axios'

export const getCurrency = async (currName) => {
  if (currName === 'UAH') {
    return { name: 'UAH', value: 1, letterCode: '₴' }
  }
  const response = await axios.get(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
  )

  let res = {}
  response.data.forEach(
    (el) =>
      el.cc === currName &&
      ((res.name = el.cc),
      (res.value = 1 / el.rate),
      (res.letterCode = LetterCode[el.cc]))
  )

  return res
}

const LetterCode = {
  UAH: '₴',
  USD: '$',
  EUR: '€',
}
