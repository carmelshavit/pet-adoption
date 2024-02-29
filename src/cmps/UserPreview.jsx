import { React } from "react";
import moment from "moment";

export default function userPreview({ user }) {
  const { name, imgFile } = user;
  //   const formattedDate = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  return (
    <div className="user-preview">
      <div className="user-header">
        <div className="user-detail">
          <img className="user-img" src={imgFile} />
          <h5 className="name">{name}</h5>
        </div>
        {/* <h5 className="formattedDate">{formattedDate}</h5> */}
      </div>
    </div>
  );
}
