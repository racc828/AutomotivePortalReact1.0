import React from 'react'
import ClientCalendar from './ClientCalendar'
import ClientCreative from './ClientCreative'

export default class ActiveSection extends React.Component {


  render() {
    if (this.props.activeSection === 1) {
      return(
        <ClientCalendar activeClient={this.props.activeClient} />
      )
    } else if (this.props.activeSection === 2) {
      return(
        <ClientCreative activeClient={this.props.activeClient} />
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
