import React, { useEffect, useState } from 'react';
import { Input, Table, Typography } from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [pageSize, setPageSize] = useState(10); 
  const [totalCount, setTotalCount] = useState(0); 
  const [searchQuery, setSearchQuery] = useState('');


  // const fetchSubscriptions = async (page, limit) => {
  //   try {
  //     setLoading(true); 
  //     const response = await axios.get(
  //       `https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getAllSubscriptions?page=${page}&limit=${limit}`
  //     );

   
  //     if (response.data.allSubscriptions) {
  //       const data = response.data.allSubscriptions.map((item, index) => ({
  //         key: (page - 1) * limit + (index + 1),
  //         customerEmail: item.customerEmail || 'N/A',
  //         ammountOriginalPrice:`$${parseFloat(item.ammountOriginalPrice || 0).toFixed(2)}`,
  //          userOldInAppCash:`$${parseFloat(item.userOldInAppCash || 0).toFixed(2)}`,
  //         country: item.country || 'N/A',
  //         dataType: item.dataType || 'N/A',
  //         validity: item.validity || 'N/A',
  //         payment: `$${parseFloat(item.payment || 0).toFixed(2)}`,
  //         cashBackAmount: `$${parseFloat(item.cashBackAmmount || 0).toFixed(2)}`,
  //         // cashbackPercentage: `${parseFloat(item.cashbackPercentage || 0).toFixed(2).padStart(5, '0')}%`,
  //         iccID: item.iccid,
  //       }));
  //       setSubscriptions(data);

  //       setTotalCount(response.data.totalSubscriptions || 0); 
  //     } else {
  //       console.error('No subscriptions data in response');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching subscriptions:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchSubscriptions = async (page, limit) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getAllSubscriptions`,
        {
          params: {
            page,
            limit,
            ...(searchQuery && { customerEmail: searchQuery }), // Include customerEmail only if searchQuery is not empty
          },
        }
      );
  
      if (response.data.allSubscriptions) {
        const data = response.data.allSubscriptions.map((item, index) => ({
          key: (page - 1) * limit + (index + 1),
          customerEmail: item.customerEmail || 'N/A',
          ammountOriginalPrice: `$${parseFloat(item.ammountOriginalPrice || 0).toFixed(2)}`,
          userOldInAppCash: `$${parseFloat(item.userOldInAppCash || 0).toFixed(2)}`,
          country: item.country || 'N/A',
          dataType: item.dataType || 'N/A',
          validity: item.validity || 'N/A',
          payment: `$${parseFloat(item.payment || 0).toFixed(2)}`,
          cashBackAmount: `$${parseFloat(item.cashBackAmmount || 0).toFixed(2)}`,
          iccID: item.iccid,
        }));
        setSubscriptions(data);
        setTotalCount(response.data.totalSubscriptions || 0);
      } else {
        console.error('No subscriptions data in response');
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchSubscriptions(currentPage, pageSize);
  }, [currentPage, pageSize]);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page
    fetchSubscriptions(1, pageSize); // Fetch data with search query
  };
  
  const columns = [
    {
      title: 'Email',
      dataIndex: 'customerEmail',
      key: 'customerEmail',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Data Type',
      dataIndex: 'dataType',
      key: 'dataType',
    },
    {
      title: 'Validity',
      dataIndex: 'validity',
      key: 'validity',
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: 'Original Price',
      dataIndex: 'ammountOriginalPrice',
      key: 'ammountOriginalPrice',
    }
    ,
    {
      title: 'Cash Back Amount',
      dataIndex: 'cashBackAmount',
      key: 'cashBackAmount',
    },
    {
      title: "Old In-App Cash",
      dataIndex: "userOldInAppCash",
      key: "userOldInAppCash",
    },
   

    // {
    //   title: 'Cash Back Percentage',
    //   dataIndex: 'cashbackPercentage',
    //   key: 'cashbackPercentage',
    // },
    {
      title: 'ICC ID',
      dataIndex: 'iccID',
      key: 'iccID',
    },
  ];

  return (
    <div>
      <div className="search-input">
      <Typography className="font-semibold text-2xl"> Subscription Details</Typography>
      <Input
  prefix={<SearchOutlined />}
  className="search-email"
  id="user-search"
  type="search"
  placeholder="Type to search by email..."
  value={searchQuery} // Bind value to state
  onChange={handleSearchChange} // Update search query on input change
  onPressEnter={handleSearch} // Trigger search on Enter key press
  allowClear // Enable clear button
/>
</div>
    
      <Table
        tableLayout="fixed"
        columns={columns}
        dataSource={subscriptions}
        loading={loading}
        pagination={{
          current: currentPage, 
          pageSize: pageSize, 
          total: totalCount, 
          showSizeChanger: true, 
          pageSizeOptions: ['10', '20', '50', '100'], 
          onChange: (page, pageSize) => {
      
            setCurrentPage(page); 
            setPageSize(pageSize); 
          },
          onShowSizeChange: (current, size) => {
         
            setPageSize(size); 
            setCurrentPage(1); 
          },
        }}
      />
    </div>
  );
};

export default Subscription;
