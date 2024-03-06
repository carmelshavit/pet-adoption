import React, { useState, useEffect } from "react";
import { petService } from "../../service/pet.service";
import { useParams } from "react-router-dom";

export default function PetPage() {
  const [pet, setPet] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getPetById = async () => {
      console.log(id);
      try {
        const fetchedPet = await petService.getPetById(id);
        console.log(fetchedPet);
        setPet(fetchedPet);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    getPetById();
  }, []);

  return (
    <div>
      {pet ? (
        <>
          <h2>{pet.name}</h2>
          <img src={pet.imgFile} alt={pet.name} />
          <p>Type: {pet.type}</p>
          <p>Adoption Status: {pet.adoption_status}</p>
          <p>Height: {pet.height}</p>
          <p>Weight: {pet.weight}</p>
          <p>Color: {pet.color}</p>
          <p>Bio: {pet.bio}</p>
          <p>Hypoallergenic: {pet.hypoallergenic ? "Yes" : "No"}</p>
          <p>Dietary Restrictions: {pet.dietary_restrictions}</p>
          <p>Breed: {pet.breed}</p>
        </>
      ) : (
        <p>Loading pet details...</p>
      )}
    </div>
  );
}
