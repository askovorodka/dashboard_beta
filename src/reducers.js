import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'

// Reducers
import authReducer from './modules/auth/reducer.js'
import dateReducer from './modules/datafilter/reducer.js'
import layoutReducer from './modules/layout/reducer.js'
import headerReducer from './modules/header/reducer.js'
import statsReducer from './pages/stats/reducer.js'
import graphicsReducer from './pages/graphics/reducer.js'
import transactionReducer from './pages/transaction/reducer.js'
import transactionsReducer from './pages/transactions/reducer.js'
import feedbackReducer from './pages/feedback/reducer.js'
import payhistoryReducer from './pages/payhistory/reducer.js'
import conclusionReducer from './pages/conclusion/reducer.js'
import reportsReducer from './pages/reports/reducer.js'
import { reducer as modalReducer } from 'react-redux-modal'

// Combine Reducers
var reducers = combineReducers({
  layout: layoutReducer,
  auth: authReducer,
  date: dateReducer,
  lang: headerReducer,
  stats: statsReducer,
  graphics: graphicsReducer,
  transaction: transactionReducer,
  transactions: transactionsReducer,
  feedback: feedbackReducer,
  payhistory: payhistoryReducer,
  conclusion: conclusionReducer,
  reports: reportsReducer,
  router: routerReducer,
  modals: modalReducer
})

export default reducers
