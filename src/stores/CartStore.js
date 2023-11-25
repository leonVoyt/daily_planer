import { when, reaction } from 'mobx'
import {
  types,
  getParent,
  getSnapshot,
  applySnapshot,
  destroy,
} from 'mobx-state-tree'

const CartEntry = types
  .model('CartEntry', {
    book: types.model('test', {
      id: types.string,
      name: types.string,
      expenses: types.number,
      income: types.number,
    }),
  })
  .views((self) => ({
    get price() {
      return self.book.income - self.book.expenses
    },
    get isValidBook() {
      return self.book.isAvailable
    },
  }))
  .actions((self) => ({
    increaseQuantity(number) {
      self.quantity += number
    },
    setQuantity(number) {
      self.quantity = number
    },
    remove() {
      getParent(self, 2).remove(self)
    },
  }))

export const CartStore = types
  .model('CartStore', {
    entries: types.array(CartEntry),
  })
  .views((self) => ({
    get shop() {
      return getParent(self)
    },

    get total() {
      return self.entries.reduce(
        (sum, e) => sum + Number(e.book.income - e.book.expenses),
        0
      )
    },
    get canCheckout() {
      return (
        self.entries.length > 0 &&
        self.entries.every((entry) => entry.quantity > 0 && entry.isValidBook)
      )
    },
  }))
  .actions((self) => ({
    afterAttach() {
      if (typeof window !== 'undefined' && window.localStorage) {
        when(
          () => !self.shop.isLoading,
          () => {
            self.readFromLocalStorage()
            reaction(
              () => getSnapshot(self),
              (json) => {
                window.localStorage.setItem('cart', JSON.stringify(json))
              }
            )
          }
        )
      }
    },
    addBook(book, quantity = 1, notify = true) {
      let entry = false

      self.entries.push({
        book: {
          id: Math.random().toString(),
          name: 'Leon',
          expenses: 100,
          income: 200,
        },
      })
      entry = self.entries[self.entries.length - 1]
      entry.increaseQuantity(quantity)
      if (notify) self.shop.alert('Added to cart')
    },
    editMonthly(id) {
      let obj = {
        expenses: 2200,
        income: 500,
      }

      self.entries.forEach((el) =>
        el.book.id === id ? (el.book = { ...el.book, ...obj }) : el.book
      )
    },

    remove(book) {
      destroy(book)
    },
    checkout() {
      const total = self.total
      self.clear()
      self.shop.alert(`Bought books for ${total} € !`)
    },
    clear() {
      self.entries.clear()
    },
    readFromLocalStorage() {
      const cartData = window.localStorage.getItem('cart')
      if (cartData) applySnapshot(self, JSON.parse(cartData))
    },
  }))
