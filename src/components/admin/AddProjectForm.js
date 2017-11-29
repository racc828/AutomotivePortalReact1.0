import React from 'react'
import ProjectCategoryOption from './ProjectCategoryOption'

export default class AddProjectForm extends React.Component {

  constructor() {
    super()
    this.state = {
      projectcategory_id: "",
      title: ""
    }
  }

  handleChange = (e) => {
      let property = e.target.name
      let value = e.target.value
            debugger
      this.setState({
        [property]: value
      })
    }

  handleSubmit = (e) => {
      e.preventDefault()
      let project = this.state
      let start = this.props.projectData.start.toLocaleString()
      let end = this.props.projectData.end.toLocaleString()
      this.props.addProject(project, start, end)
    }

  handleToggle = (e) => {
    if(e.target.value == "on"){
      this.setState({
        allDay:true
      })
    }
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="input-field col s12">
            <input onChange={this.handleChange} name="title" placeholder="Title" required/>
        </div>
        <select onChange={this.handleChange} name="projectcategory_id">
          <option> Choose a Category </option>
          {this.props.projectCategories.map ((category) => {
            return <ProjectCategoryOption category={category} />
          })}
        </select>
        <div className="align-left">
            <div className="switch">
               <label>
                All Day
                 <input onChange={this.handleToggle} type="checkbox"/>
                 <span className="lever"></span>
               </label>
             </div>
          </div>
          <div className="align-right pad-top">
            <button className="waves-effect waves-light btn"> Add Project  </button>
          </div>
        </form>
    )
  }


}
