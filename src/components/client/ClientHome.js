import React from 'react'

export default class ClientHome extends React.Component {
  constructor(){
    super()
    this.state = {
      currentUser: {}
    }
  }


  render() {
    return(
      <div>
        ClientHome
        <button className="waves-effect waves-light btn" onClick={this.props.logOut}> LogOut </button>
        {this.props.currentUser.firstname}
      </div>
    )
  }


}
