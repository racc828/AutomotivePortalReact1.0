import React from 'react'
import EditProjectTitleForm from './EditProjectTitleForm'
import EditProjectUsers from './EditProjectUsers'
import AddProjectComment from './AddProjectComment'
import styler from 'react-styling'


export default class EditProjectData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditTitle: false,
      completed: this.props.projectData.completed
    }
  }

  editTitle = (e) => {
    debugger
    this.setState({
      showEditTitle: !this.state.showEditTitle
    })
  }

  closeEditTitle = () => {
    this.setState({
      showEditTitle:false
    })
  }

  handleToggle = (e) => {
    if(e.target.checked == true){
      let completed = e.target.checked
      this.props.markProjectCompleted(completed, this.props.projectData.id)
      this.setState({
        completed: completed
      })
    } else {
      let notCompleted = e.target.checked
      this.props.markProjectCompleted(notCompleted, this.props.projectData.id)
      this.setState({
        completed: notCompleted
      })
    }
  }


  render() {

    const style = styler
    `
        .bg {
          background:${this.props.projectData.category_color}
        }
        .switch label input:checked,.lever:after {
          background-color:${this.props.projectData.category_color}
        }
    `
    return(
      <div>
        {this.state.showEditTitle ?
          <div className="modal-header" style={style}>
            <EditProjectTitleForm closeEditTitle={this.closeEditTitle} editProjectTitle={this.props.editProjectTitle}
            projectId={this.props.projectData.id} title={this.props.projectData.title} />
          </div> :
          <div className="modal-header" style={style.bg}>
             <i className="fa fa-times float-right-times" onClick={this.props.close}></i>
             <h5 onDoubleClick={this.editTitle}> <strong>{this.props.projectData.title}</strong> </h5>
           </div> } <div className="switch margin-bottom">
           <label>
            Completed
             <input onChange={this.handleToggle} type="checkbox" checked={this.state.completed} />
             <span className="lever"></span>
           </label>
         </div>
          {this.props.projectComments.map((comment) => {
            return (
              <div className="comment">
                <p>{comment.username}: </p>
                <p>{comment.comment_text}</p>
              </div>
            )
          })}
          <AddProjectComment color={this.props.projectData.category_color} addProjectComment={this.props.addProjectComment} />
          <h6>Active Project Admins:</h6>
          <EditProjectUsers admins={this.props.admins} projectUsers={this.props.projectUsers} addProjectUser={this.props.addProjectUser} />
      </div>
    )
  }


}
