import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

const Settings = inject('budget')(
  observer(({ budget }) => {
    const [income, setIncome] = useState(0)
    const currentYear = new Date().getFullYear()

    const [monthsList, setMonthsList] = useState([])

    const [selectedMonth, setSelectedMonth] = useState(
      `${months[new Date().getMonth()]}/${currentYear}`
    )

    const [selectedOption, setSelectedOption] = useState('')
    const [isSelectedOptionChanged, setIsSelectedOptionChanged] =
      useState(false)
    const [expensesCategories, setExpensesCategories] = useState([
      {
        id: 1,
        name: 'Rent',
        value: 0,
      },
      {
        id: 2,
        name: 'Food',
        value: 0,
      },
      {
        id: 3,
        name: 'Entertainment',
        value: 0,
      },
      {
        id: 4,
        name: 'Transport',
        value: 0,
      },
      {
        id: 5,
        name: 'Other',
        value: 0,
      },
    ])
    //
    const handleChange = (event) => {
      setSelectedMonth(event.target.value)
    }
    useEffect(() => {
      generateMonthOptions()
    }, [])
    const generateMonthOptions = () => {
      const startMonthIndex = -100 // November
      const endMonthIndex = 11 // October of the next year
      const options = []
      for (let i = startMonthIndex; i <= endMonthIndex; i++) {
        const monthIndex = ((i % 12) + 12) % 12 // Ensure the index is within the range [0, 11]
        options.push(
          <option key={i} value={i}>
            {`${months[monthIndex]}/${currentYear + Math.floor(i / 12)}`}
          </option>
        )
      }
      setMonthsList(options.map((el) => el.props.children))
    }

    //
    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value)
      setIsSelectedOptionChanged(!isSelectedOptionChanged)
    }

    return (
      <section className="Page-books">
        <h1>Available books</h1>

        <div className="">
          <label htmlFor="income">income</label>
          <input
            type="number"
            id="income"
            onChange={(e) => setIncome(Number(e.target.value))}
            className="border-2 border-purple-600"
          />

          <div>
            <label htmlFor="expensesDropdown">Select an expenses option:</label>
            <select
              id="expensesDropdown"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              {expensesOptions.map((option) => (
                <option value={option.name} key={option.id}>
                  {option.name}
                </option>
              ))}
            </select>

            {selectedOption && (
              <div>
                {selectedOption !== '--Select--' && (
                  <input
                    type="number"
                    placeholder={'input for ' + selectedOption}
                    onChange={(e) => {
                      const copy = [...expensesCategories]
                      copy.find((el) => el.name === selectedOption).value =
                        Number(e.target.value)
                      setExpensesCategories(copy)
                    }}
                  />
                )}
              </div>
            )}
            <div>
              <label>Select Month: </label>
              <select onChange={handleChange} value={selectedMonth}>
                {monthsList.map((el) => (
                  <option value={el} key={{ el }}>
                    {el}
                  </option>
                ))}
              </select>

              <p>You selected: {selectedMonth}</p>
            </div>
          </div>
          <button
            onClick={() => {
              budget.monthlyPosts.addBook({
                id: Math.random().toString(),
                month: selectedMonth,
                income: income,
                expenses: expensesCategories.reduce(
                  (acc, curr) => acc + curr.value,
                  0
                ),
                expensesCategories,
                monthlyTotal:
                  income -
                  expensesCategories.reduce((acc, curr) => acc + curr.value, 0),
              })
            }}
          >
            Add to monthlyPosts
          </button>
        </div>
      </section>
    )
  })
)

export default Settings

export const expensesOptions = [
  {
    id: 0,
    name: '--Select--',
  },
  {
    id: 1,
    name: 'Rent',
  },
  {
    id: 2,
    name: 'Food',
  },
  {
    id: 3,
    name: 'Entertainment',
  },
  {
    id: 4,
    name: 'Transport',
  },
  {
    id: 5,
    name: 'Other',
  },
]
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
