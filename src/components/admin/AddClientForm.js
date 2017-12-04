import React from 'react'

export default class AddClientForm extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      company: "",
      firstname: "",
      lastname: "",
      password: "",
      username:"",
      admin:false
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
    let newClient = this.state
    this.props.addClient(newClient)
    this.props.closeClientDropdown()
  }


  render() {
    return(
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <h6> Add Client </h6>
          <input name="company" type="text" onChange={this.handleChange} placeholder="Company" required/>
          <input name="firstname" type="text" onChange={this.handleChange} placeholder="First Name" required/>
          <input name="lastname" type="text" onChange={this.handleChange} placeholder="Last Name" required/>
          <input name="email" type="text" onChange={this.handleChange} placeholder="Email" required/>
          <input name="username" type="text" onChange={this.handleChange} placeholder="Username" required/>
          <input name="password" type="password" onChange={this.handleChange} placeholder="Password" required/>
          <button className="waves-effect waves-light btn" type="submit">Add</button>
        </form>
      </div>
    )
  }

}
