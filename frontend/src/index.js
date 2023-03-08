import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/user.context';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <UserProvider>
    <App />
  </UserProvider>,
  // </React.StrictMode>
);
