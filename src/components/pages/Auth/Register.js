import Input from "../../form/Input"
import styles from '../../form/Form.module.css'
import { Link } from "react-router-dom"
import { useState, useContext } from "react"

/*context*/
import{Context} from '../../../context/UserContext'

function Register() {
    
    const [user, setUser] = useState({})
    const {register} = useContext(Context)
    
    
    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }

    
    function handleSubmit(e) {
        e.preventDefault()
        //enviar para o backend
        register(user)
    }
    
    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleonChange={handleChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu nome"
                    handleonChange={handleChange}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    handleonChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    handleonChange={handleChange}
                />
                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    handleonChange={handleChange}
                />

                <input type="submit" value="Cadastrar" />
            </form>
            <p>
                Ja tem uma conta? <Link to="/login">Clique aqui</Link>
            </p>
        </section>
    )
    }
    
    export default Register