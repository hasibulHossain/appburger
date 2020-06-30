import React from 'react'

const asyncCom = importCom => {
   return class extends React.Component {
      state = {
         component: null
      }

      componentDidMount() {
         importCom().then(component => {
            this.setState({component: component.default})
         })
      }

      render() {
         const Component = this.state.component;
         return this.state.component ? <Component {...this.props} /> : null
      }
   }
}

export default asyncCom;