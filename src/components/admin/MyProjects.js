import React from 'react'
import MyProject from './MyProject'

export default class MyProjects extends React.Component {

  render() {
    return(
      <ul>
        {this.props.myProjects.map((project) => {
          return <MyProject project={project} />
        })}
      </ul>
    )
  }


}
