import { withAuthenticationRequired } from '@auth0/auth0-react'
import React, { ComponentType } from 'react'
import { Route, RouteProps } from 'react-router-dom'


interface ProtectedRouteProps extends RouteProps {
  component: ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component,
  ...args
}) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => (
        <div>
          Loading
        </div>
      ),
    })}
    {...args}
  />
)

export default ProtectedRoute
