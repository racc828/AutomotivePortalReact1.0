import React, { Component } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import UsersAdapter from '../../adapters/UsersAdapter'
import ProjectsAdapter from '../../adapters/ProjectsAdapter'
import CalendarCheckBoxes from './CalendarCheckBoxes'
import Modal, {closeStyle} from 'simple-react-modal'
import ProjectCategoriesAdapter from '../../adapters/ProjectCategoriesAdapter'
import AddProjectCategory from './AddProjectCategory'
import AddProject from './AddProject'
import EditProject from './EditProject'
import SlideInToDoList from './SlideInToDoList'


BigCalendar.momentLocalizer(moment);

export default class ClientCalendar extends React.Component {

    constructor(props, context) {
      super(props, context)
        this.state = {
          projectCategories: [],
          filteredProjects: [],
          addProjectModalOpen:false,
          editProjectModalOpen: false,
          projectData: null,
          projects: [],
          deactivateCats: [],
          SlideInToDoListVisible: false

        }
    }

    // componentDidMount() {
    //   UsersAdapter.getProjectCategories(this.props.activeClient.id)
    //   .then(data => {
    //     this.setState({
    //       projectCategories: data.projectcategories,
    //       filteredProjects: data.projects
    //     })
    //   })
    // }

  componentWillReceiveProps(props) {
    UsersAdapter.getProjectCategories(props.activeClient.id)
    .then(data => {
      this.setState({
        projectCategories: data.projectcategories,
        filteredProjects: data.projects
      })
    })
  }

  addProjectCategory = (projectCategory) => {
    ProjectCategoriesAdapter.addProjectCategory(projectCategory, this.props.activeClient.id)
    .then((data) => {
      this.setState({
        projectCategories: [...this.state.projectCategories, data]
      })
    })
  }

  renderAddProject = (data) => {
    if(this.state.projectCategories.length === 0) {
      alert("You must add a category first")
    }else {
      this.setState({
        addProjectModalOpen: true,
        projectData: data
      })
    }
  }

  addProject = (event, start, end) => {
      ProjectsAdapter.addProject(event,start, end, this.props.activeClient.id)
      .then((data) => {
        this.setState({
          addProjectModalOpen: false,
          projectData: null,
          filteredProjects: [...this.state.filteredProjects, data]
        })
      })
    }

  close = () => {
    this.setState({
      addProjectModalOpen:false,
      editProjectModalOpen:false,
      projectData: null
    })
  }

  deactivateCats = (projectId) => {
    this.setState({
      deactivateCats:[...this.state.deactivateCats, projectId]
    }, () => {
      ProjectsAdapter.filterProjects(this.state.deactivateCats, this.props.activeClient.id)
      .then((data) => {
        this.setState({
          filteredProjects: data
        })
      })
    })
  }

  activateCats = (activateProjectId) => {
    let newarray = this.state.deactivateCats.filter((category) => {
      return category !== activateProjectId
    })
    this.setState({
      deactivateCats: newarray
    }, () => {
      ProjectsAdapter.filterProjects(this.state.deactivateCats, this.props.activeClient.id)
      .then((data) => {
        this.setState({
          filteredProjects: data
        })
      })
    })
  }

  renderEditEvent = (data) => {
    debugger
    this.setState({
      editProjectModalOpen:true,
      projectData: data
    })
  }

  editProjectTitle = (newTitle, projectId) => {
    ProjectsAdapter.editProjectTitle(newTitle, projectId)
    .then((data) => {
      let index = this.state.filteredProjects.findIndex(project=> project.id === data.id)

      this.setState({
        filteredProjects: [
         ...this.state.filteredProjects.slice(0,index),
         Object.assign({}, this.state.filteredProjects[index], data),
         ...this.state.filteredProjects.slice(index+1)
       ],
       projectData: data
     });
    })
  }

  markProjectCompleted = (value, projectId) => {
    ProjectsAdapter.markProjectCompleted(value, projectId)
    .then((data) => {
      let index = this.state.filteredProjects.findIndex(project=> project.id === data.id)

      this.setState({
        filteredProjects: [
         ...this.state.filteredProjects.slice(0,index),
         Object.assign({}, this.state.filteredProjects[index], data),
         ...this.state.filteredProjects.slice(index+1)
       ],
       projectData: data
     });
    })
  }

  deleteProject = (projectId) => {
    ProjectsAdapter.deleteProject(projectId)
    .then((data) => {
      let newarray = this.state.filteredProjects.filter((project) => {
        return project.id !== projectId
      })
      this.setState({
        editProjectModalOpen:false,
        filteredProjects: newarray
      })
    })
  }

  eventStyleGetter = (event, start, end, isSelected) => {
      var backgroundColor = event.category_color;
      var completed = ""
      if (event.completed) {
         completed = "line-through"
      } else {
         completed = "none"
      }
      var style = {
          backgroundColor: backgroundColor,
          borderRadius: '0px',
          opacity: 0.8,
          color: 'black',
          textDecoration: completed,
          border: '0px',
          display: 'block'
      };
      return {
          style: style
      };
  }

    render() {

      return (
        <div>
          <div className="calendar-outter-container">
            <div className="calendar-inner-container">
              <CalendarCheckBoxes activateCats={this.activateCats} deactivateCats={this.deactivateCats} projectCategories={this.state.projectCategories}/>
              <SlideInToDoList currentUser={this.props.currentUser} admins={this.props.admins} />
              {this.state.addProjectModalOpen ?
                <Modal
                  closeOnOuterClick={true}
                  show={this.state.addProjectModalOpen}
                  onClose={this.close}
                  style={{background: 'rgba(0,0,0, .4)'}}
                  // containerStyle={{width: ''}}
                   >
                   <AddProject admins={this.props.admins} close={this.close} projectData={this.state.projectData} addProject={this.addProject} projectCategories={this.state.projectCategories} />
                </Modal>
                  : null}
                {this.state.editProjectModalOpen ?

                  <Modal
                    closeOnOuterClick={true}
                    show={this.state.editProjectModalOpen}
                    onClose={this.close}
                    containerStyle={{width: '70%'}}
                    style={{background: 'rgba(0,0,0, .4)'}}>
                    <EditProject markProjectCompleted={this.markProjectCompleted} deleteProject={this.deleteProject} editProjectTitle={this.editProjectTitle} close={this.close} projectData={this.state.projectData} />
                  </Modal> :
                  null}
              <AddProjectCategory addProjectCategory={this.addProjectCategory} />
              <BigCalendar
                eventPropGetter={(this.eventStyleGetter)}
                popup
                selectable
                tep={60}
                culture='en-GB'
                onSelectEvent={this.renderEditEvent}
                onSelectSlot={this.renderAddProject}
                events={this.state.filteredProjects}
                views={['month', 'agenda']}/>
            </div>
          </div>
        </div>
      );
    }
  }
