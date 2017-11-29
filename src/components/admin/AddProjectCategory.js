import React from 'react'
import AddProjectCategoryForm from './AddProjectCategoryForm'


export default class AddProjectCategory extends React.Component {
  constructor() {
    super()
    this.state = {
      showAddProjectCategoryForm: false
    }
  }

  toggleAddProjectCategoryForm = () => this.setState({showAddProjectCategoryForm: !this.state.showAddProjectCategoryForm})

  closeProjectCategoryForm = () => {
    this.setState({
      showAddProjectCategoryForm: false
    })
  }


  render() {
    return(
      <div className="inline">
        <i className="fa fa-plus" onClick={this.toggleAddProjectCategoryForm}></i>
        {this.state.showAddProjectCategoryForm ? <AddProjectCategoryForm closeProjectCategoryForm={this.closeProjectCategoryForm} addProjectCategory={this.props.addProjectCategory} /> : null}
      </div>
    )
  }




}
