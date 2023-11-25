import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

const Settings = inject('shop')(
  observer(({ shop }) => {
    const [income, setIncome] = useState(0)

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
            <label htmlFor="dropdown">Select an expenses option:</label>
            <select
              id="dropdown"
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
                {/* You can add input fields or any other elements based on the selected option */}
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
          </div>
          <button
            onClick={() => {
              shop.cart.addBook({
                id: Math.random().toString(),
                name: 'Leon',
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
            Add to cart
          </button>
        </div>
      </section>
    )
  })
)

export default Settings

const expensesOptions = [
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
const months = [
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
