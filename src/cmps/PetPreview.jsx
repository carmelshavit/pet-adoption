import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { petService } from "../service/pet.service";
import LoginContext from "../context/LoginContext";

export default function PetPreview({ pet }) {
  const [isLike, setIsLike] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const { id, name, imgFile, adoptedBy } = pet; // Destructure the adoptedBy property
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser.likedPetIds.includes(id)) {
      setIsLike(true);
    }
  }, [loggedInUser.likedPetIds, id]);

  const toggleLike = async (petId) => {
    const { id, likedPetIds } = loggedInUser;

    if (likedPetIds.includes(petId)) {
      const updatedLikedPetIds = likedPetIds.filter(
        (likedPetId) => likedPetId !== petId
      );
      setLoggedInUser((prevUser) => ({
        ...prevUser,
        likedPetIds: updatedLikedPetIds,
      }));
      setIsLike(false);
      await petService.removePetLike(id, petId);
    } else {
      setLoggedInUser((prevUser) => ({
        ...prevUser,
        likedPetIds: [...prevUser.likedPetIds, petId],
      }));
      setIsLike(true);
      await petService.addPetLike(id, petId);
    }
  };

  const handleLikeToggle = async (e) => {
    e.stopPropagation();
    console.log("Like button clicked");
    await toggleLike(id);
  };

  return (
    <div className="pet-preview" onClick={() => navigate(`/pet/${id}`)}>
      {adoptedBy ? null : (
        <div className="icon-container">
          <button className="like" onClick={handleLikeToggle}>
            <Icon
              name={isLike ? "heart" : "heart outline"}
              color={isLike ? "red" : "black"}
            />
          </button>
        </div>
      )}
      <div className="pet-details">
        <img className="pet-img" src={imgFile} alt={name} />
        
          <h5 className="name">{name}</h5>
        </div>
      </div>
  );
}
