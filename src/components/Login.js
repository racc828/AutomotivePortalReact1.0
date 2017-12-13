import React from 'react'

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: ""
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
    let user = this.state
    this.props.getUser(user)
  }


  render() {
    return(
      <div className="row">
        <div className="container login-container">
            <h3 className="center-align text-primary">Donovan/Green</h3>
            <div className="col l6 login-box">
              <div className="z-depth-3">
                <h5 className="center-align"> Sign In </h5>
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <input name="email" type="email" placeholder="email" onChange={this.handleChange} />
                  <input name="password" type="password" placeholder="password" onChange={this.handleChange} />
                  <div className="right-align">
                    <button className="waves-effect waves-light btn" type="submit">Sign In</button>
                  </div>
                </form>
                {this.props.error ?
                  <p>Wrong email or password </p> : null
                }
              </div>
            </div>
        </div>
      </div>
    )
  }

}
