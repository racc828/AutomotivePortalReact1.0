import React from 'react'
import TopClientNavigation from './TopClientNavigation'
import ActiveSection from './ActiveSection'
import '../../css/client.css'

export default class ClientHome extends React.Component {
  constructor(){
    super()
    this.state = {
      currentUser: {},
      activeSection: 1
    }
  }

  switchSection = (sectionNumber) => {
    this.setState({
      activeSection: sectionNumber
    })
  }


  render() {
    return(
      <div>
        <div className="client-top-navigation bg-primary">
          <TopClientNavigation switchSection={this.switchSection} logOut={this.props.logOut}/>
        </div>
        <div className="active-section">
          <h5>{this.state.currentUser.company}</h5>
          <ActiveSection currentUser={this.props.currentUser}  activeSection={this.state.activeSection} />
        </div>
      </div>
    )
  }


}
