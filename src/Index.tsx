import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Auth0ProviderWithHistory } from '@components/auth/Auth0ProviderWithHistory'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import ApiService from './api/api'

const sentryDsn = ApiService.getVar('SENTRY_CLIENT_DSN')
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  })
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

