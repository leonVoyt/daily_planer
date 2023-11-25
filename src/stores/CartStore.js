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
    monthlyPost: types.model('test', {
      id: types.string,
      name: types.string,
      income: types.number,
      expenses: types.number,
      expensesCategories: types.array(
        types.model('expensesCategories', {
          id: types.number,
          name: types.string,
          value: types.number,
        })
      ),
      monthlyTotal: types.number,
    }),
  })
  .views((self) => ({
    get price() {
      return self.monthlyPost.income - self.monthlyPost.expenses
    },
    get isValidBook() {
      return self.monthlyPost.isAvailable
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
        (sum, e) => sum + Number(e.monthlyPost.income - e.monthlyPost.expenses),
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
    addBook(monthlyPost, quantity = 1, notify = true) {
      let entry = false

      self.entries.push({
        monthlyPost: monthlyPost,
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
        el.monthlyPost.id === id
          ? (el.monthlyPost = { ...el.monthlyPost, ...obj })
          : el.monthlyPost
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
