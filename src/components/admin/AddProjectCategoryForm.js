import React from 'react'

export default class AddProjectCategoryForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: "",
      color: "#000000"
    }
  }

  handleChange = (e) => {
    let property = e.target.name
    let value = e.target.value
    this.setState({
      [property]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let projectCategory = this.state
    this.props.addProjectCategory(projectCategory)
    this.props.close()
  }


  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="title" onChange={this.handleChange} placeholder="Category Name" required/>
        <h6>Category Color:</h6>
        <input className="color" type="color" name="color" onChange={this.handleChange} />
        <div>
          <div className="align-right">
            <button className="waves-effect waves-light btn" type="submit">
              Add Category
            </button>
          </div>
        </div>
      </form>
    )
  }


}
