import React from 'react'
import { render } from 'react-dom';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import PaneTabs from './PaneTabs'
import ProjectsAdapter from '../../adapters/ProjectsAdapter'

export default class SlideInToDoList extends React.Component{
  constructor(props) {
    super(props)
    this.state ={
      paneOpen: false,
      myProjects: []
    }
  }

  componentDidMount() {
    ProjectsAdapter.getMyProjects()
    .then((data) => {
      this.setState({
        myProjects: data
      })
    })
  }


  openPane = () => {
    this.setState({
      paneOpen:true
    })
  }



  render() {
    return(
      <span>
        <button onClick={this.openPane} className="slide-in-btn waves-effect waves-light btn"><i className="fa fa-list"></i> </button>
        <SlidingPane
                isOpen={ this.state.paneOpen }
                title='Task Lists'
                width='40%'
                onRequestClose={ () => {
                    this.setState({ paneOpen: false });
                } }>
                <PaneTabs myProjects={this.state.myProjects} currentUser={this.props.currentUser} admins={this.props.admins} />
        </SlidingPane>
      </span>
    )
  }





}
