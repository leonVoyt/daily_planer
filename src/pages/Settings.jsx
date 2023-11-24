import { inject, observer } from 'mobx-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BookDetails from '../components/BookDetails'

const Settings = inject('shop')(
  observer(({ shop }) => (
    <section className="Page-books">
      <h1>Available books</h1>
      <ol>
        {shop.sortedAvailableBooks.map((book) => (
          <BookEntry key={book.id} book={book} />
        ))}
      </ol>
    </section>
  ))
)

const BookEntry = inject('shop')(
  observer(({ book, shop }) => (
    <li>
      <Button book={book} />
    </li>
  ))
)

const Button = ({ book }) => {
  const history = useNavigate()

  return <BookDetails book={book} />
}

export default Settings
