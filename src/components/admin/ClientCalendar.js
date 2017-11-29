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

BigCalendar.momentLocalizer(moment);

export default class ClientCalendar extends React.Component {

    constructor(props, context) {
      super(props, context)
        this.state = {
          projectCategories: [],
          filteredProjects: [],
          addProjectModalOpen:false,
          projectData: null,
          projects: []
        }
    }

    componentDidMount() {
      UsersAdapter.getProjectCategories(this.props.activeClient.id)
      .then(data => {
        this.setState({
          projectCategories: data,
        })
      })
    }

  componentWillReceiveProps(props) {
    UsersAdapter.getProjectCategories(props.activeClient.id)
    .then(data => {
      this.setState({
        projectCategories: data
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
      this.setState({
        addProjectModalOpen: true,
        projectData: data
      })
    }

  addProject = (event, start, end) => {
      ProjectsAdapter.addProject(event,start, end, this.props.activeClient.id)
      .then((data) => {
        this.setState({
          addProjectModalOpen: false,
          projectData: null
        })
      })
    }

  close = () => {
    this.setState({
      addProjectModalOpen:false,
      projectData: null
    })
  }

  filteredProjects = (filteredProject) => {
    this.setState({
      filteredProjects: [...this.state.filteredProjects, filteredProject]
    })
  }


    render() {

      return (
        <div>
          <div className="calendar-outter-container">
            <div className="calendar-inner-container">
              <CalendarCheckBoxes filteredProjects={this.filteredProjects} projectCategories={this.state.projectCategories}/>
              {this.state.addProjectModalOpen ?
                <Modal
                  closeOnOuterClick={true}
                  show={this.state.addProjectModalOpen}
                  onClose={this.close}
                  style={{background: 'rgba(0,0,0, .4)'}}
                  // containerStyle={{width: ''}}
                   >
                   <AddProject close={this.close} projectData={this.state.projectData} addProject={this.addProject} projectCategories={this.state.projectCategories} />
                </Modal>
                  : null}
              <AddProjectCategory addProjectCategory={this.addProjectCategory} />
              <BigCalendar
                popup
                selectable
                tep={60}
                culture='en-GB'
                // onSelectEvent={this.editEvent}
                onSelectSlot={this.renderAddProject}
                events={this.state.filteredProjects}
                views={['month', 'agenda']}/>
            </div>
          </div>
        </div>
      );
    }
  }
