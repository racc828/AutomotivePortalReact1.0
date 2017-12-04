import React from 'react'
import AddProjectForm from './AddProjectForm'

export default class AddProject extends React.Component {
  constructor() {
    super()

  }

  render() {
    return(
      <div>
        <div className="modal-header">
           <i className="fa fa-times float-right-times" onClick={this.props.close}></i>
           <h5> Add Project </h5>
         </div>
         <div className="form-container">
           <AddProjectForm admins={this.props.admins} projectCategories={this.props.projectCategories} projectData={this.props.projectData} addProject={this.props.addProject} />
         </div>
      </div>
    )
  }
}
