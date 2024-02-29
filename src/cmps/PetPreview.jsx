import { React } from "react";
import moment from "moment";

export default function PetPreview({ pet }) {
  const { name, imgFile } = pet;
  //   const formattedDate = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  return (
    <div className="pet-preview">
      <div className="pet-header">
        <div className="pet-detail">
          <img className="pet-img" src={imgFile} />
          <h5 className="name">{name}</h5>
        </div>
        {/* <h5 className="formattedDate">{formattedDate}</h5> */}
      </div>
    </div>
  );
}
