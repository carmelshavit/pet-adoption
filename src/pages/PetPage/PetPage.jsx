import React, { useState, useEffect, useContext } from "react";
import { petService } from "../../service/pet.service";
import { useParams } from "react-router-dom";
import LoginContext from "../../context/LoginContext";

import {
  Card,
  Image,
  CardContent,
  CardHeader,
  CardMeta,
  Button,
} from "semantic-ui-react";

export default function PetPage() {
  const [pet, setPet] = useState(null);
  const { id } = useParams();
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);

  const returnPet = async (petId) => {
    console.log(petId);
    try {
      const returnedPet = await petService.returnPet(petId);

      const updatedAdoptedPets = loggedInUser.adoptedPets.filter(
        (pet) => pet.id !== petId
      );
      setLoggedInUser((prevUser) => ({
        ...prevUser,
        adoptedPets: updatedAdoptedPets,
      }));
      console.log("Pet returned:", returnedPet);
    } catch (error) {
      console.error("Error returning pet:", error);
    }
  };

  const adoptPet = async (petId) => {
    try {
      const adoptedPet = await petService.adoptPet(petId);
      const updatedAdoptedPets = [...loggedInUser.adoptedPets, adoptedPet];
      setLoggedInUser((prevUser) => ({
        ...prevUser,
        adoptedPets: updatedAdoptedPets,
      }));
      console.log("Pet adopted:", updatedAdoptedPets);
    } catch (error) {
      console.error("Error adopting pet:", error);
    }
  };

  const handleAdoption = async (petId, e) => {
    e.stopPropagation();
    const isAdopted = loggedInUser.adoptedPets.some((pet) => pet.id === petId);

    if (isAdopted) {
      await returnPet(petId);
      console.log("returning pet");
    } else {
      await adoptPet(petId);
      console.log("adopting pet");
    }
  };
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {pet ? (
        <Card>
          <Image src={pet.imgFile} wrapped ui={false} />
          <CardContent>
            <CardHeader>{pet.name}</CardHeader>
            <CardMeta>Type: {pet.type}</CardMeta>
            <CardMeta>Adoption Status: {pet.adoption_status}</CardMeta>
            <CardMeta>Height: {pet.height}</CardMeta>
            <CardMeta>Weight: {pet.weight}</CardMeta>
            <CardMeta>Color: {pet.color}</CardMeta>
            <CardMeta>Bio: {pet.bio}</CardMeta>
            <CardMeta>
              Hypoallergenic: {pet.hypoallergenic ? "Yes" : "No"}
            </CardMeta>
            <CardMeta>
              Dietary Restrictions: {pet.dietary_restrictions}
            </CardMeta>
            <CardMeta>Breed: {pet.breed}</CardMeta>
          </CardContent>
          <Button
            basic
            color="violet"
            onClick={(e) => handleAdoption(pet.id, e)}
          >
            {loggedInUser.adoptedPets.some(
              (adoptedPet) => adoptedPet.id === pet.id
            )
              ? "Return"
              : "Adopt"}
          </Button>
        </Card>
      ) : (
        <p>Loading pet details...</p>
      )}
    </div>
  );
}
