import React from 'react'

export default class EditProjectTitleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title
    }
  }


  handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let newTitle = this.state.title
    this.props.editProjectTitle(newTitle, this.props.projectId )
    this.props.closeEditTitle()
  }

  render() {
    return(
      <div className="relative">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} name="title" type="text" value={this.state.title}/>
          <button className="edit-icon-right" type="submit"><i className="fa fa-floppy-o"></i></button>
        </form>
      </div>
    )
  }

}
