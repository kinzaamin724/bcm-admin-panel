import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";

const RequestProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Mock data - replace with API call
        const data = {
          name: "Mr. Thomas johnson",
          propertyType: "Luxury Apartment",
          requestType: "Property Creation",
          status: "Pending",

          dateSubmitted: "14-09-2024",
          requests: "12",
          image: "https://via.placeholder.com/64"
        };
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>User not found</div>;

  return (
    <div className="h-full w-full bg-gray-50 p-12 overflow-y-auto">
      {/* Page Title */}
      <h1 className="mb-6 text-2xl font-bold text-[#1E1E1E]">User Profile</h1>

      {/* White Content Card */}
      <div className="relative rounded-lg bg-white p-[60px] shadow-sm">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full "
        >
          <CloseOutlined className="text-gray-600" />
        </button>

        {/* User Header with Image */}
        <div className="mb-12 flex w-[45%]  justify-between">
          <h2 className="text-xl font-semibold text-[#1E1E1E]">
            {userData.name}
          </h2>
          <img
            src={userData.image}
            alt={userData.name}
            className="h-14 w-14 rounded-full object-cover"
          />
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-2 gap-y-8">
          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">Name:</span>
            <span className="text-base text-[#1E1E1E]">{userData.name}</span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Request Type:
            </span>
            <span className="text-base text-[#1E1E1E]">
              {userData.requestType}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Property Type:
            </span>
            <span className="text-base text-[#1E1E1E]">
              {userData.propertyType}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Date Submitted:
            </span>
            <span className="text-base text-[#1E1E1E]">
              {userData.dateSubmitted}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Request Status:
            </span>
            <span className="text-base text-[#1E1E1E]">{userData.status}</span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Number Of Request:
            </span>
            <span className="text-base text-[#1E1E1E]">
              {userData.requests}
            </span>
          </div>
        </div>
        {/* Request Data Section */}
        <div className="mt-10 border-t border-[#E0E0E0] pt-10">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">
            Request Data
          </h3>

          <div className="grid grid-cols-2 gap-x-5 gap-y-6 ml-20">
            {/* Strip Foundation */}
            <div className="flex flex-col gap-1 ">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                Strip Foundation
              </span>
              <span className="text-base font-normal text-gray-900">
                Length(feet) * 50{" "}
                <span className="text-sm text-[#1E1E1E]-500">in feet</span>
              </span>
            </div>

            {/* How will foundation be dug */}
            <div className="flex flex-col gap-1 ">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                How will foundation be dug? *
              </span>
              <span className="text-base text-gray-900">Mechanically</span>
            </div>

            {/* Second Strip Foundation */}
            <div className="flex flex-col gap-1 ">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                Strip Foundation
              </span>
              <span className="text-base text-gray-900">
                Length(feet) * 50{" "}
                <span className="text-sm text-[#1E1E1E]-500">in feet</span>
              </span>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1 ">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                Description
              </span>
              <span className="text-base text-gray-900">Lorem Ipsum text</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestProfile;
