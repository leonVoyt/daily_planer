import { when, reaction } from 'mobx'
import {
  types,
  getParent,
  getSnapshot,
  applySnapshot,
  destroy,
} from 'mobx-state-tree'

const MonthlyPostsEntry = types
  .model('MonthlyPostsEntry', {
    monthlyPost: types.model('monthlyPost', {
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
  }))

export const MonthlyPostsStore = types
  .model('MonthlyPostsStore', {
    entries: types.array(MonthlyPostsEntry),
  })
  .views((self) => ({
    get budget() {
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
        when(() => {
          self.readFromLocalStorage()
          reaction(
            () => getSnapshot(self),
            (json) => {
              window.localStorage.setItem('monthlyPosts', JSON.stringify(json))
            }
          )
        })
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
        isAlreadyExist.monthlyPost = {
          ...isAlreadyExist.monthlyPost,
          ...monthlyPost,
        }
      }
      if (notify) self.budget.alert('Added to Statistics')
    },

    remove(month) {
      let isAlreadyExist = self.entries.find(
        (el) => el.monthlyPost.month === month
      )
      destroy(isAlreadyExist)
    },
    clear() {
      self.entries.clear()
    },
    readFromLocalStorage() {
      const monthlyPostData = window.localStorage.getItem('monthlyPosts')
      if (monthlyPostData) applySnapshot(self, JSON.parse(monthlyPostData))
    },
  }))
