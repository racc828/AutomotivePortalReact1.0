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
    if(this.state.checked) {
      this.props.deactivateCats(this.props.category.id)
    } else {
      this.props.activateCats(this.props.category.id)
    }
  }

  render() {
    var style = {
      borderBottom: `4px solid ${this.props.category.color}`
    }
    return(
      <span>
         <input className="checkbox" type="checkbox" id={this.props.category.title} checked={this.state.checked} onChange={this.handleCheck} />
         <label style={style} for={this.props.category.title}>{this.props.category.title}</label>
       </span>
    )
  }
}
