import React from 'react'
import { observer, inject } from 'mobx-react'
// import "./Cart.css"

const Statistics = inject('shop')(
  observer(({ shop: { cart } }) => {
    return (
      <section className="overflow-x-hidden mx-2">
        <h2>Your cart</h2>
        {cart.entries.length ? (
          <>
            <table className="w-full ">
              <thead>
                <tr>
                  {Object.keys(cart.entries[0].monthlyPost).map((el) => {
                    if (el === 'expensesCategories') {
                      return cart.entries[0].monthlyPost.expensesCategories.map(
                        (insEl) => (
                          <th className="border-2 border-gray-600">
                            {insEl.name}
                          </th>
                        )
                      )
                    }
                    return <th className="border-2 border-gray-600">{el}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {cart.entries.map((entry) => (
                  <tr onClick={() => entry.remove()}>
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

function updateEntryQuantity(entry, e) {
  if (e.target.value) entry.setQuantity(Number(e.target.value))
}

export default Statistics
