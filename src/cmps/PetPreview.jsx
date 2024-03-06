import { React } from "react";

export default function PetPreview({ pet }) {
  const { name, imgFile } = pet;

  return (
    <div className="pet-preview">
      <div className="pet-header">
        <div className="pet-detail">
          <img className="pet-img" src={imgFile} />
          <h5 className="name">{name}</h5>
        </div>
      </div>
    </div>
  );
}
