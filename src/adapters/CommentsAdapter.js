const path = 'https://protected-anchorage-66850.herokuapp.com/api/v1/comments'
export default class CommentsAdapter {

  static addComment(comment, project_id) {
    return fetch(path,{
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        client_view: comment.clientView,
        comment_text: comment.comment,
        project_id: project_id
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