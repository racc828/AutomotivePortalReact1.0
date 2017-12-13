import React from 'react'
import CalendarCheckBox from './CalendarCheckBox'

export default class CalendarCheckBoxes extends React.Component {

  constructor(){
    super()
    this.state = {
      checked: []
    }
  }



  render() {
    debugger
    return(
      <form className="inline">
        <span className="checkbox-container">
          {this.props.projectCategories.map((category) => {
            return <CalendarCheckBox activateCats={this.props.activateCats} deactivateCats={this.props.deactivateCats} filteredProjects={this.props.filteredProjects} category={category} />
          })}
        </span>
      </form>
    )
  }
}
