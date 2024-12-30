import React from "react";
import "../../../styles/TotalInfoCard/TotalInfoCard.scss";
import usersImg from "../../../assets/images/users.png";

const TotalInfoCard = ({ imageSrc, heading, text }) => {
  return (
    <>
      <div className="total-info-card-container">
        <div className="info-card-content">
          <div>
            <img src={imageSrc} className="infoImg" />
          </div>
          <div className="info-card-text">
            <p className="heading">{heading}</p>
            <p className="text">{text}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalInfoCard;
