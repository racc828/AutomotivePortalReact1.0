import React from 'react'

export default class MyProject extends React.Component {

    render(){
      var style = {
        color: `${this.props.project.category_color}`
      }
      return(
        <li style={style}>
          {this.props.project.title}
        </li>
      )
    }



}
