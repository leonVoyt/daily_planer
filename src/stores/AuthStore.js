// CurrencyStore.js
import { types, getSnapshot, applySnapshot } from 'mobx-state-tree'
import { reaction, when } from 'mobx'

export const AuthStore = types
  .model('AuthStore', {
    isAuth: types.boolean,
  })
  .actions((self) => ({
    afterAttach() {
      if (typeof window !== 'undefined' && window.localStorage) {
        when(() => {
          self.readFromLocalStorage()

          reaction(
            () => getSnapshot(self),
            (json) => {
              window.localStorage.setItem('isAuth', JSON.stringify(json))
            }
          )
        })
      }
    },

    validation(inputData) {
      if (
        inputData.email === 'testLogin22' &&
        inputData.password === 's#dDA23@44#Ds'
      ) {
        return (self.isAuth = true)
      }
    },

    logOut() {
      return (self.isAuth = false)
    },

    readFromLocalStorage() {
      const isAuthData = window.localStorage.getItem('isAuth')
      if (isAuthData) applySnapshot(self, JSON.parse(isAuthData))
    },
  }))
