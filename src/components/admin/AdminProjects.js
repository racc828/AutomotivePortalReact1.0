import React from 'react'
import AdminProject from './AdminProject'

export default class AdminProjects extends React.Component {

  render() {
    return(
      <div>
        {this.props.admins.map((admin) => {
          return <AdminProject admin={admin} />
        })}
      </div>
    )
  }


}
