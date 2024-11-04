// src/AdminApp.tsx (or your main admin entry point file)
import ReactDOM from 'react-dom';
import App from './App'; // Your main admin component
import { UserProvider } from './UserContext';

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
