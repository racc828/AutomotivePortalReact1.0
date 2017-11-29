const path = 'http://localhost:3000/api/v1/projects'
export default class ProjectsAdapter {

  static addProject(project, start, end) {
    debugger
    return fetch(path,{
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        projectcategory_id: project.projectcategory_id,
        title: project.title,
        start:start,
        end: end
      })
    })
    .then( resp => resp.json())
  }


}

let headers = () => {
  const token = localStorage.getItem('token')
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `${token}`
  }
}
