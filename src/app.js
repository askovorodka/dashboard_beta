const prod = (process.env.NODE_ENV === 'production') ? true : false

import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import {loginUserSuccess} from './modules/auth/actions';
import router from './router'
import ReactDOM from 'react-dom'

import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
// import promise from 'redux-promise-middleware'
import promise from './components/promiseMiddleware/index.js'

import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, push } from 'react-router-redux'
const rmiddleware = routerMiddleware(createHistory())

import { I18nextProvider } from 'react-i18next'
import i18n from './i18n';

// const preloadedState = window.__PRELOADED_STATE__
// const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const middleware = (prod)
 ? applyMiddleware(rmiddleware, promise(), thunk)
 : applyMiddleware(rmiddleware, promise(), thunk, createLogger())
const store = createStore(reducers, middleware);

let token = localStorage.getItem('token');
if (token !== null) {
  store.dispatch(loginUserSuccess(token));
}


ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <Provider store={store}>
      {router}
    </Provider>
  </I18nextProvider>, 
  document.getElementById('root')
)