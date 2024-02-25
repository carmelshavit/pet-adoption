import React from "react";
import PetPreview from "./PetPreview";

export default function PetList({ pets, handlePetClick }) {
  return (
    <div>
      <ul className="pet-list">
        {pets.map((pet, index) => (
          <li key={index} onClick={() => handlePetClick(pet.id)}>
            <PetPreview pet={pet} key={pet.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
