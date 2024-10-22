// import React, { useState } from 'react';
// import { Table, Input, Button, Form, Modal } from 'antd';

// const PackagesManagement = () => {
//   // Initial packages data
//   const [packages, setPackages] = useState([
//     { id: 1, name: 'Basic', price: 10 },
//     { id: 2, name: 'Standard', price: 20 },
//     { id: 3, name: 'Premium', price: 30 },
//   ]);

//   const [editingPackage, setEditingPackage] = useState(null); // To store package being edited
//   const [isModalOpen, setIsModalOpen] = useState(false); // For adding new package
//   const [newPackage, setNewPackage] = useState({ name: '', price: '' });

//   const handlePriceChange = (id, value) => {
//     setPackages((prevPackages) =>
//       prevPackages.map((pkg) =>
//         pkg.id === id ? { ...pkg, price: value } : pkg
//       )
//     );
//   };

//   const openEditModal = (pkg) => {
//     setEditingPackage(pkg);
//     setIsModalOpen(true);
//   };

//   const handleSave = () => {
//     setIsModalOpen(false);
//     setEditingPackage(null); // Close modal and reset editing state
//   };

//   const addNewPackage = () => {
//     setPackages([
//       ...packages,
//       { id: packages.length + 1, name: newPackage.name, price: newPackage.price },
//     ]);
//     setNewPackage({ name: '', price: '' });
//     setIsModalOpen(false);
//   };

//   const columns = [
//     {
//       title: 'Package',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Price ($)',
//       dataIndex: 'price',
//       key: 'price',
//       render: (text, record) => (
//         <Input
//           value={record.price}
//           onChange={(e) => handlePriceChange(record.id, e.target.value)}
//         />
//       ),
//     },
   
//   ];

//   return (
//     <div>
//       <h2>Packages Management</h2>
//       <Table dataSource={packages} columns={columns} rowKey="id" pagination={false} />

//       <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginTop: '1rem' }}>
//         Add New Package
//       </Button>

//       <Modal
//         title={editingPackage ? `Edit ${editingPackage.name}` : 'Add New Package'}
//         visible={isModalOpen}
//         onOk={editingPackage ? handleSave : addNewPackage}
//         onCancel={() => setIsModalOpen(false)}
//       >
       
//           <Form>
//             <Form.Item label="Package Name">
//               <Input
//                 value={newPackage.name}
//                 onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
//               />
//             </Form.Item>
//             <Form.Item label="Price">
//               <Input
//                 value={newPackage.price}
//                 onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
//               />
//             </Form.Item>
//           </Form>
        
//       </Modal>
//     </div>
//   );
// };

// export default PackagesManagement;


// import React, { useState, useEffect } from 'react';
// import { Table, Input, Button, Form, Modal } from 'antd';

// const PackagesManagement = () => {
//   // Initial state for packages data
//   const [packages, setPackages] = useState([]);
//   const [editingPackage, setEditingPackage] = useState(null); // To store package being edited
//   const [isModalOpen, setIsModalOpen] = useState(false); // For adding new package
//   const [newPackage, setNewPackage] = useState({ name: '', price: '' });

//   // Fetch API to get packages data
//   const fetchPackages = async () => {
//     const apiKey="0XsdCB2BqnzIOB3vMNQyKMy7yfjeQMQEkpH3i-Pj"
//     try {
//       const response = await fetch(
//         `https://api.esim-go.com/v2.3/catalogue?countries=${iso}`,
//         {
//           method: 'GET',
//           headers: {
//             'X-API-Key': apiKey,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch packages');
//       }

//       const data = await response.json();
//       // Assuming the API response has a list of packages in 'data' field
//       setPackages(data.packages); // Update the packages state with the API response
//     } catch (error) {
//       console.error('Error fetching packages:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPackages(); // Call the fetch function when component mounts
//   }, []);

//   const handlePriceChange = (id, value) => {
//     setPackages((prevPackages) =>
//       prevPackages.map((pkg) =>
//         pkg.id === id ? { ...pkg, price: value } : pkg
//       )
//     );
//   };



//   const handleSave = () => {
//     setIsModalOpen(false);
//     setEditingPackage(null); // Close modal and reset editing state
//   };

//   const addNewPackage = () => {
//     setPackages([
//       ...packages,
//       { id: packages.length + 1, name: newPackage.name, price: newPackage.price },
//     ]);
//     setNewPackage({ name: '', price: '' });
//     setIsModalOpen(false);
//   };

//   const columns = [
//     {
//       title: 'Package',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Price ($)',
//       dataIndex: 'price',
//       key: 'price',
//       render: (text, record) => (
//         <Input
//           value={record.price}
//           onChange={(e) => handlePriceChange(record.id, e.target.value)}
//         />
//       ),
//     },
//   ];

//   return (
//     <div>
//       <h2>Packages Management</h2>
//       <Table dataSource={packages} columns={columns} rowKey="id" pagination={false} />

//       <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginTop: '1rem' }}>
//         Add New Package
//       </Button>

//       <Modal
//         title={editingPackage ? `Edit ${editingPackage.name}` : 'Add New Package'}
//         visible={isModalOpen}
//         onOk={editingPackage ? handleSave : addNewPackage}
//         onCancel={() => setIsModalOpen(false)}
//       >
//         <Form>
//           <Form.Item label="Package Name">
//             <Input
//               value={newPackage.name}
//               onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
//             />
//           </Form.Item>
//           <Form.Item label="Price">
//             <Input
//               value={newPackage.price}
//               onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
//             />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default PackagesManagement;

import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Form, Modal } from 'antd';

const PackagesManagement = () => {
  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({ name: '', price: '' });
  const [iso, setIso] = useState('US'); // Default country code

  const fetchPackages = async () => {
    const apiKey = "0XsdCB2BqnzIOB3vMNQyKMy7yfjeQMQEkpH3i-Pj";
    try {
      const response = await fetch(
        `https://api.esim-go.com/v2.3/catalogue?countries=${iso}`,
        {
          method: 'GET',
          headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }

      const data = await response.json();
      setPackages(data.packages);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [iso]); // Re-fetch data when 'iso' changes

  const handlePriceChange = (id, value) => {
    setPackages((prevPackages) =>
      prevPackages.map((pkg) =>
        pkg.id === id ? { ...pkg, price: value } : pkg
      )
    );
  };

  const handleSave = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
  };

  const addNewPackage = () => {
    setPackages([
      ...packages,
      { id: packages.length + 1, name: newPackage.name, price: newPackage.price },
    ]);
    setNewPackage({ name: '', price: '' });
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Package',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <Input
          value={record.price}
          onChange={(e) => handlePriceChange(record.id, e.target.value)}
        />
      ),
    },
  ];

  return (
    <div>
      <h2>Packages Management</h2>

      {/* Country code input */}
      <Input
        placeholder="Enter ISO country code"
        value={iso}
        onChange={(e) => setIso(e.target.value.toUpperCase())}
        style={{ marginBottom: '1rem' }}
      />

      <Table dataSource={packages} columns={columns} rowKey="id" pagination={false} />

      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ marginTop: '1rem' }}
      >
        Add New Package
      </Button>

      <Modal
        title={editingPackage ? `Edit ${editingPackage.name}` : 'Add New Package'}
        visible={isModalOpen}
        onOk={editingPackage ? handleSave : addNewPackage}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form>
          <Form.Item label="Package Name">
            <Input
              value={newPackage.name}
              onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input
              value={newPackage.price}
              onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PackagesManagement;
