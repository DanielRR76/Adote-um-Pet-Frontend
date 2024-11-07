import api from "../../../utils/api"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from './AddPet.module.css'
import PetForm from "../../form/PetForm"
import useFlashMessage from "../../../hooks/useFlashMessage"



function EditPet() {
    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()
    const [colors, setColors] = useState([])

    useEffect(() => {
        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(response => {
            setPet(response.data.pet)
        }).catch(error => {
            console.log(error)
        })
    },[token, id,])
    //console.log(pet)

    useEffect(() => {
        async function fetchColors() {
            const data = await api.get('/pets/colors').then((response) => {
                return response.data
            })
            setColors(data.colorpets)
        }
        fetchColors()
    }, [])

    //console.log(colors)

    
    async function UpdatePet(pet) {
        let msgType = 'success'

        const formData = new FormData()
        Object.keys(pet).forEach((key)=>{
            if(key === 'images') {
                for(let i = 0; i < pet[key].length; i++) {
                    formData.append('images',pet[key][i])
                }
            } else{
                formData.append(key, pet[key])
            }
        })

        const data = await api.patch(`/pets/${id}`, formData, {
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
        navigate(`/pet/mypets`)
        setFlashMessage(data.message, msgType)
        
    }
    
    
    return (
        <section>
            <div className={styles.addpet_header}>
                <h1>Editando o Pet: {pet.name}</h1>
                <p>Depois da edição, os dados serão atualizados no sistema.</p>

            </div>

            {pet.name && <PetForm handleSubmit={UpdatePet} colorpets={colors} petData={pet}  btnText="Atualizar Pet" />}
        </section>
    )
    }
    
    export default EditPet