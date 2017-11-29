import React from 'react'

export default class TopClientNavigation extends React.Component {


  switchSection = (e) => {
    this.props.switchSection(parseInt(e.target.dataset.topnavlist))
  }


  render(){
    return(
      <div>
        <ul>
          <li data-topnavlist="1" onClick={this.switchSection}>Calendar</li>
          <li data-topnavlist="2" onClick={this.switchSection}>Creative</li>
          <li data-topnavlist="3" onClick={this.switchSection}>Analytics</li>
        </ul>
      </div>
    )
  }
}
