import React, { useState, useEffect, useContext } from "react";
import { petService } from "../../service/pet.service";
import LoginContext from "../../context/LoginContext";
import PetList from "../../cmps/PetList";
import { Button } from "semantic-ui-react";

export default function MyPets() {
  const [likedPets, setLikedPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [displayingAdopted, setDisplayingAdopted] = useState(false);
  const { loggedInUser } = useContext(LoginContext);

  useEffect(() => {
    const fetchLikedPets = async () => {
      try {
        const likedPetsData = await petService.getPets(
          loggedInUser.likedPetIds
        );
        setLikedPets(likedPetsData);
        console.log(likedPetsData);
        setAdoptedPets(loggedInUser.adoptedPets);
        console.log(loggedInUser.adoptedPets);
      } catch (error) {
        console.error("Error fetching liked pets:", error);
      }
    };
    fetchLikedPets();
  }, []);

  const toggleDisplay = () => {
    setDisplayingAdopted(!displayingAdopted);
  };

  return (
    <div>
      <h2>{displayingAdopted ? "My Pets" : "Saved Pets"}</h2>
      <Button onClick={toggleDisplay} basic color="violet">
        {displayingAdopted ? "Show Liked Pets" : "Show Adopted Pets"}
      </Button>
      <PetList pets={displayingAdopted ? adoptedPets : likedPets} />
    </div>
  );
}
