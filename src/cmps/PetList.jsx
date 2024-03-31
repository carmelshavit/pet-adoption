// PetList.js
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PetPreview from "./PetPreview";
import LoginContext from "../context/LoginContext";
import { Button } from "semantic-ui-react";
import PetDetails from "../pages/PetPage/petDetails";
import { petService } from "../service/pet.service";

export default function PetList({ pets, openEditModal, handleAdoption }) {
  const { loggedInUser } = useContext(LoginContext);
  const isAdmin = loggedInUser?.is_admin === 1;
  const location = useLocation();
  const [pet, setPet] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility

  const handleEdit = (petId, e) => {
    e.stopPropagation();
    openEditModal(petId);
  };

  const handlePetClick = (pet) => {
    setPet(pet);
    setModalOpen(true);
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
              {pet.adoptedBy
                ? isSearchPage && (
                    <Button
                      basic
                      color="violet"
                      onClick={(e) => handleAdoption(pet.id, e)}
                    >
                      Return
                    </Button>
                  )
                : isSearchPage && (
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
                  )}
            </div>
          </li>
        ))}
      </ul>
      <PetDetails pet={pet} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}
