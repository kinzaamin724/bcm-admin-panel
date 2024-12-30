import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CalculatorCard from "../../Components/Common/Card/CalulatorCard";
import cardImage from "../../assets/images/card1.png";
import { useNavigate } from "react-router-dom";

const Calculator = () => {
  const navigate = useNavigate();
  const calculatorItems = [
    { title: "Foundation", image: cardImage },
    { title: "Wall", image: cardImage },
    { title: "Stiffeners", image: cardImage },
    { title: "Drainage", image: cardImage },
    { title: "Flooring", image: cardImage },
    { title: "Tiling", image: cardImage },
    { title: "Cost Projection", image: cardImage },
    { title: "Beams", image: cardImage },
    { title: "Column", image: cardImage },
    { title: "Roofing", image: cardImage },
    { title: "Slab", image: cardImage }
  ];

  return (
    <div className="h-full w-full bg-gray-50 p-6 ">
      {/* Header with Add Button */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900"></h1>
        {/* <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/calculator/add")}
          className="flex items-center bg-red-500 hover:bg-red-600 border-none h-10 px-4"
        >
          <span>Add New</span>
        </Button> */}
        <button
          onClick={() => navigate("/calculator/add")}
          className="group flex items-center gap-2 px-6 py-3 rounded-[16px] border-[1px] border-[#E81E1E] hover:bg-[#E81E1E] transition-colors duration-300"
        >
          <span className="text-2xl font-medium text-[#ED4B4B] group-hover:text-white transition-colors duration-300">
            +
          </span>
          <span className="text-base font-[600] text-[#E61E2C] group-hover:text-white transition-colors duration-300">
            Add New
          </span>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 pb-[40px] gap-6">
        {calculatorItems.map((item, index) => (
          <CalculatorCard key={index} title={item.title} image={item.image} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
