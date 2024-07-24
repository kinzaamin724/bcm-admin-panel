// src/components/Home.js
import React from "react";
import { Table, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "../../style/home/home.scss"
const columns = [
  {
    title: "Column 1",
    dataIndex: "col1",
    key: "col1",
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

const data = [
  {
    key: "1",
    col1: "Data 1",
    col2: "Data 2",
    col3: "Data 3",
    col4: "Data 4",
    col5: "Data 5",
    col6: "Data 6",
    active: true,
  },
  {
    key: "2",
    col1: "Data A",
    col2: "Data B",
    col3: "Data C",
    col4: "Data D",
    col5: "Data E",
    col6: "Data F",
    active: false,
  },
];

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Home</h1>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 8 }}
        scroll={{ x: 800 }}
      />
    </div>
  );
}
