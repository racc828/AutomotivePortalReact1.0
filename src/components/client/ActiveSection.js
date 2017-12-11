import React from 'react'
import ClientCalendar from './ClientCalendar'
import ClientCreative from './ClientCreative'

export default class ActiveSection extends React.Component {


  render() {
    if (this.props.activeSection === 1) {
      return(
        <ClientCalendar admins={this.props.admins} currentUser={this.props.currentUser} />
      )
    } else if (this.props.activeSection === 2) {
      return(
        <ClientCreative/>
      )
    } else {
      return(
        <div>
          Analytics
        </div>
        // <ClientAnalytics activeClient={this.props.activeClient} />
      )
    }
  }


}
