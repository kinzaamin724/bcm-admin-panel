import { useState } from "react";
import { Input, Space, Button, Tooltip } from "antd";
import { SearchOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import CustomTable from "../../components/common/Table/CustomTable";
import "../../styles/Users/Users.scss";
import userImg from "../../assets/images/users.png";
import User1 from "../../assets/images/User1.png";
import TotalInfoCard from "../../Components/Common/TotalInfoCard/TotalInfoCard";
import { useNavigate } from "react-router-dom";
import { GrNext, GrPrevious } from "react-icons/gr";
const Users = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Sample data - replace with your API data
  const userData = [
    {
      key: "1",
      name: "John Doe",
      email: "johndoe@gmail.com",
      dateSubmitted: "2024-12-10",
      requests: "10 Requests",
      image: "https://via.placeholder.com/32"
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "janesmith@gmail.com",
      dateSubmitted: "2024-12-09",
      requests: "12 Requests",
      image: "https://via.placeholder.com/32"
    },
    {
      key: "3",
      name: "Alice Brown",
      email: "alicebrown@gmail.com",
      dateSubmitted: "2024-12-09",
      requests: "8 Requests",
      image: "https://via.placeholder.com/32"
    },
    {
      key: "4",
      name: "Jane Smith",
      email: "janesmith@gmail.com",
      dateSubmitted: "2024-12-10",
      requests: "20 Requests",
      image: "https://via.placeholder.com/32"
    },
    {
      key: "5",
      name: "John Doe",
      email: "johndoe@gmail.com",
      dateSubmitted: "2024-12-10",
      requests: "10 Requests",
      image: "https://via.placeholder.com/32"
    },
    {
      key: "6",
      name: "Jane Smith",
      email: "janesmith@gmail.com",
      dateSubmitted: "2024-12-09",
      requests: "12 Requests",
      image: "https://via.placeholder.com/32"
    },
    {
      key: "7",
      name: "Alice Brown",
      email: "alicebrown@gmail.com",
      dateSubmitted: "2024-12-09",
      requests: "8 Requests",
      image: "https://via.placeholder.com/32"
    }
  ];

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={User1}
          alt="user"
          style={{ width: "40px", height: "40px", borderRadius: "50px" }}
          // className="w-8 h-8 rounded-full object-cover"
        />
      )
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Date Submitted",
      dataIndex: "dateSubmitted",
      key: "dateSubmitted",
      sorter: (a, b) => new Date(a.dateSubmitted) - new Date(b.dateSubmitted)
    },
    {
      title: "No. of Requests",
      dataIndex: "requests",
      key: "requests",
      sorter: (a, b) => a.requests - b.requests
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  // const handleView = (record) => {
  //   navigate(`/users/${record.key}`);
  //   console.log("View:", record);
  // };

  const handleDelete = (record) => {
    console.log("Delete:", record);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    console.log("Table changed:", { pagination, filters, sorter });
    // Handle table changes here (sorting, filtering, pagination)
  };

  const handleDropdownAction = (item, record) => {
    if (item === "View") {
      navigate(`/users/${record.key}`);
      handleView(record);
    } else if (item === "Delete") {
      handleDelete(record);
    }
  };

  const handleView = (record) => {
    navigate(`/users/${record.key}`);
  };
  return (
    <div className="users-container h-full w-full p-6 ">
      <div className="heading-users">Users</div>
      <div className="flex justify-between items-center mb-6 mt-10">
        <TotalInfoCard imageSrc={userImg} heading="7K" text="Number Of Users" />
      </div>
      <div className="flex justify-between items-center ">
        <CustomTable
          columns={columns}
          data={userData}
          loading={loading}
          onChange={handleTableChange}
          dropdownItems={["View", "Delete"]}
          onDropdownAction={handleDropdownAction}
          onRowClick={(record) => handleView(record)}
        />
      </div>

      {/* Custom Pagination Controls */}
      <div className="pagination-controls flex justify-center items-center gap-4  p-4">
        <div
        //   onClick={handlePreviousPage}
        //   style={{
        //     cursor: currentPage === 1 ? "not-allowed" : "pointer",
        //     opacity: currentPage === 1 ? 0.5 : 1
        //   }}
        >
          <GrPrevious />
        </div>

        <span
          style={{
            border: "1px solid grey",
            padding: "0.4rem",
            width: "35px",
            display: "flex",
            borderRadius: "5px",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          1{/* {currentPage} */}
        </span>

        <div
        //onClick={handleNextPage}
        //   style={{
        //     cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
        //     opacity: currentPage >= totalPages ? 0.5 : 1,
        //   }}
        >
          <GrNext />
        </div>
      </div>
    </div>
  );
};

export default Users;
