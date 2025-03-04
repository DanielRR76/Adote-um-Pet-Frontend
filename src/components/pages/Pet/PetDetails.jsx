import styles from "./PetDetails.module.css";
import api from "../../../utils/api";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFlashMessage from "../../../hooks/useFlashMessage";

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  useEffect(() => {
    async function fetchPet() {
      try {
        const response = await api.get(`/pets/${id}`);
        response.data.pet.images = JSON.parse(response.data.pet.images);

        setPet(response.data.pet);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    }
    fetchPet();
  }, [id]);

  async function schedule() {
    let msgType = "success";
    const data = await api
      .patch(`/pets/schedule/${id}`, null, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);

    navigate("/");
  }

  return (
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.pet_details_header}>
            <h1>Conheça o {pet.name}</h1>
            <p>
              Se tiver interesse, marque uma visita para conhecê-lo
              pessoalmente.
            </p>
          </div>
          <div className={styles.pet_images}>
            {pet.images.map((image, index) => (
              <img
                src={`${image}`}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))}
          </div>
          <p>
            <span className={styles.bold}>Peso:</span> {pet.weight}kg
          </p>
          <p>
            <span className={styles.bold}>Idade:</span> {pet.age} anos
          </p>
          <p>
            <span className={styles.bold}>Cor:</span> {pet.color}
          </p>
          {token ? (
            <button onClick={schedule}>Adicionar visita</button>
          ) : (
            <p>
              {" "}
              Voce precisa estar{" "}
              <Link className={styles.pet_link} to="/login">
                logado
              </Link>{" "}
              ou{" "}
              <Link className={styles.pet_link} to="/register">
                criar
              </Link>{" "}
              uma conta para adicionar uma visita
            </p>
          )}
        </section>
      )}
    </>
  );
}

export default PetDetails;
