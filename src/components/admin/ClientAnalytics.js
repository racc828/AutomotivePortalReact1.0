import React from 'react'
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'


export default class ClientAnalytics extends React.Component {
  render() {
    return(
      <div>
        Analytics
        {/* <GoogleProvider clientId={'367986848913-bt68oq7ng5rd4d187jbfdqeivki25id9.apps.googleusercontent.com'}>
          <GoogleDataChart views={views} config={last30days} />
          <GoogleDataChart views={views} config={last7days} />
        </GoogleProvider> */}
      </div>
    )
  }
}

//367986848913-bt68oq7ng5rd4d187jbfdqeivki25id9.apps.googleusercontent.com
