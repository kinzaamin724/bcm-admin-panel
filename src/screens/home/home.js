import { DeleteOutlined } from '@ant-design/icons';
import { Button, Table, Typography } from 'antd';
import React from 'react'

const Home = () => {
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
        // {
        //   title: "Status",
        //   key: "status",
        //   align: "center",
        //   render: (_, record) => (
        //     <Button
        //       type="primary"
        //       // onClick={() => handleStatusChange(record.key, record.active)}
        //     >
        //       {/* {record.active ? "Active" : "Inactive"} */}
        //     </Button>
        //   ),
        // },
        // {
        //   title: "Delete",
        //   key: "delete",
        //   align: "center",
        //   render: () => (
        //     <Button type="primary" danger icon={<DeleteOutlined />}>
        //       Delete
        //     </Button>
        //   ),
        // },
      ];
  return (
    <div>
         <Typography className='font-semibold text-2xl p-3'>Users</Typography>
       <Table
        columns={columns}
        // dataSource={}
        // pagination={{ pageSize: 8 }}
        scroll={{ x: 800 }}
      />
    </div>
      
    
  )
}

export default Home
