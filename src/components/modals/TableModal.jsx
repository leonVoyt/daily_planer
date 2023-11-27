import { inject, observer } from 'mobx-react'
import React, { useState } from 'react'

const TableModal = inject('budget')(
  observer(({ budget, currPost, setShowModal, entry }) => {
    const expensesOptions = [
      {
        id: 1,
        name: 'Other',
        value: currPost.Other,
      },
      {
        id: 2,
        name: 'Food',
        value: currPost.Food,
      },
      {
        id: 3,
        name: 'Entertainment',
        value: currPost.Entertainment,
      },
      {
        id: 4,
        name: 'Transport',
        value: currPost.Transport,
      },
      {
        id: 5,
        name: 'Rent',
        value: currPost.Rent,
      },
    ]

    const [income, setIncome] = useState(currPost.income)
    const [inputValue, setInputValue] = useState(`${currPost.Other}`)
    const [expensesCategories, setExpensesCategories] =
      useState(expensesOptions)
    const [selectedOption, setSelectedOption] = useState('Other')

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
        month: currPost.month,
        income: income,
        expenses: expensesCategories.reduce((acc, curr) => acc + curr.value, 0),
        expensesCategories,
        monthlyTotal:
          income -
          expensesCategories.reduce((acc, curr) => acc + curr.value, 0),
      })
      setShowModal(false)
    }
    const handleClickRemove = () => {
      budget.monthlyPosts.remove(currPost.month)
      setShowModal(false)
    }
    return (
      <div
        className="absolute flex flex-col items-center justify-center overflow-hidden right-0 top-0 opacity-80 w-screen h-screen bg-white "
        onClick={() => setShowModal(false)}
      >
        <div
          className="relative border-2 border-white w-1/2 h-1/3 flex flex-col items-center justify-around rounded-md bg-blue-600 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">{currPost.month}</h1>
            <div className="flex flex-col gap-5 ">
              <div>
                <label htmlFor="income">Income in UAH</label>
                <div>
                  <input
                    type="number"
                    id="income"
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="border-2 border-white rounded-md pl-2 bg-transparent"
                    placeholder={'input for income'}
                    value={income}
                  />
                </div>
              </div>
              <div>
                <select
                  id="dropdown"
                  value={selectedOption}
                  onChange={(e) => handleSelectChange(e)}
                  className="mb-2 bg-transparent cursor-pointer"
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
            <div className="w-full flex justify-between">
              <button
                onClick={handleClickRemove}
                className="bg-red-600 py-1.5 px-3 rounded-3xl hover:bg-red-400 "
              >
                Remove
              </button>

              <button
                className="bg-green-600 py-1.5 px-3 rounded-3xl hover:bg-green-400 "
                onClick={handleClick}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  })
)

export default TableModal
