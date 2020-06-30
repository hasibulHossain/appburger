import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index';


class Logout extends React.Component {
   componentDidMount() {
      this.props.onLogout();
      this.props.removeOrdersFromLs()
   }

   render() {
      return <Redirect to="/" />
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onLogout: () => dispatch(actions.logout()),
      removeOrdersFromLs: () => dispatch(actions.removeOrdersInLogout())
   }
}

export default connect(null, mapDispatchToProps)(Logout);