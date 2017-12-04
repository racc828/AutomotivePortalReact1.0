import React from 'react'
import ClientNavigation from './ClientNavigation'
import ActiveClient from './ActiveClient'
import UsersAdapter from '../../adapters/UsersAdapter'
import AddClientForm from './AddClientForm'
import '../../css/admin.css'
import AdminHomeScreen from './AdminHomeScreen'

export default class AdminHome extends React.Component {
  constructor(){
    super()
    this.state = {
      currentUser: {},
      activeClient: null,
      clients: [],
      admins: [],
      addClientDropdown: false,
      userDropdown: false
    }
  }

  componentDidMount() {
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
        <div className="col l2 m2 side-navigation">
          <div className="side-nav-top">
            <h5 className="text-primary">Donovan/Green</h5>
            <div className="relative">
              <strong>{this.props.currentUser.firstname} {this.props.currentUser.lastname}</strong>
              <button className="caret-button"><i className="fa fa-caret-down" onClick={this.toggleUserDropdown}></i></button>
            </div>
            {this.state.userDropdown ? <button className="waves-effect waves-light btn" onClick={this.props.logOut}> LogOut </button> : null }
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
        <div className="col l10 m10 zero-side-pad">
          {this.state.activeClient === null ?
            <AdminHomeScreen /> :
            <ActiveClient admins={this.state.admins} activeClient={this.state.activeClient} />
          }
        </div>
      </div>
    )
  }


}
