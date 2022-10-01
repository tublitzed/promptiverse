import React from 'react'
import AppContext from 'components/appContext'

const Profile = () => {
  const { user } = React.useContext(AppContext)
  if (!user) {
    return <div></div>
  }
  return (
    <div>
      <h4>Rendered user info on the client</h4>
      <img src={user.picture} alt="user picture" />
      <p>nickname: {user.nickname}</p>
      <p>name: {user.username}</p>
    </div>
  )
}

export default Profile
