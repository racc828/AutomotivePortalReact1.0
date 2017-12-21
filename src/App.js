import React, { Component } from 'react';
import './css/materialize.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types'
import Login from './components/Login'
import ClientHome from './components/client/ClientHome'
import AdminHome from './components/admin/AdminHome'
import SessionsAdapter from './adapters/SessionsAdapter'

class App extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor() {
    super()
    this.state = {
      currentUser: {},
      error:false
    }
  }


  componentDidMount(){
    SessionsAdapter.currentUser()
      .then( user => {
        this.setState({
          currentUser: user
        })
      })
    }

  //
  //   componentWillReceiveProps(){
  //   SessionsAdapter.currentUser()
  //     .then( user => {
  //       this.setState({
  //         currentUser: user
  //       })
  //     })
  //   }

  getUser = (user) => {
     return SessionsAdapter.getUser(user)
     .then( (userData) => {
       if(userData.error) {
         this.setState({
           error: true
         })
       } else {
         this.setState({
           currentUser: userData,
           error:false
         })
       }
       localStorage.setItem('token', userData.jwt)
     })
     .then(() => {
       if(this.state.currentUser.admin) {
          this.context.router.history.push("/adminHome")
       } else if (this.state.currentUser.admin == false) {
         this.context.router.history.push("/clientHome")
       } else {

       }
     })
   }

   logOut = () => {
      localStorage.token = ""
      this.setState({
        currentUser:{}
      })
      this.context.router.history.push("/")
    }

    // Rendering Pages bc of React router

    renderLogin = () => {
      return(
        <Login getUser={this.getUser} error={this.state.error} />
      )
    }

    renderClientHome = () => {
      return(
        <ClientHome currentUser={this.state.currentUser} logOut={this.logOut} />
      )
    }

    renderAdminHome = () => {
      return(
        <AdminHome currentUser={this.state.currentUser} logOut={this.logOut} />
      )
    }



  render() {
    if(this.state.currentUser.admin) {
      return(
        <div className="App">
          <Route exact path="/" render={this.renderAdminHome}/>
          <Route exact path="/adminHome" render={this.renderAdminHome}/>
        </div>
      )
    } else if(this.state.currentUser.admin == false) {
        return(
          <div className="App">
            <Route exact path="/" render={this.renderClientHome}/>
            <Route exact path="/clientHome" render={this.renderClientHome}/>
          </div>
        )
    } else {
      return (
        <div className="App">
          <Route exact path="/" render={this.renderLogin}/>
        </div>
      )
    }
  }
}

{/* <div className="App">
  <Route exact path="/" render={this.renderLogin}/>
  <Route exact path="/clientHome" render={this.renderClientHome}/>
  <Route exact path="/adminHome" render={this.renderAdminHome}/>
</div> */}

export default App;
