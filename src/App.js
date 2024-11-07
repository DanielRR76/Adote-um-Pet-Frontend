import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

/*assets*/
import Night from './assets/img/night-mode.png'
import Day from './assets/img/brightness.png'

import './index.css';
import sytles from '../src/components/layout/Navbar.module.css'

/*components*/
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Message from './components/layout/Message';

/*pages*/
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
import Profile from './components/pages/User/Profile';
import MyPets from './components/pages/Pet/MyPets';
import AddPet from './components/pages/Pet/AddPet';
import PetDetails from './components/pages/Pet/PetDetails';
import MyAdoptions from './components/pages/Pet/MyAdoptions';

/*context*/
import { UserProvider } from './context/UserContext'; //UserProvider from './context/UserContext';
import EditPet from './components/pages/Pet/EditPet';


function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  

    useEffect(() => {
        document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const themeToogle = (
      <li className={sytles.nav_button}>
        <button className={sytles.botao} onClick={toggleTheme}>
          {theme === 'light' ? <img src={Night} alt="Get a Pet"></img> : <img src={Day} alt="Get a Pet"></img>}
        </button>
      </li>
    )
  return (
    <Router>
      <UserProvider>
        <Navbar ThemeToogle={themeToogle} />
       
        <Message />
        <Container>
          <Routes>
            <Route exact path='/login' element={<Login />}/>

            <Route exact path='/register' element={<Register />}/>

            <Route exact path='/' element={<Home />}/>

            <Route exact path='/user/profile' element={<Profile />}/>

            <Route exact path='/pet/mypets' element={<MyPets />}/>

            <Route exact path='/pet/add' element={<AddPet />}/>

            <Route exact path='/pet/edit/:id' element={<EditPet />}/>

            <Route exact path='/pet/:id' element={<PetDetails />}/>

            <Route exact path='/pet/myadoptions' element={<MyAdoptions />}/>

          </Routes>
        </Container>
        <Footer theme = {theme} />
      </UserProvider>
    </Router>
  );
}

export default App;
