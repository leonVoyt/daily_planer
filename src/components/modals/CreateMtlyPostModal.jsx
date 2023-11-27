import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { months } from '../pages/Settings'

const CreateMtlyPostModal = inject('budget')(
  observer(({ budget, setShowModal }) => {
    const [income, setIncome] = useState(0)
    const [inputValue, setInputValue] = useState('')
    const [expensesCategories, setExpensesCategories] =
      useState(expensesOptions)
    const [selectedOption, setSelectedOption] = useState('Other')
    const currentYear = new Date().getFullYear()
    const [monthsList, setMonthsList] = useState([])
    const [selectedMonth, setSelectedMonth] = useState(
      `${months[new Date().getMonth()]}/${currentYear}`
    )

    const handleChange = (event) => {
      setSelectedMonth(event.target.value)
    }
    const handleSelectChange = (e) => {
      setSelectedOption(e.target.value)
      setInputValue(
        expensesCategories.find((el) => el.name === e.target.value).value
      )
    }
    const handleInputChange = (e) => {
      setInputValue(e.target.value)
      setExpensesCategories((prev) => {
        const copy = prev.map((el) => ({ ...el }))
        const foundCategory = copy.find((el) => el.name === selectedOption)
        if (foundCategory) {
          foundCategory.value = Number(e.target.value)
        }
        return copy
      })
    }
    const handleClick = () => {
      budget.monthlyPosts.addBook({
        month: selectedMonth,
        income: income,
        expenses: expensesCategories.reduce((acc, curr) => acc + curr.value, 0),
        expensesCategories,
        monthlyTotal:
          income -
          expensesCategories.reduce((acc, curr) => acc + curr.value, 0),
      })
      setShowModal(false)
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

    return (
      <div
        className="absolute flex flex-col items-center justify-center overflow-hidden right-0 top-0 opacity-80 w-screen h-screen bg-white "
        onClick={() => setShowModal(false)}
      >
        <div
          className=" relative border-2 border-white w-1/2 h-1/2 flex flex-col items-center justify-around rounded-md bg-blue-600 text-white "
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="font-bold text-xl">{selectedMonth}</h1>
          <div className="flex flex-col gap-2">
            <div>
              <label htmlFor="income">Income in UAH</label>
              <div>
                <input
                  type="number"
                  id="income"
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="border-2 border-white rounded-md pl-2 bg-transparent"
                  placeholder={'input for income'}
                />
              </div>
            </div>
            <div>
              <select
                id="dropdown"
                value={selectedOption}
                onChange={(e) => handleSelectChange(e)}
                className="mb-2 bg-transparent"
              >
                {expensesOptions.map((option) => (
                  <option
                    value={option.name}
                    key={option.id}
                    className="bg-transparent text-blue-600"
                  >
                    Expenses on {option.name}
                  </option>
                ))}
              </select>
              <div>
                <input
                  type="number"
                  placeholder={'input for ' + selectedOption}
                  className="border-2 border-white rounded-md pl-2  bg-transparent"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="selectMonth">Select Month: </label>
            <select
              onChange={handleChange}
              id="selectMonth"
              value={selectedMonth}
              className="bg-transparent cursor-pointer"
            >
              {monthsList.map((el) => (
                <option
                  value={el}
                  key={el}
                  className="bg-transparent text-blue-600 "
                >
                  {el}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-green-600 py-1.5 px-3 rounded-3xl hover:bg-green-400  "
            onClick={handleClick}
          >
            Add to statistics
          </button>
        </div>
      </div>
    )
  })
)

export default CreateMtlyPostModal

const expensesOptions = [
  {
    id: 1,
    name: 'Other',
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
    name: 'Rent',
    value: 0,
  },
]
