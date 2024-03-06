import React from "react";
import PetPreview from "./PetPreview";
import { useNavigate } from "react-router-dom";

export default function PetList({ pets, openEditModal, toggleLike }) {
  const navigate = useNavigate();

  
  return (
    <div>
      <ul className="pet-list">
        {pets.map((pet, index) => (
          <li key={index}>
            <PetPreview pet={pet} key={pet.id} />
            <button onClick={() => navigate(`/pet/${pet.id}`)}>Open</button>
            {openEditModal && (
              <button onClick={() => openEditModal(pet.id)}>Edit</button>
              
            )}
            {/* <button onClick={toggleLike(pet.id)}>Like</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
