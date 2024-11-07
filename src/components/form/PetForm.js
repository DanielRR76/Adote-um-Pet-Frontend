import { useState } from "react"
import formStyles from './Form.module.css'
import Input from "./Input"
import Select from "./Select"

function PetForm({handleSubmit,colorpets,petData, btnText}) {
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    
    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setPet({ ...pet, images:[...e.target.files] })
        
    }
    //console.log(preview)

    function handleonChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
        
    }
    //console.log(pet)

    function handleColor(e){
        setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text })
    }

    function submit(e) {
        e.preventDefault()
        console.log(pet)
        handleSubmit(pet)
    }
    //console.log(pet.images)
    return (
        <form onSubmit={submit} className={formStyles.form_container}>
            <div className={formStyles.preview_pet_images}>
                {
                    preview.length > 0 ? preview.map((image, index) => (
                        <img src={URL.createObjectURL(image)} alt={pet.name} key={`${pet.name}+${index}`} />
                    )) : pet.images && JSON.parse(pet.images).map((image, index) => (
                        <img src={`${process.env.REACT_APP_API_URL}/images/pets/${image}`} alt={pet.name} key={`${pet.name}+${index}`} />
                    ))
                }
                
            </div>
            <Input
                text="Imagem do Pet"
                type="file"
                name="images"
                handleonChange={onFileChange}
                multiple={true}
            />
            
            <Input
                text="Nome"
                type="text"
                name="name"
                placeholder="Nome do pet"
                handleonChange={handleonChange}
                value={pet.name || ''}
            
            />

            <Input
                text="Idade"
                type="number"
                name="age"
                placeholder="Idade do pet"
                handleonChange={handleonChange}
                value={pet.age || ''}
            />

            <Input
                text="Peso"
                type="number"
                name="weight"
                placeholder="Peso do pet"
                handleonChange={handleonChange}
                value={pet.weight || ''}
            />
            <Select
                name = "color"
                text= "Selecione a cor"
                options={colorpets}
                handleOnChange={handleColor}
                value={pet.color || ''}
            />

            
            <input type="submit" value={btnText} />
        </form>
    )
}
    
export default PetForm