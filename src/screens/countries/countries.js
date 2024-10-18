import { message, Switch, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Countries() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getCountries`
      );

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentPage, pageSize]);

  const toggleUserStatus = async (id, val) => {
    setLoading(true);
    try {
      await axios.post(
        `https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/updateCountryStatus`,
        { countryId: id, status: val ? "active" : "disable" }
      );
      message.success("Country status updated successfully");

      fetchData();
    } catch (error) {
      message.error("Failed to update country");
      console.error("Error updating country status:", error);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },

    {
      title: "Flag",
      dataIndex: "flag",
      key: "flag",
      align: "center",
      render: (_, record) => (
        <img
          src={`https://flagsapi.com/${record.iso}/shiny/64.png`}
          alt={record.iso}
        />
      ),
    },

    {
      title: "ISO",
      dataIndex: "iso",
      key: "iso",
      align: "center",
    },

    {
      title: "Active",
      key: "active",
      align: "center",
      render: (_, record) => (
        <Switch
          checked={record.status === "active"}
          onChange={(e) => {
            toggleUserStatus(record._id, e);
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <Typography className="font-semibold text-2xl p-3">Users</Typography>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data.country}
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
}

export default Countries;
