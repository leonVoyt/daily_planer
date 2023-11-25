import { inject, observer } from 'mobx-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BookDetails from '../components/BookDetails'

const Settings = inject('shop')(
  observer(({ shop, book }) => (
    <section className="Page-books">
      <h1>Available books</h1>
      <ol>
        <button
          onClick={() => {
            shop.cart.addBook(book)
          }}
        >
          Add to cart
        </button>
      </ol>
    </section>
  ))
)

export default Settings
