
import { message, Switch, Table, Typography, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { storage } from "../../components/firebase/FirebaseConfig"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 

function Countries() {
  const [data, setData] = useState({ countries: [], totalRecords: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const countriesWithUploader = [
    "Greece", "Cyprus", "Italy", "Austria", "France", "United Kingdom",
    "Belgium", "Croatia", "Czech", "Finland", "Germany", "Spain",
    "Switzerland", "Turkey", "Bulgaria", "Denmark", "Poland", "Portugal",
    "Romania", "Sweden", "United States of America", "United Arab Emirates",
    "Dominica"
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getCountries`
      );

      setData({
        countries: response.data.countries,
        totalRecords: response.data.totalRecords,
      }); 
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally { 
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleUpload = async (file, countryId) => {
    const storageRef = ref(storage, `images/${countryId}/${file.name}`); 
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
  
      
      await axios.post(`https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/updateCountryImage`, {
        countryId: countryId,
        bgImage: url,
      });
  
      message.success(`${file.name} uploaded successfully!`);
      console.log("File available at", url);
    } catch (error) {
      message.error("Upload failed.");
      console.error("Error uploading file:", error);
    }
  };

  const columns = [
    {
      title: "Upload",
      key: "upload",
      align: "center",
      render: (_, record) =>
        countriesWithUploader.includes(record.name) ? (
          <Upload
            beforeUpload={(file) => {
              handleUpload(file, record._id); 
              return false; 
            }}
            showUploadList={false} 
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        ) : null,
    },
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={`https://flagsapi.com/${record.iso}/shiny/64.png`}
            alt={record.iso}
          />
        </div>
      ),
    },
    {
      title: "ISO",
      dataIndex: "iso",
      key: "iso",
      align: "center",
    },
    {
      title: "Status",
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
      <Typography className="font-semibold text-2xl p-3">Countries</Typography>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data.countries}
        rowKey="_id"
        tableLayout="fixed" 
        scroll={{ x: 800 }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data.totalRecords,
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



