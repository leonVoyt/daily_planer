import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import TableModal from '../modals/TableModal'
// import "./Cart.css"

const Statistics = inject('shop')(
  observer(({ shop: { cart } }) => {
    const [showModal, setShowModal] = useState(false)
    const [currMonth, setCurrMonth] = useState('')

    return (
      <section className="overflow-x-hidden mx-2">
        <h2>Your cart</h2>
        {cart.entries.length ? (
          <>
            <table className="w-full ">
              <thead>
                <tr>
                  {tHeadParams.map((el) => (
                    <th className="border-2 border-gray-600" key={el.id}>
                      {el.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cart.entries.map((entry) => (
                  <tr
                    onClick={() => {
                      setCurrMonth(entry.monthlyPost.month)
                      setShowModal(!showModal)
                    }}
                  >
                    {Object.values(entry.monthlyPost).map((el) => {
                      if (Array.isArray(el)) {
                        return el.map((insEl) => (
                          <td className="border-2 border-gray-600">
                            {insEl.value}
                          </td>
                        ))
                      }
                      return <td className="border-2 border-gray-600">{el}</td>
                    })}
                    <th></th>
                  </tr>
                ))}
              </tbody>
            </table>
            {showModal && (
              <TableModal setShowModal={setShowModal} month={currMonth} />
            )}
            <p>
              <b>Total: {cart.total} €</b>
            </p>
          </>
        ) : (
          <h1>empy list</h1>
        )}
      </section>
    )
  })
)

const CartEntry = inject('shop')(
  observer(({ shop, entry }) => {
    return (
      <div className="border-2 border-gray-600">
        <p>
          <a
            href={`/book/${entry.monthlyPost.id}`}
            onClick={onEntryClick.bind(entry, shop)}
          >
            {entry.monthlyPost.name}
          </a>
          <div className="flex gap-5">
            <button onClick={() => entry.remove()}>Remove</button>
            <button onClick={() => shop.cart.editMonthly(entry.monthlyPost.id)}>
              editMonthly
            </button>
          </div>
        </p>

        <div className="Page-cart-item-details">
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

function onEntryClick(shop, e) {
  shop.view.openBookPage(this.monthlyPost)
  e.preventDefault()
  return false
}

export default Statistics

const tHeadParams = [
  {
    id: 0,
    name: 'Month',
  },
  {
    id: 1,
    name: 'Income',
  },
  {
    id: 2,
    name: 'Expenses',
  },
  {
    id: 3,
    name: 'Other',
  },
  {
    id: 4,
    name: 'Food',
  },
  {
    id: 5,
    name: 'Entertainment',
  },
  {
    id: 6,
    name: 'Transport',
  },
  {
    id: 7,
    name: 'Rent',
  },
  {
    id: 8,
    name: 'Monthly Total',
  },
]
