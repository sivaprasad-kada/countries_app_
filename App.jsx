import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { Themesetter } from './contexts/context'; 
import './App.css';

const App = () => {
  return (
    <Themesetter> 
      <Header />
      <Outlet />
    </Themesetter>
  );
}

export default App;
