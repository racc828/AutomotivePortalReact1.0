import React from 'react'
import ClientCalendar from './ClientCalendar'
import ClientCreative from './ClientCreative'
import ClientAnalytics from './ClientAnalytics'

export default class ActiveSection extends React.Component {


  render() {
    if (this.props.activeSection === 1) {
      return(
        <ClientCalendar admins={this.props.admins} activeClient={this.props.activeClient} currentUser={this.props.currentUser} />
      )
    } else if (this.props.activeSection === 2) {
      return(
        <ClientCreative activeClient={this.props.activeClient} />
      )
    } else {
      return(
        <ClientAnalytics activeClient={this.props.activeClient} />
      )
    }
  }


}
