import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const CalculatorCard = ({ title, image }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      className="overflow-hidden rounded-lg transition-transform hover:scale-[1.02]  h-[200px]"
      cover={
        <div className="aspect-[4/3] overflow-hidden h-[144px] ">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      }
      //onClick={() => navigate(`/calculator/${title.toLowerCase()}`)}
    >
      <Card.Meta
        title={
          <span className="text-base font-medium text-gray-900">{title}</span>
        }
      />
    </Card>
  );
};

export default CalculatorCard;
