import React from 'react'
import AddProjectCategoryForm from './AddProjectCategoryForm'
import Modal, {closeStyle} from 'simple-react-modal'


export default class AddProjectCategory extends React.Component {
  constructor() {
    super()
    this.state = {
        addProjectCategoryModalOpen: false
    }
  }


  close = () => {
    this.setState({
      addProjectCategoryModalOpen: false
    })
  }

  toggleAddProjectCategoryForm = () => {
    this.setState({
      addProjectCategoryModalOpen:true
    })
  }


  render() {
    return(
      <span>
        <span className="plus">
          <i className="fa fa-plus" onClick={this.toggleAddProjectCategoryForm}></i>
        </span>
        {this.state.addProjectCategoryModalOpen ?

          <Modal
            closeOnOuterClick={true}
            show={this.state.addProjectCategoryModalOpen}
            onClose={this.close}
            style={{background: 'rgba(0,0,0, .4)'}}
            // containerStyle={{width: ''}}
             >
             <div className="modal-header">
                <i className="fa fa-times float-right-times" onClick={this.close}></i>
                <h5> Add Category </h5>
              </div>
              <div className="form-container">
               <AddProjectCategoryForm
                 close={this.close} closeProjectCategoryForm={this.closeProjectCategoryForm} addProjectCategory={this.props.addProjectCategory} />
             </div>
          </Modal>

          : null}
      </span>
    )
  }




}
