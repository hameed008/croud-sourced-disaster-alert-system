import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext';
import { ReportProvider } from './contexts/ReportContext.jsx';
import { RequestProvider } from './contexts/RequestContext.jsx';
import { Layout } from './contexts/LayoutContext.jsx';
import { SocketProvider } from './contexts/SocketContext.jsx';
import { NotificationProvider } from './contexts/NotifactionContext.jsx';
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ReportProvider>
        <RequestProvider>
          <NotificationProvider>
            <Layout>
              <App />
            </Layout>
          </NotificationProvider>
        </RequestProvider>
      </ReportProvider>
    </AuthProvider>
  </StrictMode>
)
