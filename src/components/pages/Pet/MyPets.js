import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import RoundedImage from "../../layout/RoundedImage"
import useFlashMessage from "../../../hooks/useFlashMessage"
import api from "../../../utils/api"
import styles from "./Dashboard.module.css"

function MyPets() {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        loadPets(token)
    }, [token])

    const loadPets = (token) => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(response => {
            setPets(response.data.pets)
        })
    }

    
    
    async function removePet(id) {
        let msgType = 'success'
        const data = await api.delete(`/pets/${id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updatedPets = pets.filter((pet) => pet.id !== id)
            setPets(updatedPets)
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })
        loadPets(token)
        setFlashMessage(data.message, msgType)
    }

    async function concludeAdoption(id) {
        let msgType = 'success'
        const data = await api.patch(`/pets/complete/${id}`,null, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            
            return response.data
            
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })
        loadPets(token)
        setFlashMessage(data.message, msgType)
    }
    
    return (
        <section >
            <div className={styles.petlist_header}>
                <h1>MyPets</h1>
                <Link to="/pet/add" >Cadastrar Pet</Link>
            </div>
            <div className={styles.petlist_container}>
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div className={styles.petlist_row} key={pet.id}>
                            <RoundedImage
                                src={`${process.env.REACT_APP_API_URL}/images/pets/${JSON.parse(pet.images)[0]}`}
                                alt={pet.name}
                                width="px75"
                            />
                            
                            <span className="bold">{pet.name}</span>
                            <div className={styles.actions}>
                                {pet.available ? (
                                    <>
                                        {pet.adopterId && (
                                            <button onClick={()=> concludeAdoption(pet.id)} className={styles.conclude_btn}>Concluir Adocão</button>
                                        )}
                                        <Link to={`/pet/edit/${pet.id}`}>Editar</Link>
                                        <button onClick={() => removePet(pet.id)}>Remover</button>
                                    </>
                                ):(
                                    <p>Indisponível</p>
                                )}
                            </div>

                        </div>
                    ))
                }
                {pets.length === 0 && <p>Voce ainda nao possui pets</p>}
            </div>
        </section>
    )
    }
    
    export default MyPets