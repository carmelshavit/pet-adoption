import React, { useState, useEffect, useContext } from "react";
import { petService } from "../../service/pet.service";
import LoginContext from "../../context/LoginContext";
import PetList from "../../cmps/PetList";

export default function MyPets({ pets }) {
  const [likedPets, setLikedPets] = useState([]); // Initialize likedPetIds state
  const { loggedInUser } = useContext(LoginContext);

  const handleAdoptClick = async (petId, userId, e) => {
    e.stopPropagation();
    const adoptedPet = await petService.addAdoptedPet(petId, userId);
    console.log(adoptedPet);
  };

  useEffect(() => {
    const fetchLikedPets = async () => {
      try {
        const likedPetsData = await petService.getPets(
          loggedInUser.likedPetIds
        );
        setLikedPets(likedPetsData);
      } catch (error) {
        console.error("Error fetching liked pets:", error);
      }
    };

    fetchLikedPets();
  }, []);

  return (
    <div>
      <h1>My Pets</h1>
      <PetList pets={likedPets} handleAdoptClick={handleAdoptClick} />
    </div>
  );
}
