import React from 'react'

export default class EditProjectUsers extends React.Component {



  render() {
    return(
      <div>
        {this.props.projectUsers.map((user) => {
          return (
            <div>
              <input className="checkbox" type="checkbox" id={user.firstname} data-id={user.id} checked />
              <label for={user.firstname}>{user.firstname}</label>
            </div>
          )
        })}
      </div>
    )
  }



}
