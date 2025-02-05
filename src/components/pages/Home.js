import api from "../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";

function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await api.get("/pets");
        response.data.pets.map((pet) => {
          pet.images = JSON.parse(pet.images);
          return pet;
        });

        setPets(response.data.pets); // Atualiza o estado com os pets
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    }
    fetchPets();
  }, []);

  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada pet e conheça seus tutores.</p>
      </div>
      <div className={styles.pet_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet.id} className={styles.pet_card}>
              <div
                style={{ backgroundImage: `url(${pet.images[0]})` }}
                className={styles.pet_card_image}
              ></div>
              <h3>{pet.name}</h3>
              <p>
                <span className={styles.bold}> Peso:</span> {pet.weight}kg
              </p>
              {pet.available ? (
                <Link to={`/pet/${pet.id}`}>Detalhes</Link>
              ) : (
                <p className={styles.pet_card_adotado}>Adotado</p>
              )}
            </div>
          ))}
        {pets.length === 0 && <p>Ainda não há pets</p>}
      </div>
    </section>
  );
}

export default Home;
