import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Input,
  message,
  Popconfirm,
  Spin,
  Switch,
  Table,
  Typography,
}
from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/home/home.scss";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [spinning, setSpinning] = useState(false);
  const [currentlyUpdating, setCurrentlyUpdating] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Profile Image",
      dataIndex: "profileImage",
      key: "profileImage",
      align: "center",
      render: (image, record) => {
        const email = record.email || "";
        const initials = email.substring(0, 2).toUpperCase();
        return (
          <Avatar src={image} alt="Profile Image">
            {!image ? initials : null}
          </Avatar>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Reference ID",
      dataIndex: "_id",
      key: "_id",
      align: "center",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDelete(record._id)}
          onCancel={() => message.info("User deletion canceled")}
          okText="Yes"
          cancelText="No"
        >
          <Button
            icon={<DeleteOutlined style={{ color: "red" }} />}
            style={{ border: "none" }}
          />
        </Popconfirm>
      ),
    },
    {
      title: "Status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <Spin spinning={spinning && currentlyUpdating === record._id}>
          <Switch
            checked={!record.isBlocked}
            onChange={(e) => {
              setCurrentlyUpdating(record._id);
              toggleUserStatus(record._id, e);
            }}
          />
        </Spin>
      ),
    },
  ];

 
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/all`,
        {
          params: {
            page: currentPage,
            limit: pageSize,
            ...(searchQuery && { search: searchQuery }), 
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/deleteUser?userId=${userId}`
      );
      message.success("User deleted successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to delete user");
      console.error("Error deleting user:", error);
    }
  };

  const toggleUserStatus = async (id, val) => {
    setSpinning(true);
    try {
      await axios.put(
        `https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/blockUnBlockUser`,
        { userId: id }
      );
      message.success("User status updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update user");
      console.error("Error updating user status:", error);
    } finally {
      setSpinning(false);
      setCurrentlyUpdating(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1); 
    fetchData(); 
  };
  

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]); 

  return (
    <div>
      <div className="search-input">
        <Typography className="font-semibold text-2xl">Users</Typography>
        <Input
  prefix={<SearchOutlined />}
  className="search-email"
  type="search"
  placeholder="Type to search by email..."
  value={searchQuery}
  onChange={handleSearchChange}
  onPressEnter={handleSearch}
  allowClear // Enable clear button
/>

       
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data.users}
        tableLayout="fixed"
        rowKey="_id"
        scroll={{ x: 800 }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data.total,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />
    </div>
  );
};

export default Home;
