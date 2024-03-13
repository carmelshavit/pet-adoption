import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import PetsLikedContext from "../context/PetsLikedContext";
import { petService } from "../service/pet.service";
import LoginContext from "../context/LoginContext";

export default function PetPreview({ pet }) {
  const { likedPetIds, setLikedPetIds } = useContext(PetsLikedContext);
  const [isLike, setIsLike] = useState(false);
  const { loggedInUser } = useContext(LoginContext);

  const { id, name, imgFile } = pet;

  const navigate = useNavigate();

  const toggleLike = async (petId) => {
    const userId = loggedInUser.id;
    if (likedPetIds.includes(petId)) {
      setLikedPetIds((prev) => prev.filter((id) => id !== petId));
      setIsLike(false);
      await petService.removePetLike(userId, id);
    } else {
      setLikedPetIds((prev) => [...prev, petId]);
      setIsLike(true);
      await petService.addPetLike(userId, id);
    }
  };

  const handleLikeToggle = async (e) => {
    e.stopPropagation();
    console.log("Like button clicked");
    await toggleLike(id);
  };

  //     //TODO- make sure state changes once the like is removed/added successfully
  return (
    <div className="pet-preview" onClick={() => navigate(`/pet/${id}`)}>
      <div className="icon-container">
        <button className="like" onClick={handleLikeToggle}>
          <Icon
            name={isLike ? "heart" : "heart outline"}
            color={isLike ? "red" : "black"}
          />
        </button>
      </div>
      <img className="pet-img" src={imgFile} alt={name} />
      <h5 className="name">{name}</h5>
    </div>
  );
}
