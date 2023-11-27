import React, { useEffect, useState } from 'react'
import { observer, inject } from 'mobx-react'
import { TableView } from '../../organism/TableViev'
import { TableViewType } from '../../hooks/useTableView'
import { getCurrency } from '../../API/currency'
import CreateMtlyPostModal from '../modals/CreateMtlyPostModal'

const Statistics = inject('budget')(
  observer(({ budget: { monthlyPosts, currancy } }) => {
    const [showModal, setShowModal] = useState(false)

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
      <section className="px-2 pt-14 bg-pink-100 min-h-screen">
        <>
          <TableView
            data={formatedData ?? []}
            viewType={TableViewType.SymbolSearch}
          />

          <p className="pt-5">
            <b>
              Total:{' '}
              <span className={getColor(monthlyPosts.total)}>
                {(monthlyPosts.total * currancy.currencies.value).toFixed(2)}{' '}
                {currancy.currencies.letterCode}
              </span>
            </b>
          </p>

          <button
            onClick={() => setShowModal(!showModal)}
            className="px-2 py-1.5 bg-green-600 rounded-md text-white mt-5 hover:opacity-70"
          >
            Create new post
          </button>
          {showModal && <CreateMtlyPostModal setShowModal={setShowModal} />}
        </>
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
