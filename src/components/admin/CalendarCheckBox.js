import React from 'react'
import styler from 'react-styling'

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

    // var styles = {
    //   color: `${this.props.category.color}`
    // }

    const style = styler
    `
        .label {
          color: ${this.props.category.color};
        }
    `
    return(
      <span>
         <input data-html2canvas-ignore className="check-box" type="checkbox" id={this.props.category.title} checked={this.state.checked} onChange={this.handleCheck} />
         <label style={style.label} for={this.props.category.title}>{this.props.category.title}</label>
       </span>
    )
  }
}
