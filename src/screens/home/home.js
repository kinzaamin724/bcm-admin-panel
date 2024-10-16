import { DeleteOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  message,
  Popconfirm,
  Spin,
  Switch,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [spinning, setSpinning] = useState(false);
  const [currentlyUpdating, setCurrentlyUpdating] = useState(null);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
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
    ,
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
        `https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/all?page=${currentPage}&limit=${pageSize}&highlightedUserId=6666a9fbf494405b3407899e`
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentPage, pageSize]);

  const toggleUserStatus = async (id, val) => {
    setSpinning(true); // Show the spinner
    try {
      await axios.put(
        `https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/blockUnBlockUser`,
        { userId: id }
      );
      message.success("User status updated successfully");

      // setData((prev) => {
      //   return {
      //     ...prev,
      //     users: prev.users.map((item) => {
      //       console.log(item);
            
      //       if (item._id === id) return { ...item, isBlocked: val };

      //       return item;
      //     }),
      //   };
      // });
      fetchData();
    } catch (error) {
      message.error("Failed to update user");
      console.error("Error updating user status:", error);
    } finally {
      setSpinning(false);
      setCurrentlyUpdating(null);
    }
  };

  return (
    <div>
      <Typography className="font-semibold text-2xl p-3">Users</Typography>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data.users}
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
