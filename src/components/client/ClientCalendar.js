import React, { Component } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import UsersAdapter from '../../adapters/UsersAdapter'
import ProjectsAdapter from '../../adapters/ProjectsAdapter'
import CalendarCheckBoxes from './CalendarCheckBoxes'
import Modal, {closeStyle} from 'simple-react-modal'
import ProjectCategoriesAdapter from '../../adapters/ProjectCategoriesAdapter'
import AddProjectComment from './AddProjectComment'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'



BigCalendar.momentLocalizer(moment);

export default class ClientCalendar extends React.Component {

    constructor(props, context) {
      super(props, context)
        this.state = {
          projectCategories: [],
          filteredProjects: [],
          editProjectModalOpen: false,
          projectData: null,
          projects: [],
          deactivateCats: []

        }
    }

    componentDidMount() {
      UsersAdapter.getProjectCategories(this.props.currentUser.id)
      .then(data => {
        this.setState({
          projectCategories: data.projectcategories,
          filteredProjects: data.projects
        })
      })
    }

  componentWillReceiveProps(props) {
    UsersAdapter.getProjectCategories(props.currentUser.id)
    .then(data => {
      this.setState({
        projectCategories: data.projectcategories,
        filteredProjects: data.projects
      })
    })
  }

  deactivateCats = (projectId) => {
    this.setState({
      deactivateCats:[...this.state.deactivateCats, projectId]
    }, () => {
      ProjectsAdapter.filterProjects(this.state.deactivateCats, this.props.currentUser.id)
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
      ProjectsAdapter.filterProjects(this.state.deactivateCats, this.props.currentUser.id)
      .then((data) => {
        this.setState({
          filteredProjects: data
        })
      })
    })
  }

  close = () => {
    this.setState({
      editProjectModalOpen:false,
      projectData: null
    })
  }

  renderCommentEvent = (data) => {
    this.setState({
      editProjectModalOpen:true,
      projectData: data
    })
  }

  // downloadPdf = () => {
  //      html2canvas(document.body).then(function(canvas) {
  //        let imgData = canvas.toDataURL('image/png');
  //        let pdf = new jsPDF();
  //        pdf.addImage(imgData, 'JPEG', 0, 0);
  //        pdf.save("download.pdf");
  //      });
  // }


  eventStyleGetter = (event, start, end, isSelected) => {
      var backgroundColor = event.category_color;
      var style = {
          backgroundColor: backgroundColor,
          borderRadius: '0px',
          opacity: 0.8,
          color: 'black',
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
              <h5>{this.props.currentUser.company}</h5>
              <i className="fa fa-download" onClick={this.downloadPdf}></i>
              <CalendarCheckBoxes activateCats={this.activateCats} deactivateCats={this.deactivateCats} projectCategories={this.state.projectCategories}/>
              {this.state.editProjectModalOpen ?
                <Modal
                  closeOnOuterClick={true}
                  show={this.state.editProjectModalOpen}
                  onClose={this.close}
                  containerStyle={{width: '70%'}}
                  style={{background: 'rgba(0,0,0, .4)'}}>
                  <AddProjectComment
                    close={this.close} projectData={this.state.projectData} />
                </Modal> :
                null}
              <BigCalendar
                eventPropGetter={(this.eventStyleGetter)}
                popup
                selectable
                tep={60}
                culture='en-GB'
                 onSelectEvent={this.renderCommentEvent}
                events={this.state.filteredProjects}
                views={['month', 'agenda']}/>
            </div>
          </div>
        </div>
      );
    }
  }
