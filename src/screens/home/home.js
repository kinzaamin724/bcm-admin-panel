import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, Button, message, Popconfirm, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

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
          <Avatar src={image} alt="Profile Image" >
            {!image ? initials : null}
          </Avatar>
        );
      },
    },,
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
      render: (text) => (text ? text : 'N/A'),
    },
    {
      title: "Last Name",
      dataIndex: "lastName", 
      key: "lastName",
      align: "center",
      render: (text) => (text ? text : 'N/A'),
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
          onCancel={() => message.info('User deletion canceled')}
          okText="Yes"
          cancelText="No"
        >
          <Button
            icon={<DeleteOutlined style={{ color: "red" }} />}
            style={{ border: 'none' }}
          />
        </Popconfirm>
      ),
    }
    
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/all?page=5&limit=5&highlightedUserId=6666a9fbf494405b3407899e'
      );
      setData(response.data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         'https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/all?page=5&limit=5&highlightedUserId=6666a9fbf494405b3407899e'
  //       );

  //       const users = response.data.users;
  //       // console.log(users, "===========");
        
  //       setData(users);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/deleteUser?userId=${userId}`
      );
      message.success('User deleted successfully');
      fetchData();
    } catch (error) {
      message.error('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <Typography className='font-semibold text-2xl p-3'>Users</Typography>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id" 
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default Home;
