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
    return(
      <form>
        <div className="checkbox-container">
          {this.props.projectCategories.map((category) => {
            return <CalendarCheckBox filteredProjects={this.props.filteredProjects} category={category} />
          })}
        </div>
      </form>
    )
  }
}
