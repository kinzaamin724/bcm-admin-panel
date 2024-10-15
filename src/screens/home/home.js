// import { DeleteOutlined } from '@ant-design/icons';
// import { Button, Table, Typography } from 'antd';
// import React from 'react'

// const Home = () => {
//   const columns = [
//         {
//           title: "Email",
//           dataIndex: "email",
//           key: "email",
//           align: "center",
//         },
//         {
//           title: "Name",
//           dataIndex: "name ",
//           key: "col2",
//           align: "center",
//         },
//         {
//           title: "Column 3",
//           dataIndex: "col3",
//           key: "col3",
//           align: "center",
//         },
//         {
//           title: "Column 4",
//           dataIndex: "col4",
//           key: "col4",
//           align: "center",
//         },
//         {
//           title: "Column 5",
//           dataIndex: "col5",
//           key: "col5",
//           align: "center",
//         },
//         {
//           title: "Column 6",
//           dataIndex: "col6",
//           key: "col6",
//           align: "center",
//         },
//         // {
//         //   title: "Status",
//         //   key: "status",
//         //   align: "center",
//         //   render: (_, record) => (
//         //     <Button
//         //       type="primary"
//         //       // onClick={() => handleStatusChange(record.key, record.active)}
//         //     >
//         //       {/* {record.active ? "Active" : "Inactive"} */}
//         //     </Button>
//         //   ),
//         // },
//         // {
//         //   title: "Delete",
//         //   key: "delete",
//         //   align: "center",
//         //   render: () => (
//         //     <Button type="primary" danger icon={<DeleteOutlined />}>
//         //       Delete
//         //     </Button>
//         //   ),
//         // },
//       ];
//   return (
//     <div>
//          <Typography className='font-semibold text-2xl p-3'>Users</Typography>
//        <Table
//         columns={columns}
//         // dataSource={}
//         // pagination={{ pageSize: 8 }}
//         scroll={{ x: 800 }}
//       />
//     </div>
      
    
//   )
// }

// export default Home



// import { DeleteOutlined } from '@ant-design/icons';
// import { Button, Table, Typography } from 'antd';
// import React, { useEffect, useState } from 'react';

// const Home = () => {
//   const [data, setData] = useState([]);

//   const columns = [
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//       align: "center",
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       align: "center",
//     },
//     {
//       title: "Column 3",
//       dataIndex: "col3",
//       key: "col3",
//       align: "center",
//     },
//     {
//       title: "Column 4",
//       dataIndex: "col4",
//       key: "col4",
//       align: "center",
//     },
//     {
//       title: "Column 5",
//       dataIndex: "col5",
//       key: "col5",
//       align: "center",
//     },
//     {
//       title: "Column 6",
//       dataIndex: "col6",
//       key: "col6",
//       align: "center",
//     },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/all?page=5&limit=5&highlightedUserId=6666a9fbf494405b3407899e');
//         const result = await response.json();
//       console.log(result.data , "===========");
      
//         setData(result.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <Typography className='font-semibold text-2xl p-3'>Users</Typography>
//       <Table
//         columns={columns}
//         dataSource={data}
//         pagination={{ pageSize: 8 }}
//         scroll={{ x: 800 }}
//       />
//     </div>
//   );
// }

// export default Home;


import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, Button, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Profile Image",
      dataIndex: "profileImage", // Extracting profileImage
      key: "profileImage",
      align: "center",
      render: (image) => (
        <Avatar  classNam="" src={image}> </Avatar>
        
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "First Name",
      dataIndex: "firstName", // Extracting firstName if available
      key: "firstName",
      align: "center",
      render: (text) => (text ? text : 'N/A'), // Show 'N/A' if firstName is not available
    },
    {
      title: "Last Name",
      dataIndex: "lastName", // Extracting lastName if available
      key: "lastName",
      align: "center",
      render: (text) => (text ? text : 'N/A'), // Show 'N/A' if lastName is not available
    },
  
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (date) => new Date(date).toLocaleString(), // Format the date
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          icon={<DeleteOutlined style={{color:"red"}} />}
          onClick={() => handleDelete(record._id)}
        >
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/all?page=5&limit=5&highlightedUserId=6666a9fbf494405b3407899e'
        );
        
        // Extract users from the response
        const users = response.data.users;
        // console.log(users, "===========");
        
        setData(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    // Handle the delete action for the user with the given ID
    console.log(`Delete user with id: ${id}`);
    // Here, you could add an axios request to delete the user from the server
  };

  return (
    <div>
      <Typography className='font-semibold text-2xl p-3'>Users</Typography>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id" 
        pagination={{ pageSize: 8 }}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default Home;
