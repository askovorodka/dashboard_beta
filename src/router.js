import { Redirect, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

// Layouts
import MainLayout from './modules/layout'
import TwoCollLayout from './modules/twocolllayout'

import Login from './pages/login'
import Stats from './pages/stats'
import Transactions from './pages/transactions'
import TransactionsItem from './pages/transaction'
import Graphics from './pages/graphics'
import Faq from './pages/faq'
import Contacts from './pages/contacts'
import FeedBack from './pages/feedback'
import Conclusion from './pages/conclusion'
import PayHistory from './pages/payhistory'
import Reports from './pages/reports'
// import NoMatch from './pages/nomatch'
import ReduxModal from 'react-redux-modal'

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

import PrivateRoute from './modules/auth';

const routes = [
  { path: '/faq',
    main: Faq
  },
  { path: '/contacts',
    main: Contacts
  },
  { path: '/feedback',
    main: FeedBack
  },
  { path: '/conclusion',
    main: Conclusion
  },
  { path: '/pay-history',
    main: PayHistory
  }
]

import { ConnectedRouter } from 'react-router-redux'

export default (
	<ConnectedRouter history={createBrowserHistory()}>
		<Switch>
			<Route path="/login" component={Login} />
			<MainLayout history={createBrowserHistory() }>
				<PrivateRoute exact path="/" component={Stats} />
				<PrivateRoute path="/graphics" component={Graphics} />
				<PrivateRoute path="/transactions" exact component={Transactions} />
                <PrivateRoute path="/transactions/:id"  component={TransactionsItem} />
                <PrivateRoute path="/reports" component={Reports} />
        
        {routes.map((route, index) => ( 
          <PrivateRoute
            key={index}
            path={route.path}
            component={route.main}
            wrap={TwoCollLayout}
            
          />
        ))}
        <ReduxModal />
      </MainLayout> 
		</Switch>
	</ConnectedRouter>
)