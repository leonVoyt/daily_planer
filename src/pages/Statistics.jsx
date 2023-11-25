import React from 'react'
import { observer, inject } from 'mobx-react'
// import "./Cart.css"

const Statistics = inject('shop')(
  observer(({ shop: { cart } }) => (
    <section className="Page-cart">
      <h2>Your cart</h2>
      <section className="Page-cart-items">
        {console.log(cart.entries)}
        {cart.entries.map((entry) => (
          <CartEntry key={entry.book.id} entry={entry} />
        ))}
      </section>
      <p>Subtotal: {cart.subTotal} €</p>
      {cart.hasDiscount && (
        <p>
          <i>Large order discount: {cart.discount} €</i>
        </p>
      )}
      <p>
        <b>Total: {cart.total} €</b>
      </p>
      <button disabled={!cart.canCheckout} onClick={() => cart.checkout()}>
        Submit order
      </button>
    </section>
  ))
)

const CartEntry = inject('shop')(
  observer(({ shop, entry }) => {
    return (
      <div className="Page-cart-item">
        <p>
          <a
            href={`/book/${entry.book.id}`}
            onClick={onEntryClick.bind(entry, shop)}
          >
            {entry.book.name}
          </a>
          <button onClick={() => entry.remove()}>Remove</button>
          <button onClick={() => shop.cart.editMonthly(entry.book.id)}>
            editMonthly
          </button>
        </p>

        <div className="Page-cart-item-details">
          <p>
            Amount: total expenses: <b>{entry.book.expenses} €</b>
          </p>
          <p>
            total income: <b>{entry.book.income} €</b>
          </p>
        </div>
      </div>
    )
  })
)

function onEntryClick(shop, e) {
  shop.view.openBookPage(this.book)
  e.preventDefault()
  return false
}

function updateEntryQuantity(entry, e) {
  if (e.target.value) entry.setQuantity(Number(e.target.value))
}

export default Statistics
