import React from 'react'
import MyProjects from './MyProjects'
import AdminProjects from './AdminProjects'

export default class PaneTabs extends React.Component {
  constructor() {
    super()
    this.state = {
      myProjects: true,
      adminProjects:false
    }
  }


  closeAdminProjects = () => {
    this.setState({
      adminProjects: false,
      myProjects: true
    })
  }

  closeMyProjects = () => {
    this.setState({
      adminProjects: true,
      myProjects: false
    })
  }

  render() {
    return(
      <div>
        {this.state.myProjects ?
          <div>
            <button className="active-tab"> My Projects </button>
            <button className="non-active-tab" onClick={this.closeMyProjects}> Admin Projects </button>
            <MyProjects currentUser={this.props.currentUser} myProjects={this.props.myProjects} />
          </div>
           :
           <div>
             <button className="non-active-tab" onClick={this.closeAdminProjects}> My Projects </button>
             <button className="active-tab"> Admin Projects </button>
             <AdminProjects admins={this.props.admins} />
           </div>

        }
      </div>
    )
  }


}
