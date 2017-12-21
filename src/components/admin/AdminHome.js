import React from 'react'
import ClientNavigation from './ClientNavigation'
import ActiveClient from './ActiveClient'
import UsersAdapter from '../../adapters/UsersAdapter'
import AddClientForm from './AddClientForm'
import '../../css/admin.css'
import AdminHomeScreen from './AdminHomeScreen'
import ProjectsAdapter from '../../adapters/ProjectsAdapter'
import SlideInToDoList from './SlideInToDoList'

export default class AdminHome extends React.Component {

  constructor(){
    super()
    this.state = {
      currentUser: {},
      activeClient: null,
      clients: [],
      admins: [],
      addClientDropdown: false,
      userDropdown: false,
      myProjects: [],
      loading:true,
      paneOpen: false
    }
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent
    UsersAdapter.getClients()
    .then((clients) => {
      this.setState({
        clients: clients
      })
    })
    UsersAdapter.getAdmins()
    .then((admins) => {
      this.setState({
        admins:admins
      })
    })
    ProjectsAdapter.getMyProjects()
    .then((data) => {
      this.setState({
        myProjects: data,
        loading:false
      })
    })
  }

  openPane = () => {
    this.setState({
      paneOpen:true
    })
  }

  closePane = () => {
    this.setState({
      paneOpen:false
    })
  }

  onBackButtonEvent = (e) => {
    e.preventDefault()
  }

  setActiveClient = (clientId) => {
    this.setState({
      activeClient: clientId
    })
  }

  addClient = (newClient) => {
    UsersAdapter.addClient(newClient)
    .then((newClientData) => {
      this.setState({
        clients: [...this.state.clients, newClientData]
      })
    })
  }

  toggleDropdown = () => this.setState({addClientDropdown: !this.state.addClientDropdown})

  toggleUserDropdown = () => this.setState({userDropdown: !this.state.userDropdown})

  closeClientDropdown = () => {
    this.setState({
      addClientDropdown:false
    })
  }

  render() {
    return(
      <div className="row">
      {this.state.loading ? <div className="loader-container"><div className="loader"></div></div> : null }
        <div className="col l3 m3 side-navigation">
          <div className="side-nav-top">
            <h5 className="text-primary">Donovan/Green</h5>
            <div className="relative">
              <strong>{this.props.currentUser.firstname} {this.props.currentUser.lastname}</strong>
              <div className="button-group">
                <button className="button-inline"><i className="fa fa-comment"></i></button>
                <button className="button-inline"><i className="fa fa-list" onClick={this.openPane}></i></button>
                <button className="button-inline"><i className="fa fa-cog" onClick={this.toggleUserDropdown}></i></button>
              </div>
            </div>
            {this.state.userDropdown ?
              <div className="userdropdown-container"><button className="waves-effect waves-light btn" onClick={this.props.logOut}> LogOut </button></div>
              : null }
          </div>
          <div className="nav-header">
            <h6>CLIENTS </h6>
            <button onClick={this.toggleDropdown} className="plus-button"><i className="fa fa-plus text-primary" aria-hidden="true"></i></button>
          </div>
          {this.state.addClientDropdown ?
            <AddClientForm closeClientDropdown={this.closeClientDropdown} addClient={this.addClient} />
            : null }
          <ClientNavigation setActiveClient={this.setActiveClient} clients={this.state.clients} />
        </div>
        <div className="col l9 m9 main-body zero-side-pad">
          {this.state.activeClient === null ?
            <AdminHomeScreen currentUser={this.props.currentUser} /> :
            <ActiveClient myProjects={this.state.myProjects} admins={this.state.admins} activeClient={this.state.activeClient} currentUser={this.props.currentUser}/>
          }
        </div>
        <SlideInToDoList openPane={this.openPane} closePane={this.closePane} paneStatus={this.state.paneOpen} myProjects={this.state.myProjects} currentUser={this.props.currentUser} admins={this.state.admins} />
      </div>
    )
  }


}
