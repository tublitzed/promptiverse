import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PageLoader } from './components/page-loader'
import { ProtectedRoute } from './components/protected-route'
import { AdminPage } from './pages/admin-page'
import { CallbackPage } from './pages/callback-page'
import HomePage from './pages/home-page'
import { NotFoundPage } from './pages/not-found-page'
import { ProfilePage } from './pages/profile-page'
import { ProtectedPage } from './pages/protected-page'
import { PublicPage } from './pages/public-page'

export const App: React.FC = () => {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return (
      <main className="bg-slate-600 w-full min-h-screen">
        <div className="container mx-auto h-full">
          <div className="mx-auto text-center p-12 text-white">
            <PageLoader />
          </div>
        </div>
      </main>
    )
  };

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <Route path="/public" component={PublicPage} />
      <ProtectedRoute path="/protected" component={ProtectedPage} />
      <ProtectedRoute path="/admin" component={AdminPage} />
      <Route path="/callback" component={CallbackPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  )
}
