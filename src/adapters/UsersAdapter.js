const path = 'https://protected-anchorage-66850.herokuapp.com/api/v1/users'
// const path = 'http://localhost:3000/api/v1/users'
export default class UsersAdapter {

  static getClients(){

    return fetch(`${path}/get_clients`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({})
    })
      .then( resp => resp.json())
  }

  static getAdmins(){
    return fetch(`${path}/get_admins`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({})
    })
      .then( resp => resp.json())
  }

  static getClient(clientId){
    return fetch(`${path}/${clientId}`, {
      method: 'GET',
      headers: headers()
    })
      .then( resp => resp.json())
  }

  static getProjectCategories(clientId){

    return fetch(`${path}/get_client_project_categories`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        user_id: clientId
      })
    })
      .then( resp => resp.json())
  }


  static addClient(newClient){
    return fetch(path, {
      method: 'POST',
      headers: headers(),
       body: JSON.stringify({
        user: {
          company: newClient.company,
          firstname: newClient.firstname,
          lastname: newClient.lastname,
          email: newClient.email,
          username: newClient.username,
          password: newClient.password,
          admin: newClient.admin
        }
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
