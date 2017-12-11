import React from 'react'

export default class TopClientNavigation extends React.Component {

  constructor() {
    super()
    this.state = {
      logoutDropdownVisible: false
    }
  }


  switchSection = (e) => {
    this.props.switchSection(parseInt(e.target.dataset.topnavlist))
  }

  toggleLogoutDropdownVisible = () => {
    this.setState({
      logoutDropdownVisible: !this.state.logoutDropdownVisible
    })
  }


  render(){
    return(
      <div>
        <ul>
          <li data-topnavlist="1" onClick={this.switchSection}>Calendar</li>
          <li data-topnavlist="2" onClick={this.switchSection}>Creative</li>
          <li data-topnavlist="3" onClick={this.switchSection}>Analytics</li>
          <span className="client-logout" onClick={this.toggleLogoutDropdownVisible}>
            <li><i className="fa fa-user"></i><i className="fa fa-caret-down"></i></li>
          </span>

          {this.state.logoutDropdownVisible ?
            <div className="client-dropdown"><button className="waves-effect waves-light btn" onClick={this.props.logOut}> LogOut </button></div> : null }

        </ul>

      </div>
    )
  }
}
