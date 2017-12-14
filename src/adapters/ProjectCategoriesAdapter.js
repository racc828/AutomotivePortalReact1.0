// const path = 'http://localhost:3000/api/v1/projectcategories'

const path = 'https://dg-automotive-portal-rails.herokuapp.com/api/v1/projectcategories'

export default class ProjectCategoriesAdapter {

  static addProjectCategory(projectCategory, userId) {
      return fetch(path,{
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
          color: projectCategory.color,
          title: projectCategory.title,
          user_id: userId
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
