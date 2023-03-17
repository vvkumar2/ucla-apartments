import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/user.context';
import './index.css';

// Spinning Loader
const loader = document.querySelector('.loader');
const showLoader = () => loader.classList.remove('loader--hide');
const hideLoader = () => loader.classList.add('loader--hide');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <UserProvider>
    <App 
      showLoader={showLoader}
      hideLoader={hideLoader}
    />
  </UserProvider>,
  // </React.StrictMode>
);
