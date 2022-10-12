import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const getAccessToken = () => {
  const {
    user,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0()
  const [accessToken, setAccessToken] = React.useState<string | undefined>()
  React.useEffect(() => {
    if (isLoading || !user) {
      return
    }
    const getAccessToken = async () => {
      const token = await getAccessTokenSilently()
      setAccessToken(token)
    }
    getAccessToken()
  }, [
    user,
    isLoading,
  ])
  return accessToken
}

export default getAccessToken


// React.useEffect(() => {
//   setUser(userViaAuth0)
//   const getAccessToken = async () => {
//     const token = await getAccessTokenSilently()
//     setUser({
//       ...userViaAuth0,
//       access_token: token,
//     })
//   }
//   if (userViaAuth0) {
//     getAccessToken()
//   }
// }, [userViaAuth0])
