import React from 'react'
import ProjectsAdapter from '../../adapters/ProjectsAdapter'
import CommentsAdapter from '../../adapters/CommentsAdapter'

export default class EditProject extends React.Component {
  constructor() {
    super()
    this.state = {
      clientProjectComments: []
    }
  }

  componentDidMount() {
    ProjectsAdapter.showClientComments(this.props.projectData.id)
    .then((data) => {
      this.setState({
        clientProjectComments: data
      })
    })
  }

  render() {
    return(
      <div>
        <div className="modal-header">
           <i className="fa fa-times float-right-times" onClick={this.props.close}></i>
           <h5> Add Comment </h5>
         </div>
         <div className="form-container">
           {this.state.clientProjectComments.map((comment) => {
             return (
               <div className="comment">
                 <p>{comment.username}: </p>
                 <p>{comment.comment_text}</p>
               </div>
             )
           })}
         </div>
      </div>
    )
  }

}
