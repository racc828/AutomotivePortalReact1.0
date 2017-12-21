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
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


BigCalendar.momentLocalizer(moment);


export default class ClientCalendar extends React.Component {



    constructor(props, context) {
      var dateObj = new Date();
      var months = [ "January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December" ];
      var month = months[dateObj.getMonth()]
      var year = dateObj.getUTCFullYear()
      var monthYear = `${month} / ${year}`
      super(props, context)
        this.state = {
          projectCategories: [],
          filteredProjects: [],
          addProjectModalOpen:false,
          editProjectModalOpen: false,
          projectData: null,
          projects: [],
          deactivateCats: [],
          SlideInToDoListVisible: false,
          loading:true,
          monthLabel: monthYear,
          view:"calendar"

        }
    }

    // componentDidMount() {
    //   debugger
    //   this.setState({
    //     loading:false
    //   })
    // }


  componentWillReceiveProps(nextProps) {
    console.log(nextProps.activeClient.id)
    UsersAdapter.getProjectCategories(nextProps.activeClient.id)
    .then(data => {
      debugger
      console.log(data)
      this.setState({
        projectCategories: data.projectcategories,
        filteredProjects: data.projects,
        loading:false
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

  downloadPdf = () => {

    html2canvas(document.querySelector("#calendar")).then(canvas => {
        let imgData = canvas.toDataURL('image/jpeg', 1.0);
        let pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 10, 10, 185, 140);
        pdf.save("download.pdf");
      });

  }

   getCalendarEvents = (date) => {
      const {project} = this;
      const startDate = moment(date).add(-1, 'month').toDate();
      const endDate = moment(date).endOf('month').toDate();
      const currentMonth = moment(date).endOf('month').format('MMMM YYYY');
      const monthToday = moment(date).endOf('month').format('MMM');
      let nextCurrentMonth = moment(date).add(1, 'month').format('MMM');

      this.setState({
        monthLabel: currentMonth,
        currentMonth: monthToday,
        nextMonth: nextCurrentMonth
    });

  }

  getCustomToolbar = (toolbar) => {
    this.toolbarDate = toolbar.date;

    const goToMonthView = () => {
    toolbar.onViewChange('month')
    this.setState({
      view: "calendar"
    })
  }

    const goToAgendaView = () => {
    toolbar.onViewChange('agenda')
    this.setState({
      view: "agenda"
    })
  }

    const goToBack = () => {
      let mDate = toolbar.date;
      let newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth() - 1,
        1);
      toolbar.onNavigate('prev', newDate);
      this.getCalendarEvents(newDate);

    }
    const goToNext = () => {
      let mDate = toolbar.date;
      let newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth() + 1,
        1);
      toolbar.onNavigate('next', newDate);
      this.getCalendarEvents(newDate);

    }
    return (
      <div className="toolbar-container">
        <div className="navigation-buttons">
          <button className="toolbar-btn" onClick={goToBack}>
            <i className="fa fa-caret-left"></i>
          </button>
          <span className='label-date'>{this.state.monthLabel}</span>
          <button className="toolbar-btn" onClick={goToNext}>
              <i className="fa fa-caret-right"></i>
          </button>
        </div>
        <div className="filter-container">
          {this.state.view === "calendar" ?
          <div>
            <button className="bg-filter-off active" onClick={goToMonthView}><span className="label-filter-off">Calendar</span></button>
            <button className="bg-filter-off" onClick={goToAgendaView}><span className="label-filter-off">List View</span></button>
          </div>
          :
          <div>
            <button className="bg-filter-off" onClick={goToMonthView}><span className="label-filter-off">Calendar</span></button>
            <button className="bg-filter-off active" onClick={goToAgendaView}><span className="label-filter-off">List View</span></button>
          </div>
        }

         </div>

      </div>
    )
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
          color: 'fff',
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
          <div className="calendar-outter-container" >
            <div className="calendar-inner-container">
              {this.state.loading ? <div className="loader-container"><div className="loader"></div></div> : null }
              <i className="fa fa-download" onClick={this.downloadPdf}></i>
              <div className="inline-flex">
                <CalendarCheckBoxes  activateCats={this.activateCats} deactivateCats={this.deactivateCats} projectCategories={this.state.projectCategories}/>
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
                      <EditProject admins={this.props.admins} markProjectCompleted={this.markProjectCompleted} deleteProject={this.deleteProject} editProjectTitle={this.editProjectTitle} close={this.close} projectData={this.state.projectData} />
                    </Modal> :
                    null}
                <AddProjectCategory addProjectCategory={this.addProjectCategory} />
              </div>
              <BigCalendar
                eventPropGetter={(this.eventStyleGetter)}
                popup
                selectable
                tep={60}
                culture='en-GB'
                onSelectEvent={this.renderEditEvent}
                onSelectSlot={this.renderAddProject}
                events={this.state.filteredProjects}
                views={['month', 'agenda']}
                defaultDate={new Date()}
                dayFormat={'ddd d/MM'}
                ref={c => { this.bigCalendar = c } }
                components={{
                  event: this.getCustomEvent,
                  toolbar: this.getCustomToolbar
                }}/>
            </div>
          </div>
        </div>
      );
    }
  }
