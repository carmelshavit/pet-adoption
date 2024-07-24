import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import PetPreview from "./PetPreview";
import LoginContext from "../context/LoginContext";
import { Button } from "semantic-ui-react";
import PetDetails from "../pages/PetPage/petDetails";
import { petService } from "../service/pet.service";

export default function PetList({ pets, openEditModal }) {
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const isAdmin = loggedInUser && loggedInUser.is_admin;
  const location = useLocation();
  const [pet, setPet] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleEdit = (petId, e) => {
    e.stopPropagation();
    openEditModal(petId);
  };

  const handlePetClick = (pet) => {
    setPet(pet);
    setModalOpen(true);
  };

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
    console.log("isAdopted", isAdopted);
    if (isAdopted) {
      await returnPet(petId);
      console.log("returning pet");
    } else {
      await adoptPet(petId);
      console.log("adopting pet");
    }
  };

  const isSearchPage = location.pathname === "/search";

  return (
    <div>
      <ul className="pet-list">
        {pets.map((pet, index) => (
          <li
            key={index}
            className="pet-container"
            onClick={() => handlePetClick(pet)}
          >
            <PetPreview pet={pet} key={pet.id} />
            <div className="pet-buttons">
              {isAdmin && isSearchPage && (
                <Button
                  basic
                  color="violet"
                  onClick={(e) => handleEdit(pet.id, e)}
                >
                  Edit
                </Button>
              )}

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
            </div>
          </li>
        ))}
      </ul>
      <PetDetails
        handleAdoption={handleAdoption}
        pet={pet}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
}
