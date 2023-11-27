import { types, getEnv } from 'mobx-state-tree'
import { CurrencyStore } from './CurrencyStore'
import { MonthlyPostsStore } from './MonthlyPostsStore'
import { AuthStore } from './AuthStore'

export const BudgetStore = types
  .model('BudgetStore', {
    currancy: types.optional(CurrencyStore, {
      currencies: { name: 'UAH', value: 1, letterCode: '₴' },
    }),
    monthlyPosts: types.optional(MonthlyPostsStore, {
      entries: [],
    }),
    auth: types.optional(AuthStore, {
      isAuth: false,
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
