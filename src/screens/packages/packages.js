
import { Table, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
const { Option } = Select;

const PackagesManagement = () => {
  const [bundles, setBundles] = useState([]);
  const [countries, setCountries] = useState([]); // State for storing country options
  const [iso, setIso] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBundles = async () => {
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
        throw new Error('Failed to fetch bundles');
      }

      const data = await response.json();
      setBundles(data.bundles);
      
      // Update countries only if it’s the first fetch
      if (countries.length === 0) {
        const countryOptions = data.bundles.map(bundle => 
          bundle.countries[0] && { 
            name: bundle.countries[0].name, 
            iso: bundle.countries[0].iso 
          }
        ).filter(Boolean);
        setCountries([...new Map(countryOptions.map(item => [item.iso, item])).values()]); // Remove duplicates by ISO code
      }
      
    } catch (error) {
      console.error('Error fetching bundles:', error);
    }
  };

  useEffect(() => {
    fetchBundles();
  }, [iso]);

  const handlePriceChange = (name, value) => {
    setBundles((prevBundles) =>
      prevBundles.map((bundle) =>
        bundle.name === name ? { ...bundle, price: value } : bundle
      )
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
// Filter bundles based on the search query, removing spaces
const filteredBundles = bundles.filter(bundle =>
  (bundle.description.toLowerCase().replace(/\s+/g, '').includes(searchQuery.toLowerCase().replace(/\s+/g, '')) ||
   (Array.isArray(bundle.groups) ? bundle.groups.join(' ').toLowerCase().replace(/\s+/g, '').includes(searchQuery.toLowerCase().replace(/\s+/g, '')) : false))
);

  

  const columns = [
    {
      title: 'Package',
      dataIndex: 'groups',
      key: 'groups',
    },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <Input
          value={record.price}
          onChange={(e) => handlePriceChange(record.name, e.target.value)}
        />
      ),
    },
    {
      title: 'Duration (Days)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Data Amount (MB)',
      dataIndex: 'dataAmount',
      key: 'dataAmount',
      render: (dataAmount) => (dataAmount === -1 ? 'Unlimited' : `${dataAmount} MB`),
    },
    {
      title: 'Country',
      dataIndex: ['countries', 0, 'name'],
      key: 'country',
    },
  ];

  return (
    <div>
      <h2>Packages Management</h2>

      <Select
        placeholder="Select ISO country code"
        value={iso}
        onChange={setIso}
        style={{ width: "100%", marginBottom: '1rem' }}
      >
        {countries.map(country => (
          <Option key={country.iso} value={country.iso}>
            {country.name}
          </Option>
        ))}
      </Select>

      <Input
        placeholder="Search for a package"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ width: "40%", marginBottom: '1rem' }}
      />

      <Table dataSource={filteredBundles} columns={columns} rowKey="name" pagination={false} />
    </div>
  );
};

export default PackagesManagement;
