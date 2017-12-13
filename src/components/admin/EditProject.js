import React from 'react'
import EditProjectData from './EditProjectData'
import ProjectsAdapter from '../../adapters/ProjectsAdapter'
import CommentsAdapter from '../../adapters/CommentsAdapter'

export default class EditProject extends React.Component {
  constructor() {
    super()
    this.state = {
      projectUsers: [],
      projectComments: []
    }
  }

  componentDidMount() {
    ProjectsAdapter.getProjectUsers(this.props.projectData.id)
    .then((data) => {
      this.setState({
        projectUsers: data.users,
        projectComments: data.comments
      })
    })
  }


  addProjectComment = (projectComment) => {
    CommentsAdapter.addComment(projectComment, this.props.projectData.id)
    .then((data) => {
      debugger
      this.setState({
        projectComments: [...this.state.projectComments, data]
      })
    })
  }

  deleteProject = () => {
      this.props.deleteProject(this.props.projectData.id)
  }



  render() {
    return(
      <div>
         <div className="form-container">
           <button onClick={this.deleteProject} className="btn trashcan">
             <i className="fa fa-trash"></i>
           </button>
           <EditProjectData markProjectCompleted={this.props.markProjectCompleted} close={this.props.close} addProjectComment={this.addProjectComment} editProjectTitle={this.props.editProjectTitle} projectComments={this.state.projectComments} projectData={this.props.projectData} projectUsers={this.state.projectUsers} />
         </div>
      </div>
    )
  }

}
