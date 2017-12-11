import React from 'react'

export default class AdminHome extends React.Component {
  render() {
    return(
      <div className="center">
        <h2>Welcome {this.props.currentUser.firstname}</h2>
        <p>Click on a client to get started</p>
      </div>
    )
  }
}
