import React, { useContext } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import PetPreview from "./PetPreview";
import LoginContext from "../context/LoginContext";
import { Button } from "semantic-ui-react";

export default function PetList({ pets, openEditModal, handleAdoption }) {
  const { loggedInUser } = useContext(LoginContext);
  const isAdmin = loggedInUser?.is_admin === 1;
  const location = useLocation();

  const handlePetClick = (petId, e) => {
    e.stopPropagation();
    openEditModal(petId);
  };

  const isSearchPage = location.pathname === "/search";

  return (
    <div>
      <ul
        className="pet-list"
        
      >
        {pets.map((pet, index) => (
          <li
            key={index}
            className="pet-container"
          >
            <PetPreview pet={pet} key={pet.id} />
            <div className="pet-buttons" >
            {isAdmin && (
              <Button
                basic
                color="violet"
                onClick={(e) => handlePetClick(pet.id, e)}
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
                    size="small"
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
                )}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
