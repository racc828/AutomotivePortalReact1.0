import React from 'react'


export default class AdminCheckBox extends React.Component {

  render() {
    return (
      <div>
        <input className="checkbox" type="checkbox" id={this.props.admin.firstname} data-id={this.props.admin.id} onChange={this.props.handleChangeCheckBox} />
        <label for={this.props.admin.firstname}>{this.props.admin.firstname}</label>
      </div>
    )
  }


}
