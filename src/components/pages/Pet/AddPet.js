import styles from './AddPet.module.css'
import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import PetForm from '../../form/PetForm'




function AddPet() {
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()
    const [colors, setColors] = useState([])

    /*async function getColors() {
        const data = await api.get('/pets/colors').then((response) => {
            return response.data
        })
        console.log(data)
        return data.colorpets
    }*/


    useEffect(() => {
        async function fetchColors() {
            const data = await api.get('/pets/colors').then((response) => {
                return response.data
            })
            setColors(data.colorpets)
        }
        fetchColors()
    }, [])

    
    async function registerPet(pet) {
        let msgType = 'success'
        
        const formData = new FormData()
        Object.keys(pet).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.post('/pets/create', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })
        
        /*const colors = await api.get('/pets/colors').then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })
        console.log(colors.colorpets)*/

        setFlashMessage(data.message, msgType)
        if(msgType === 'success') {
            navigate('/pet/mypets')
        }
        
    }
    
    return (
        <section className={styles.addpet_header}>
            <h1>Cadastre um Pet</h1>
            <p>Depois ele ficara disponível para adocao</p>
            <div>
                <PetForm handleSubmit={registerPet} colorpets={colors}  btnText="Cadastrar Pet"  />
            </div>
        </section>
    )
    }
    
    export default AddPet