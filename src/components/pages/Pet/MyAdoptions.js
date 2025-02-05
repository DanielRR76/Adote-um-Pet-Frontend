import styles from "./Dashboard.module.css";
import api from "../../../utils/api";
import { useState, useEffect } from "react";
import RoundedImage from "../../layout/RoundedImage";
import { useNavigate } from "react-router-dom";

function MyAdoptions() {
  const [token] = useState(localStorage.getItem("token") || "");
  const [pets, setPets] = useState([]);
  const [user, setUser] = useState([]);
  const [allpets, setAllPets] = useState([]);
  let count = 0;

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyPets() {
      try {
        const response = await api.get("/pets/myadoptions", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        response.data.pets.map((pet) => {
          pet.images = JSON.parse(pet.images);
          return pet;
        });

        setPets(response.data.pets);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    }

    if (token) {
      fetchMyPets();
    }
  }, [token]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (pets.length > 0) {
        const ids = pets.map((pet) => pet.ownerId);
        try {
          const userPromises = ids.map((id) => api.get(`/users/${id}`));
          const responseUsers = await Promise.all(userPromises);
          const data = responseUsers.map((response) => response.data);

          setUser(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUsers();
  }, [pets]);

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await api.get("/pets/mypets", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        response.data.pets.map((pet) => {
          pet.images = JSON.parse(pet.images);
          return pet;
        });

        setAllPets(response.data.pets); // Atualiza o estado com os pets
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    }

    if (token) {
      fetchPets();
    }
  }, [token]);

  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>Minhas Adocões</h1>
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 &&
          pets.map(
            (pet) =>
              pet.ownerId !== pet.adopterId && (
                <div className={styles.petlist_row} key={pet.id}>
                  <RoundedImage
                    src={`${pet.images[0]}`}
                    alt={pet.name}
                    width="px75"
                  />

                  <span className="bold">{pet.name}</span>
                  <div>
                    {user.length > 0 && user[count].id === pet.ownerId && (
                      <div className={styles.contacts}>
                        <p>
                          Ligue para: <span>{user[count].phone}</span>
                        </p>
                        <p>
                          Ou mande uma mensagem para:{" "}
                          <span>{user[count].name}</span>
                        </p>
                      </div>
                    )}
                    {user.length > 0 && user[count].id !== pet.ownerId && (
                      <div className={styles.contacts}>
                        <p>
                          Ligue para: <span>{user[(count += 1)].phone}</span>
                        </p>
                        <p>
                          Ou mande uma mensagem para:{" "}
                          <span>{user[count].name}</span>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.actions}>
                    {pet.available && <p>Adoção em andamento</p>}
                  </div>
                </div>
              )
          )}
        {allpets.length > 0 &&
          allpets.map(
            (allpet) =>
              !allpet.available && (
                <div className={styles.adoptions} key={allpet.id}>
                  <RoundedImage
                    src={`${allpet.images[0]}`}
                    alt={allpet.name}
                    width="px75"
                  />
                  <span className="bold">{allpet.name}</span>
                  <div className={styles.adoptions_actions}>
                    <p>Adocão concluida!</p>
                  </div>
                </div>
              )
          )}

        {pets.length === 0 && (
          <div className={styles.adotar}>
            <p>
              Todas as adoções foram concluídas ou ainda não foram feitas. Adote
              um pet !
            </p>
            <button onClick={() => navigate("/")}>Adotar</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default MyAdoptions;
