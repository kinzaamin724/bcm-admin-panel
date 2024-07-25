// src/components/Home.js
import React from "react";
import { Table, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import axios from "axios";
import "../../style/home/home.scss";

const fetchUsers = async ({ queryKey }) => {
  const [_, page, limit] = queryKey;
  const response = await axios.get(`https://by-sim-backend.vercel.app/admin/user/all?page=${page}&limit=${limit}`);
  return response.data;
};

const columns = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
  },
  {
    title: "Column 2",
    dataIndex: "col2",
    key: "col2",
    align: "center",
  },
  {
    title: "Column 3",
    dataIndex: "col3",
    key: "col3",
    align: "center",
  },
  {
    title: "Column 4",
    dataIndex: "col4",
    key: "col4",
    align: "center",
  },
  {
    title: "Column 5",
    dataIndex: "col5",
    key: "col5",
    align: "center",
  },
  {
    title: "Column 6",
    dataIndex: "col6",
    key: "col6",
    align: "center",
  },
  {
    title: "Status",
    key: "status",
    align: "center",
    render: (_, record) => (
      <Button type="primary">
        {record.active ? "Active" : "Inactive"}
      </Button>
    ),
  },
  {
    title: "Delete",
    key: "delete",
    align: "center",
    render: (_, record) => (
      <Button type="primary" danger icon={<DeleteOutlined />}>
        Delete
      </Button>
    ),
  },
];

export default function Home() {
  const { data, isLoading, isError, error } = useQuery(["users", 1, 10], fetchUsers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data: {error.message}</div>;
  }

  const userData = data?.users.map(user => ({
    key: user.id,
    email: user.email,
    col2: user.col2, 
    col3: user.col3, 
    col4: user.col4, 
    col5: user.col5, 
    col6: user.col6, 
    active: user.active,
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Users</h1>
      <Table
        columns={columns}
        dataSource={userData}
        pagination={{ pageSize: 8 }}
        scroll={{ x: 800 }}
      />
    </div>
  );
}
