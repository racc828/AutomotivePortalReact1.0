import React from 'react'

export default class AddProjectComment extends React.Component {
  constructor() {
    super()
    this.state = {
      clientView:false,
      comment: "",
      file: "",
      imagePreviewUrl: ""
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

  handleToggle = (e) => {
    if(e.target.checked == true){
      this.setState({
        clientView:true
      })
    } else {
      this.setState({
        clientView:false
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

  handleFileChange = (e) => {
    debugger
    // NOTE: this will open the file reader on ur computer
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }


  render() {
    let imagePreviewUrl = this.state.imagePreviewUrl;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img className="thumbnail-img" src={imagePreviewUrl} />);
    } else {
      imagePreview = (<div></div>);
    }

    var style = {
      background: `${this.props.color}`
    }
    return(
      <div>
        <h6>Add Comment:</h6>
        <form onSubmit={this.handleSubmit}>
          <textarea className="margin-bottom" name="comment" value={this.state.comment} onChange={this.handleChange}/>
          <div className="switch margin-bottom">
             <label>
              Client View
               <input onChange={this.handleToggle} type="checkbox"/>
               <span className="lever"></span>
             </label>
           </div>
           <div className="margin-bottom">
             <input onChange={this.handleFileChange}
               accept="image/*" type="file" name="file" />
           </div>
           <div>
              {imagePreview}
           </div>
          <button style={style} className="btn margin-bottom" type="submit">Comment</button>
        </form>

      </div>
    )
  }
}
