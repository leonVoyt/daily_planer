import React, { useEffect, useState } from 'react'
import { observer, inject } from 'mobx-react'
import { TableView } from '../organism/TableViev'
import { TableViewType } from '../hooks/useTableView'
import { getCurrency } from '../API/currency'
// import "./monthlyPosts.css"

const Statistics = inject('budget')(
  observer(({ budget: { monthlyPosts, currancy } }) => {
    useEffect(() => {
      getCurrency('USD').then((data) => console.log(data))
    }, [])

    //formated monthlyPost
    const formatedData = monthlyPosts.entries.map((el) =>
      el.monthlyPost.expensesCategories.reduce(
        (acc, category) => {
          acc[category.name] = category.value
          return acc
        },
        {
          month: el.monthlyPost.month,
          income: el.monthlyPost.income,
          expenses: el.monthlyPost.expenses,
          monthlyTotal: el.monthlyPost.monthlyTotal,
        }
      )
    )
    return (
      <section className="mx-2">
        <h2>Your Statistics</h2>
        {monthlyPosts.entries.length ? (
          <>
            <TableView
              data={formatedData ?? []}
              viewType={TableViewType.SymbolSearch}
            />

            <p>
              <b>
                Total:{' '}
                <span className={getColor(monthlyPosts.total)}>
                  {(monthlyPosts.total * currancy.currencies.value).toFixed(2)}{' '}
                  {currancy.currencies.letterCode}
                </span>
              </b>
            </p>
          </>
        ) : (
          <h1>empy list</h1>
        )}
      </section>
    )
  })
)

const monthlyPostsEntry = inject('budget')(
  observer(({ budget, entry }) => {
    return (
      <div className="border-2 border-gray-600">
        <p>
          <a
            href={`/book/${entry.monthlyPost.id}`}
            onClick={onEntryClick.bind(entry, budget)}
          >
            {entry.monthlyPost.name}
          </a>
          <div className="flex gap-5">
            <button onClick={() => entry.remove()}>Remove</button>
            <button
              onClick={() =>
                budget.monthlyPosts.editMonthly(entry.monthlyPost.id)
              }
            >
              editMonthly
            </button>
          </div>
        </p>

        <div className="Page-monthlyPosts-item-details">
          <p>
            Amount: total expenses: <b>{entry.monthlyPost.expenses} €</b>
          </p>
          <p>
            total income: <b>{entry.monthlyPost.income} €</b>
          </p>
        </div>
      </div>
    )
  })
)

function onEntryClick(budget, e) {
  budget.view.openBookPage(this.monthlyPost)
  e.preventDefault()
  return false
}

export default Statistics

export const getColor = (value) => {
  return value > 0 ? 'text-green-600' : 'text-red-600'
}

//to do
// 1 key problem
// 2 update only where !=0
// 3 Create modal for create new post
