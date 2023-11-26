// CurrencyStore.js
import { types, flow, getSnapshot, applySnapshot } from 'mobx-state-tree'
import { getCurrency } from '../API/currency'
import { reaction, when } from 'mobx'

export const CurrencyStore = types
  .model('CurrencyStore', {
    currencies: types.model('Currency', {
      name: types.string,
      value: types.number,
      letterCode: types.string,
    }),
  })
  .actions((self) => ({
    afterAttach() {
      if (typeof window !== 'undefined' && window.localStorage) {
        when(() => {
          self.readFromLocalStorage()

          reaction(
            () => getSnapshot(self),
            (json) => {
              window.localStorage.setItem('currancy', JSON.stringify(json))
            }
          )
        })
      }
    },

    // Asynchronous action to fetch currency values from an API
    fetchCurrencyValues: flow(function* (currName) {
      try {
        // self.isLoading = true

        // Simulate API call or fetch currency values from a real API

        const data = yield getCurrency(currName)

        // Update currency values in the store
        self.currencies = data
      } catch (error) {
        console.error('Error fetching currency values:', error)
      } finally {
        // self.isLoading = false
      }
    }),
    readFromLocalStorage() {
      const cartData = window.localStorage.getItem('currancy')
      if (cartData) applySnapshot(self, JSON.parse(cartData))
    },
  }))
