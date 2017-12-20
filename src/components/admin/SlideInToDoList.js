import React from 'react'
import { render } from 'react-dom';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import PaneTabs from './PaneTabs'
import ProjectsAdapter from '../../adapters/ProjectsAdapter'

export default class SlideInToDoList extends React.Component{





  render() {
    return(
      <span>
        <SlidingPane
                isOpen={this.props.paneStatus}
                title='Task Lists'
                width='25%'
                from='left'
                onRequestClose={this.props.closePane}>
                <PaneTabs myProjects={this.props.myProjects} currentUser={this.props.currentUser} admins={this.props.admins} />
        </SlidingPane>
      </span>
    )
  }





}
