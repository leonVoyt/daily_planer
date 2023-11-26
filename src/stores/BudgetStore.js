import { types, getEnv } from 'mobx-state-tree'
import { CurrencyStore } from './CurrencyStore'
import { MonthlyPostsStore } from './MonthlyPostsStore'

export const BudgetStore = types
  .model('BudgetStore', {
    currancy: types.optional(CurrencyStore, {
      currencies: { name: 'UAH', value: 1, letterCode: '₴' },
    }),
    monthlyPosts: types.optional(MonthlyPostsStore, {
      entries: [],
    }),
  })
  .views((self) => ({
    get fetch() {
      return getEnv(self).fetch
    },
    get alert() {
      return getEnv(self).alert
    },
  }))
