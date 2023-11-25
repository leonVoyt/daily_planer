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
      month: types.string,
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
    addBook(monthlyPost, notify = true) {
      let isAlreadyExist = self.entries.find(
        (el) => el.monthlyPost.month === monthlyPost.month
      )
      if (!isAlreadyExist) {
        self.entries.push({
          monthlyPost: monthlyPost,
        })
      } else {
        self.entries.forEach((el) =>
          el.monthlyPost.month === monthlyPost.month
            ? (el.monthlyPost = { ...el.monthlyPost, ...monthlyPost })
            : el.monthlyPost
        )
      }
      if (notify) self.shop.alert('Added to cart')
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
