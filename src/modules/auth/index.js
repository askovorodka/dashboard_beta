import { PropTypes } from 'react';
import {connect} from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom'

const renderMergedProps = (component, wrap, routeProps, ...rest) => {
  const finalProps = Object.assign({}, wrap,...rest, routeProps );
  return (wrap === undefined) 
    ? React.createElement(component, finalProps)
    : React.createElement(wrap, finalProps, React.createElement(component))
}

class AuthenticatedComponent extends React.Component {

  componentWillMount () {
    this.checkAuth();
  }

  checkAuth () {
    if (!this.props.isAuthenticated) {
      let redirectAfterLogin = this.props.location.pathname;
      <Redirect to={{
        pathname: '/login',
        state: { from: redirectAfterLogin }
      }}/>
    }
  }

  componentWillReceiveProps (nextProps) {
    this.checkAuth();
  }

  render () {
    const {component, wrap, redirectTo, ...rest} = this.props;
    return (
      <Route {...rest} render={routeProps => {
        
        return this.props.isAuthenticated ? (
          renderMergedProps(component, wrap, routeProps, rest)
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: routeProps.location }
          }}/>
        );
      }}/>
    )

  }
}

AuthenticatedComponent.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}



export default withRouter(connect(
  state => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
  })
)(AuthenticatedComponent));