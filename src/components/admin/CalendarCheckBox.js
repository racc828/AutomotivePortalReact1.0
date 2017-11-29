import React from 'react'

export default class CalendarCheckBox extends React.Component {

  constructor() {
    super()
    this.state = {
      checked:true
    }
  }


  handleCheck = (e) => {
    this.setState({
      checked: !this.state.checked
    })
  }


  render() {
    return(
      <span>
         <input className="checkbox" type="checkbox" id={this.props.category.title} checked={this.state.checked} onChange={this.handleCheck} />
         <label for={this.props.category.title}>{this.props.category.title}</label>
       </span>
    )
  }
}
