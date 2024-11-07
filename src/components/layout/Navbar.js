import { Link } from "react-router-dom"
import Logo from '../../assets/img/logo.png'

import sytles from './Navbar.module.css'
import { useContext } from "react"


/*context*/
import { Context} from "../../context/UserContext"

function Navbar({ThemeToogle}) {
    

    const { authenticated,logout } = useContext(Context)
    return (
        <nav className={sytles.navbar}>
            <div className={sytles.navbar__logo}>
                <img src={Logo} alt="Get a Pet"/>
                <h2>Get a Pet</h2>
            </div>
            <ul>
                {ThemeToogle}
                <li>
                    <Link to='/'>Adotar</Link>
                </li>

                {authenticated ? (
                <>
                    <li><Link to={'/pet/mypets'}>Meus pets</Link></li>
                    <li><Link to={'/pet/myadoptions'}>Minhas adoções</Link></li>
                    <li><Link to='/user/profile'>Perfil</Link></li>
                    <li onClick={logout}>Sair</li>
                </>): (
                <>
                    <li>
                        <Link to='/register'>Cadastrar</Link>
                    </li>
                    <li>
                        <Link to='/login'>Entrar</Link>
                    </li>
                </>) }
                
            </ul>
        </nav>
    )
}

export default Navbar