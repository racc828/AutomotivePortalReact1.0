// const path = 'http://localhost:3000/api/v1/projects'

const path = 'https://dg-automotive-portal-backend.herokuapp.com/api/v1/projects'
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
        end: end,
        completed: project.completed,
        admins: project.admin
      })
    })
    .then( resp => resp.json())
  }

  static filterProjects(projectCategoriesDeactivate, activeClient) {
    return fetch(`${path}/filter_projects`,{
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        deactivatedCats: projectCategoriesDeactivate,
        activeClient: activeClient
      })
    })
    .then( resp => resp.json())
  }

  static markProjectCompleted(value, projectId) {
    debugger
    return fetch(`${path}/mark_project_completed`,{
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        project_id: projectId,
        completed: value
      })
    })
    .then( resp => resp.json())
  }

  static activateCategory( projectCategoriesDeactivate, activateProjectId, activeClient) {
    return fetch(`${path}/activate_category`,{
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        deactivatedCats: projectCategoriesDeactivate,
        activeClient: activeClient,
        activateProjectId: activateProjectId
      })
    })
    .then( resp => resp.json())
  }

  static getMyProjects() {

    return fetch(`${path}/get_my_projects`,{
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({})
    })
    .then( resp => resp.json())
  }

  static getProjectUsers(project) {
    return fetch(`${path}/${project}`, {
      method: 'GET',
      headers: headers()
    })
    .then( resp => resp.json())
  }

  static showClientComments(project) {
    return fetch(`${path}/get_client_comments`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        project_id: project
      })
    })
    .then( resp => resp.json())
  }

  static editProjectTitle(newTitle, projectId) {
    return fetch(`${path}/update_title`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        title: newTitle,
        project_id: projectId
      })
    })
    .then( resp => resp.json())
  }

  static deleteProject(projectId) {
    return fetch(`${path}/${projectId}`, {
      method: 'DELETE',
      headers: headers(),
      body: JSON.stringify({})
    })
    .then( resp => resp.json())
  }

  static getAdminProjects(admin) {

    return fetch(`${path}/get_admin_projects`,{
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        user_id: admin
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
