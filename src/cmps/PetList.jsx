import React, { useContext } from "react";
import PetPreview from "./PetPreview";
import LoginContext from "../context/LoginContext";

export default function PetList({ pets, openEditModal }) {
  const { loggedInUser } = useContext(LoginContext);

  const isAdmin = loggedInUser?.is_admin == true;

  const handlePetClick = (petId, e) => {
    e.stopPropagation();
    openEditModal(petId);
  };

  return (
    <div>
      <ul className="pet-list">
        {pets.map((pet, index) => (
          <li key={index}>
            <PetPreview pet={pet} key={pet.id} />
            {isAdmin && (
              <button onClick={(e) => handlePetClick(pet.id, e)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
