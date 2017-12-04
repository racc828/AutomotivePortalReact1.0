import React from 'react'
import ProjectsAdapter from '../../adapters/ProjectsAdapter'
import AdminProjectItem from './AdminProjectItem'

export default class AdminProject extends React.Component {

  constructor() {
    super()
    this.state = {
      firstname:"",
      lastname:"",
      projects: []
    }
  }

  componentDidMount() {
    ProjectsAdapter.getAdminProjects(this.props.admin.id)
    .then((data) => {
      this.setState({
        firstname: data.firstname,
        lastname: data.lastname,
        projects: data.projects
      })
    })
  }


  render() {
    return(
      <div>
        <p><strong>{this.state.firstname}</strong></p>
        <ul>
          {this.state.projects.map((project) => {
            return <AdminProjectItem project={project} />
          })}
        </ul>
      </div>
    )
  }


}
