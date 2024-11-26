import React, { useEffect, useState, useCallback } from 'react';
import { Input, Table, Typography } from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import "../../style/home/home.scss";

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSubscriptions = useCallback(
    async (page, limit, query = '') => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getAllSubscriptions`,
          {
            params: {
              page,
              limit,
              ...(query && { customerEmail: query }), 
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
          setSubscriptions([]); 
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const debounceSearch = useCallback((query) => {
    const debounceTimeout = setTimeout(() => {
      fetchSubscriptions(1, pageSize, query);
    }, 300); 
    return () => clearTimeout(debounceTimeout);
  }, [fetchSubscriptions, pageSize]);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debounceSearch(value); 
  };
  useEffect(() => {
    if (!searchQuery) {
      fetchSubscriptions(currentPage, pageSize); 
    }
  }, [currentPage, pageSize, searchQuery, fetchSubscriptions]);

  const columns = [
    {
      title: 'Email',
      dataIndex: 'customerEmail',
      key: 'customerEmail',
      align : 'center',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      align : 'center',
    },
    {
      title: 'Data Type',
      dataIndex: 'dataType',
      key: 'dataType',
      align : 'center',
    },
    {
      title: 'Validity',
      dataIndex: 'validity',
      key: 'validity',
      align : 'center',
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
      align : 'center',
    },
    {
      title: 'Original Price',
      dataIndex: 'ammountOriginalPrice',
      key: 'ammountOriginalPrice',
      align : 'center',
    },
    {
      title: 'Cash Back Amount',
      dataIndex: 'cashBackAmount',
      key: 'cashBackAmount',
      align : 'center',
    },
    {
      title: 'Old In-App Cash',
      dataIndex: 'userOldInAppCash',
      key: 'userOldInAppCash',
      align : 'center',
    },
    {
      title: 'ICC ID',
      dataIndex: 'iccID',
      key: 'iccID',
      align : 'center',
    },
  ];

  return (
    <div>
      <div className="search-input">
        <Typography className="font-semibold text-2xl">Subscription Details</Typography>
        <Input
          prefix={<SearchOutlined />}  
          className="search-email"
          id="user-search"
          type="search"
          placeholder="Type to search by email..."
          value={searchQuery}
          onChange={handleSearchChange}
          allowClear
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
        }}
      />
    </div>
  );
};

export default Subscription;
