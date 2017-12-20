import React from 'react'
import UsersAdapter from '../../adapters/UsersAdapter'
import ClientCalendar from './ClientCalendar'
import ActiveSection from './ActiveSection'
import TopClientNavigation from './TopClientNavigation'

export default class ActiveClient extends React.Component {

  constructor() {
    super()
    this.state = {
      activeClient: [],
      activeSection: 1
    }
  }

  componentDidMount() {
    UsersAdapter.getClient(this.props.activeClient)
    .then((data) => {
      this.setState({
        activeClient: data
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    UsersAdapter.getClient(nextProps.activeClient)
    .then((data) => {
      this.setState({
        activeClient: data
      })
    })
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
          <TopClientNavigation switchSection={this.switchSection} />
        </div>
        <div className="active-section">
          <h4>{this.state.activeClient.company}</h4>
          <ActiveSection myProjects={this.props.myProjects} currentUser={this.props.currentUser} admins={this.props.admins} activeClient={this.state.activeClient} activeSection={this.state.activeSection} />
        </div>
      </div>
    )
  }


}
