import React from 'react'
import ProjectCategoryOption from './ProjectCategoryOption'
import AdminCheckBox from './AdminCheckBox'

export default class AddProjectForm extends React.Component {

  constructor() {
    super()
    this.state = {
      projectcategory_id: "",
      title: "",
      admin: [],
      allDay: false,
      completed: false
    }
  }

  handleChange = (e) => {
      let property = e.target.name
      let value = e.target.value
      this.setState({
        [property]: value
      })
    }

  handleChangeCheckBox = (e) => {
    let admin_id = parseInt(e.target.dataset.id)
    if (e.target.checked) {
      this.setState({
        admin: [...this.state.admin, admin_id]
      })
    } else {
      let newarray = this.state.admin.filter((admin) => {
        return admin !== admin_id
      })
      this.setState({
        admin: newarray
      })
    }
  }

  handleSubmit = (e) => {
      e.preventDefault()
      let project = this.state
      let start = this.props.projectData.start.toLocaleString()
      let end = this.props.projectData.end.toLocaleString()
      this.props.addProject(project, start, end)
    }

  // handleToggle = (e) => {
  //   if(e.target.value == "on"){
  //     this.setState({
  //       allDay:true
  //     })
  //   }
  // }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="input-field col s12">
            <input onChange={this.handleChange} name="title" placeholder="Title" required/>
        </div>
        <select onChange={this.handleChange} name="projectcategory_id" required>
          <option value=""> Choose a Category </option>
          {this.props.projectCategories.map ((category) => {
            return <ProjectCategoryOption category={category} />
          })}
        </select>
      
          <div className="align-left margin-top">
            <h6><strong>Subscribe people to receive email notifications</strong></h6>
            {this.props.admins.map((admin) => {
              return <AdminCheckBox handleChangeCheckBox={this.handleChangeCheckBox} admin={admin} />
            })}

          </div>
          <div className="align-right pad-top">
            <button className="waves-effect waves-light btn"> Add Project  </button>
          </div>
        </form>
    )
  }


}
