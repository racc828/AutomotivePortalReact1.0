import React from 'react'

const ProjectCategoryOption = (props) => {
  return (
    <option value={props.category.id} >{props.category.title}</option>
  );
};

export default ProjectCategoryOption;
