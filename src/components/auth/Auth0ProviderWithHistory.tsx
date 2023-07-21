import { AppState, Auth0Provider } from '@auth0/auth0-react'
import React, { PropsWithChildren } from 'react'
import { useHistory } from 'react-router-dom'
import Api from '@api/api'

interface Auth0ProviderWithConfigProps {
  children: React.ReactNode;
}

export const Auth0ProviderWithHistory = ({
  children,
}: PropsWithChildren<Auth0ProviderWithConfigProps>): JSX.Element | null => {
  const history = useHistory()

  const domain = Api.getVar('CLIENT_APP_AUTH0_DOMAIN')
  const clientId = Api.getVar('CLIENT_APP_AUTH0_CLIENT_ID')
  const audience = Api.getVar('CLIENT_APP_AUTH0_AUDIENCE')
  const redirectUri = Api.getVar('CLIENT_APP_AUTH0_CALLBACK_URL')

  const onRedirectCallback = (appState?: AppState) => {
    history.push(appState?.returnTo || window.location.pathname)
  }

  if (!(domain && clientId && audience)) {
    console.error('Auth0ProviderWithHistory: Missing configuration')
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={redirectUri}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
