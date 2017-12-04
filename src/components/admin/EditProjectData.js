import React from 'react'
import EditProjectTitleForm from './EditProjectTitleForm'
import EditProjectUsers from './EditProjectUsers'
import AddProjectComment from './AddProjectComment'

export default class EditProjectData extends React.Component {
  constructor() {
    super()
    this.state = {
      showEditTitle: false
    }
  }

  editTitle = (e) => {
    this.setState({
      showEditTitle: !this.state.showEditTitle
    })
  }

  closeEditTitle = () => {
    this.setState({
      showEditTitle:false
    })
  }


  render() {
    return(
      <div>
        {this.state.showEditTitle ? <EditProjectTitleForm closeEditTitle={this.closeEditTitle} editProjectTitle={this.props.editProjectTitle}
          projectId={this.props.projectData.id} title={this.props.projectData.title} /> : <div className="relative"><p><strong>{this.props.projectData.title}</strong></p> <button className="edit-icon-right"><i className="fa fa-pencil" onClick={this.editTitle}></i></button></div> }
          {this.props.projectComments.map((comment) => {
            return (
              <div className="comment">
                <p>{comment.username}: </p>
                <p>{comment.comment_text}</p>
              </div>
            )
          })}
          <AddProjectComment addProjectComment={this.props.addProjectComment} />
          <h6>Active Project Admins:</h6>
          <EditProjectUsers projectUsers={this.props.projectUsers} />
      </div>
    )
  }


}
