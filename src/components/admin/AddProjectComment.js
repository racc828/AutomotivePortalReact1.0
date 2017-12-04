import React from 'react'

export default class AddProjectComment extends React.Component {
  constructor() {
    super()
    this.state = {
      clientView:false,
      comment: ""
    }
  }


  handleChange = (e) => {
    let property = e.target.name
    let value = e.target.value
    this.setState({
      [property]: value
    })
  }

  handleToggle = (e) => {
    if(e.target.value == "on"){
      this.setState({
        clientView:true
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let comment = this.state
    this.props.addProjectComment(comment)
    this.setState({
      comment: ""
    })
  }


  render() {
    return(
      <div>
        <h6>Add Comment:</h6>
        <form onSubmit={this.handleSubmit}>
          <textarea name="comment" value={this.state.comment} onChange={this.handleChange}/>
          <div className="switch margin-bottom">
             <label>
              Client View
               <input onChange={this.handleToggle} type="checkbox"/>
               <span className="lever"></span>
             </label>
           </div>
          <button className="btn" type="submit">Comment</button>
        </form>

      </div>
    )
  }
}
