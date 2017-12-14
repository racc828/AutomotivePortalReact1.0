import React from 'react'

export default class EditProjectUsersCheckBox extends React.Component {
  constructor() {
    super()
    this.state = {
      checked:true
    }
  }

  addProjectUser = (e) => {
    this.props.addProjectUser(e.target.checked, this.props.admin.id)
  }

  addProjectUserTwo = (e) => {
    this.setState({
      checked: !this.state.checked
    })
    this.props.addProjectUser(e.target.checked, this.props.admin.id)
  }


  render() {
    return(
      <div>
        {
         this.props.projectUsers.length > 0 && this.props.projectUsers.find(user => user.id === this.props.admin.id) ?
         <div>
           <div>
             <input onChange={this.addProjectUserTwo} className="checkbox" type="checkbox" id={this.props.admin.firstname} data-id={this.props.admin.id} checked={this.state.checked} />
             <label for={this.props.admin.firstname}>{this.props.admin.firstname}</label>
           </div>
         </div>
         :
         <div>
           <div>
             <input className="checkbox" type="checkbox" onChange={this.addProjectUser} id={this.props.admin.firstname} data-id={this.props.admin.id} />
             <label for={this.props.admin.firstname}>{this.props.admin.firstname}</label>
           </div>
         </div>
       }
      </div>


    )
  }


}
