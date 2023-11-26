import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'mobx-react'
import { BudgetStore } from './stores/BudgetStore'

const fetcher = (url) => window.fetch(url).then((response) => response.json())
const budget = BudgetStore.create(
  {},
  {
    fetch: fetcher,
    alert: (m) => console.log(m), // Noop for demo: window.alert(m)
  }
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider budget={budget}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
