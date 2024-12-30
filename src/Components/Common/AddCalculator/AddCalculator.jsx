import React, { useState } from "react";
import { Input, Button, Upload, message } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AddCalculator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: null
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Add your API call here
      message.success("Calculator added successfully");
      navigate("/calculator");
    } catch (error) {
      message.error("Failed to add calculator");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-50 p-6">
      <div className="relative w-[500px] rounded-lg bg-white p-8 shadow-sm">
        {/* Close Button */}
        <button
          onClick={() => navigate("/calculator")}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full "
        >
          <CloseOutlined className="text-gray-600" />
        </button>

        {/* Title */}
        <h1 className="mb-8 text-xl font-semibold text-gray-900">
          Add new Calculator
        </h1>

        {/* Form Fields */}
        <div className="flex flex-col gap-6">
          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Title:</label>
            <Input
              placeholder="Enter Name"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="h-11 rounded-md"
            />
          </div>

          {/* Upload Image */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Upload Image:
            </label>
            <Upload
              maxCount={1}
              beforeUpload={(file) => {
                setFormData({ ...formData, image: file });
                return false;
              }}
              className="w-full"
            >
              <Button
                icon={<UploadOutlined />}
                className="flex h-11 w-full items-center justify-start border-gray-300 text-gray-500"
              >
                Upload Your Image
              </Button>
            </Upload>
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            className="mt-4 h-11 w-full bg-red-500 text-white hover:bg-red-600"
          >
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCalculator;
