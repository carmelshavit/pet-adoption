import React from "react";
import PetPreview from "./PetPreview";
import { petservice } from "../service/pet.service.js";

export default function TweetList({ pets }) {
  return (
    <div>
      <ul className="pet-list">
        {pets.map((pet, index) => (
          <li key={index}>
            <PetPreview key={pet.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
