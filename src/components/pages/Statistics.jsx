import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { TableView } from '../../organism/TableViev'
import { TableViewType } from '../../hooks/useTableView'
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

export default Statistics

export const getColor = (value) => {
  return value > 0 ? 'text-green-600' : 'text-red-600'
}
