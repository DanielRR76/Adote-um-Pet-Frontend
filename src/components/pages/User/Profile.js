import { useState, useEffect } from 'react'
import formStyles from '../../form/Form.module.css'
import styles from './Profile.module.css'
import Input from '../../form/Input'
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'
import RoundedImage from '../../layout/RoundedImage'


function Profile() {
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const token = localStorage.getItem('token') || ''

    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(response => {
            setUser(response.data)
        })
    }, [token])

    
    function onfileChange(e) {
        setPreview(e.target.files[0])
        setUser({ ...user, [e.target.name]: e.target.files[0] })
    }

    function handleonChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let msgType = 'success'

        const formData = new FormData()
        Object.keys(user).forEach((key) =>
            formData.append(key, user[key]))

        const data = await api.patch(`/users/edit/${user.id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        }).catch(error => {
            msgType = 'error'
            return error.response.data
        })

        setFlashMessage(data.message, msgType)
    }
    
    return (
        <section>
            <div className={styles.profile_header}>
                <h1>Profile</h1>
                {(user.image || preview) && (
                    <RoundedImage src={preview? URL.createObjectURL(preview): `${process.env.REACT_APP_API_URL}/images/users/${user.image}`} alt={user.name} />
                )}
            </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container} >
                <Input
                    text="imagem"
                    type="file"
                    name="image"
                    handleonChange={onfileChange}
                />

                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleonChange={handleonChange}
                    value={user.name || ''}
                />

                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    handleonChange={handleonChange}
                    value={user.email || ''}
                />

                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu telefone"
                    handleonChange={handleonChange}
                    value={user.phone || ''}
                />

                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    handleonChange={handleonChange}
                />

                <Input
                    text="Confirmar Senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    handleonChange={handleonChange}
                />

                <input type="submit" value="Atualizar Cadastro" />
            </form>
        </section>
    )
    }
    
    export default Profile