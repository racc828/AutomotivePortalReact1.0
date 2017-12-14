import React from 'react'
import EditProjectUsersCheckBox from './EditProjectUsersCheckBox'

export default class EditProjectUsers extends React.Component {



  render() {
    return(
      <div>
        {this.props.admins.map((admin) => {
          return <EditProjectUsersCheckBox
            addProjectUser={this.props.addProjectUser} projectUsers={this.props.projectUsers} admin={admin}/>
        })}
      </div>
    )
  }

}

//
// {this.props.projectUsers.map((user) => {
//   return (
//
//   )
// })}
