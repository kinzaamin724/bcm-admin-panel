
// import React, { useState, useEffect } from 'react';
// import { Select, Table, Input, Typography, Button, Row, Col } from 'antd';
// import { getData } from 'country-list';
// import 'antd/dist/reset.css'; // Import Ant Design styles

// const { Option } = Select;
// const { Title } = Typography;

// const allCountries = getData();


// const generateRanges = (rangeSize, maxRange, defaultProfit) => {
//   const ranges = [];
//   for (let i = 1; i <= maxRange; i += rangeSize) {
//     const endRange = Math.min(i + rangeSize - 1, maxRange);
//     ranges.push({
//       key: `${i}-${endRange}`,
//       range: `${i}-${endRange}`,
//       profit: defaultProfit + '%',
//     });
//   }
//   return ranges;
// };

// const defaultProfit = 50; 
// const maxRange = 300; 
// const rangeSize = 10; 

// const ProfitInput = () => {
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [customProfitRanges, setCustomProfitRanges] = useState({});

  
//   useEffect(() => {
//     if (selectedCountry) {
//       const generatedRanges = generateRanges(rangeSize, maxRange, defaultProfit);
//       setCustomProfitRanges((prevRanges) => ({
//         ...prevRanges,
//         [selectedCountry]: generatedRanges,
//       }));
//     }
//   }, [selectedCountry]);

//   const handleCountryChange = (value) => {
//     setSelectedCountry(value);
//   };

//   const handleProfitChange = (rangeKey, value) => {
   
//     const updatedRanges = customProfitRanges[selectedCountry]?.map((range) =>
//       range.key === rangeKey ? { ...range, profit: value + '%' } : range
//     );

//     setCustomProfitRanges({
//       ...customProfitRanges,
//       [selectedCountry]: updatedRanges,
//     });
//   };


//   const handleSave = () => {
//     console.log('Profit data saved:', customProfitRanges[selectedCountry]);
   
//   };


//   const columns = [
//     {
//       title: 'Range (Units)',
//       dataIndex: 'range',
//       key: 'range',
//       width:'50%',
//     },
//     {
//       title: 'Profit (%)',
//       dataIndex: 'profit',
//       key: 'profit',
//       width:'50%',
//       render: (text, record) => (
//         <Input
//           type="number"
//           value={text.replace('%', '')}
//           onChange={(e) => handleProfitChange(record.key, e.target.value)}
//           suffix="%"
//         />
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
     
//       <Row justify="space-between" align="middle">
//         <Col span={18}>
//           <Title level={2}>Select Country to Set Profit Ranges</Title>
//         </Col>
//         <Col span={6} style={{ textAlign: 'right' }}>
//           <Button type="primary" onClick={handleSave}>
//             Save
//           </Button>
//         </Col>
//       </Row>

//       <Select
//         showSearch
//         style={{ width: '65%', marginBottom: '20px' }}
//         placeholder="Select a Country"
//         optionFilterProp="children"
//         onChange={handleCountryChange}
//         filterOption={(input, option) =>
//           option.children.toLowerCase().includes(input.toLowerCase())
//         }
//       >
//         {allCountries.map((country) => (
//           <Option key={country.code} value={country.code}>
//             {country.name}
//           </Option>
//         ))}
//       </Select>

 
//       {selectedCountry && (
//         <div>
//           <Row justify="space-between" align="middle">
//             <Col span={20}>
//               <Title level={4}>
//                 Profit Ranges for{' '}
//                 {allCountries.find((c) => c.code === selectedCountry).name}
//               </Title>
//             </Col>
            
//           </Row>
//           <Table
//            style={{ width: '65%', marginBottom: '20px' }}
//             columns={columns}
//             dataSource={customProfitRanges[selectedCountry] || []}
//             pagination={false}
//             bordered
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfitInput;



// import React, { useState, useEffect } from 'react';
// import { Select, Table, Input, Typography, Button, Row, Col } from 'antd';
// import { getData } from 'country-list';
// import axios from 'axios';

// const { Option } = Select;
// const { Title } = Typography;

// const generateRanges = (rangeSize, maxRange, defaultProfit) => {
//   const ranges = [];
//   for (let i = 1; i <= maxRange; i += rangeSize) {
//     const endRange = Math.min(i + rangeSize - 1, maxRange);
//     ranges.push({
//       key: `${i}-${endRange}`,
//       range: `${i}-${endRange}`,
//       profit: defaultProfit + '%',
//     });
//   }
//   return ranges;
// };

// const defaultProfit = 50;
// const maxRange = 300;
// const rangeSize = 10;

// const ProfitInput = () => {
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [customProfitRanges, setCustomProfitRanges] = useState({});
//   const [countries, setCountries] = useState([]);

//   // Fetch countries from API
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get('https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getCountries');
//         // Format countries data if necessary
//         setCountries(response.data.countries.map((country) => ({
//           code: country.iso,
//           name: country.name,
//         })));
//       } catch (error) {
//         console.error('Failed to fetch countries', error);
//       }
//     };
//     fetchCountries();
//   }, []);

//   // Fetch profit ranges for selected country
//   useEffect(() => {
//     const fetchProfitRanges = async () => {
//       if (selectedCountry) {
//         try {
//           const response = await axios.get(`https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getAllProfits?country=${selectedCountry}`);
//           setCustomProfitRanges((prevRanges) => ({
//             ...prevRanges,
//             [selectedCountry]: response.data || generateRanges(rangeSize, maxRange, defaultProfit),
//           }));
//         } catch (error) {
//           console.error('Failed to fetch profit ranges', error);
//         }
//       }
//     };
//     fetchProfitRanges();
//   }, [selectedCountry]);

//   const handleCountryChange = (value) => {
//     setSelectedCountry(value);
//   };

//   const handleProfitChange = (rangeKey, value) => {
//     const updatedRanges = customProfitRanges[selectedCountry]?.map((range) =>
//       range.key === rangeKey ? { ...range, profit: value + '%' } : range
//     );

//     setCustomProfitRanges({
//       ...customProfitRanges,
//       [selectedCountry]: updatedRanges,
//     });
//   };

//   const handleSave = async () => {
//     try {
//       await axios.post('https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/createProfitForCountry', {
//         country: selectedCountry,
//         profitRanges: customProfitRanges[selectedCountry],
//       });
//       console.log('Profit data saved successfully!');
//     } catch (error) {
//       console.error('Failed to save profit data', error);
//     }
//   };

//   const columns = [
//     {
//       title: 'Range (Units)',
//       dataIndex: 'range',
//       key: 'range',
//       width: '50%',
//     },
//     {
//       title: 'Profit (%)',
//       dataIndex: 'profit',
//       key: 'profit',
//       width: '50%',
//       render: (text, record) => (
//         <Input
//           type="number"
//           value={text.replace('%', '')}
//           onChange={(e) => handleProfitChange(record.key, e.target.value)}
//           suffix="%"
//         />
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
//       <Row justify="space-between" align="middle">
//         <Col span={18}>
//           <Title level={2}>Select Country to Set Profit Ranges</Title>
//         </Col>
//       </Row>

//       <Select
//         showSearch
//         style={{ width: '100%', marginBottom: '20px' }}
//         placeholder="Select a Country"
//         optionFilterProp="children"
//         onChange={handleCountryChange}
//         filterOption={(input, option) =>
//           option.children.toLowerCase().includes(input.toLowerCase())
//         }
//       >
//         {countries.map((country) => (
//           <Option key={country.code} value={country.code}>
//             {country.name}
//           </Option>
//         ))}
//       </Select>

//       {selectedCountry && (
//         <div>
//           <Title level={4}>
//             Profit Ranges for{' '}
//             {countries.find((c) => c.code === selectedCountry)?.name}
//           </Title>
//           <Table
//   columns={columns}
//   dataSource={Array.isArray(customProfitRanges[selectedCountry]) ? customProfitRanges[selectedCountry] : []}
//   pagination={false}
//   bordered
// />

//           <Button type="primary" onClick={handleSave} style={{ marginTop: '20px' }}>
//             Save Profit Ranges
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfitInput;



// import React, { useState, useEffect } from 'react';
// import { Select, Table, Input, Typography, Button, Row, Col, message } from 'antd';
// import 'antd/dist/reset.css'; // Import Ant Design styles

// const { Option } = Select;
// const { Title } = Typography;

// const ProfitInput = () => {
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [customProfitRanges, setCustomProfitRanges] = useState({});
  
//   // Fetch countries from the API
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch('https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getCountries');
//         const data = await response.json();
//         if (data.success) {
//           setCountries(data.countries);
//         } else {
//           message.error('Failed to load countries.');
//         }
//       } catch (error) {
//         message.error('Error fetching countries.');
//       }
//     };
//     fetchCountries();
//   }, []);


// useEffect(() => {
//     if (selectedCountry) {
//       const fetchProfitRanges = async () => {
//         try {
//           const response = await fetch('https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getAllProfits');
//           const data = await response.json();
          
//           if (data.success) {
//             const countryProfitData = data.data.find(item => item.countryId.iso === selectedCountry);
            
//             if (countryProfitData) {
            
//               if (countryProfitData.ranges && countryProfitData.ranges.length > 0) {
//                 const generatedRanges = countryProfitData.ranges.map((range, index) => ({
//                   key: `${range}-${index}`,
//                   range: range,
//                   profit: `${countryProfitData.profit}%`
//                 }));
                
//                 setCustomProfitRanges((prevRanges) => ({
//                   ...prevRanges,
//                   [selectedCountry]: generatedRanges,
//                 }));
//               } else {
          
//                 setCustomProfitRanges((prevRanges) => ({
//                   ...prevRanges,
//                   [selectedCountry]: [], 
//                 }));
//                 message.warning(`No profit ranges available for ${selectedCountry}.`);
//               }
//             } else {
//               message.warning(`No data found for the selected country: ${selectedCountry}.`);
//             }
//           } else {
//             message.error('Failed to load profit data.');
//           }
//         } catch (error) {
//           message.error('Error fetching profit data: ' + error.message);
//         }
//       };
//       fetchProfitRanges();
//     }
//   }, [selectedCountry]);
  

//   const handleCountryChange = (value) => {
//     setSelectedCountry(value);
//   };

//   const handleProfitChange = (rangeKey, value) => {
//     const updatedRanges = customProfitRanges[selectedCountry]?.map((range) =>
//       range.key === rangeKey ? { ...range, profit: value + '%' } : range
//     );
//     setCustomProfitRanges({
//       ...customProfitRanges,
//       [selectedCountry]: updatedRanges,
//     });
//   };

//   const handleSave = () => {
//     console.log('Profit data saved:', customProfitRanges[selectedCountry]);
//     message.success('Profit data saved successfully.');
//   };

//   const columns = [
//     {
//       title: 'Range (Units)',
//       dataIndex: 'range',
//       key: 'range',
//       width: '50%',
//     },
//     {
//       title: 'Profit (%)',
//       dataIndex: 'profit',
//       key: 'profit',
//       width: '50%',
//       render: (text, record) => (
//         <Input
//           type="number"
//           value={text.replace('%', '')}
//           onChange={(e) => handleProfitChange(record.key, e.target.value)}
//           suffix="%"
//         />
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
//       <Row justify="space-between" align="middle">
//         <Col span={18}>
//           <Title level={2}>Select Country to Set Profit Ranges</Title>
//         </Col>
//         <Col span={6} style={{ textAlign: 'right' }}>
//           <Button type="primary" onClick={handleSave}>
//             Save
//           </Button>
//         </Col>
//       </Row>

//       <Select
//         showSearch
//         style={{ width: '65%', marginBottom: '20px' }}
//         placeholder="Select a Country"
//         optionFilterProp="children"
//         onChange={handleCountryChange}
//         filterOption={(input, option) =>
//           option.children.toLowerCase().includes(input.toLowerCase())
//         }
//       >
//         {countries.map((country) => (
//           <Option key={country.iso} value={country.iso}>
//             {country.name}
//           </Option>
//         ))}
//       </Select>

//       {selectedCountry && (
//         <div>
//           <Row justify="space-between" align="middle">
//             <Col span={20}>
//               <Title level={4}>
//                 Profit Ranges for{' '}
//                 {countries.find((c) => c.iso === selectedCountry)?.name}
//               </Title>
//             </Col>
//           </Row>
//           <Table
//             style={{ width: '65%', marginBottom: '20px' }}
//             columns={columns}
//             dataSource={customProfitRanges[selectedCountry] || []}
//             pagination={false}
//             bordered
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfitInput;
import React, { useState, useEffect } from 'react';
import { Select, Table, Input, Typography, Button, Row, Col, message } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles

const { Option } = Select;
const { Title } = Typography;

const ProfitInput = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [customProfitRanges, setCustomProfitRanges] = useState([]);

  // Fetch countries from the API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getCountries');
        const data = await response.json();
        if (data.success) {
          setCountries(data.countries);
        } else {
          message.error('Failed to load countries.');
        }
      } catch (error) {
        message.error('Error fetching countries.');
      }
    };
    fetchCountries();
  }, []);

//   useEffect(() => {
//     if (selectedCountry) {
//       const fetchProfitRanges = async () => {
//         try {
//           const response = await fetch('https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getAllProfits');
//           const data = await response.json();

//           if (data.success) {
//             const countryProfitData = data.data.find(item => item.countryId.iso === selectedCountry);

//             if (countryProfitData) {
//               if (countryProfitData.ranges && countryProfitData.ranges.length > 0) {
//                 const generatedRanges = countryProfitData.ranges.map((range, index) => ({
//                   key: `${range}-${index}`,
//                   range: range,
//                   profit: `${countryProfitData.profit}%`
//                 }));

//                 setCustomProfitRanges(generatedRanges);
//               } else {
//                 setCustomProfitRanges([]);
//                 message.warning(`No profit ranges available for ${selectedCountry}.`);
//               }
//             } else {
//               message.warning(`No data found for the selected country: ${selectedCountry}.`);
//             }
//           } else {
//             message.error('Failed to load profit data.');
//           }
//         } catch (error) {
//           message.error('Error fetching profit data: ' + error.message);
//         }
//       };
//       fetchProfitRanges();
//     }
//   }, [selectedCountry]);
useEffect(() => {
    if (selectedCountry) {
      const fetchProfitRanges = async () => {
        try {
          const response = await fetch('https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getAllProfits');
          const data = await response.json();
  
          if (data.success) {
            const countryProfitData = data.data.find(item => 
              item.countryId && item.countryId.iso === selectedCountry // Ensure countryId exists
            );
  
            if (countryProfitData) {
              if (countryProfitData.ranges && countryProfitData.ranges.length > 0) {
                const generatedRanges = countryProfitData.ranges.map((range, index) => ({
                  key: `${range}-${index}`,
                  range: range,
                  profit: `${countryProfitData.profit}%`
                }));
  
                setCustomProfitRanges(generatedRanges);
              } else {
                setCustomProfitRanges([]);
                message.warning(`No profit ranges available for ${selectedCountry}.`);
              }
            } else {
              message.warning(`No data found for the selected country: ${selectedCountry}.`);
            }
          } else {
            message.error('Failed to load profit data.');
          }
        } catch (error) {
          message.error('Error fetching profit data: ' + error.message);
        }
      };
      fetchProfitRanges();
    }
  }, [selectedCountry]);
  
  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const handleProfitChange = (rangeKey, value) => {
    const updatedRanges = customProfitRanges.map((range) =>
      range.key === rangeKey ? { ...range, profit: value + '%' } : range
    );
    setCustomProfitRanges(updatedRanges);
  };

  const handleSave = () => {
    console.log('Profit data saved:', customProfitRanges);
    message.success('Profit data saved successfully.');
  };

  const handleCreateProfit = async () => {
    const profitData = {
        _id: { iso: selectedCountry },
      ranges: customProfitRanges.map(range => range.range), // Collect the ranges to send
      profitData: customProfitRanges.length > 0 ? customProfitRanges[0].profit.replace('%', '') : '0' // Use a default profit value if none are set
    };

    try {
      const response = await fetch('https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/createProfitForCountry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profitData),
      });

      const data = await response.json();
      if (data.success) {
        message.success(data.message);
        setCustomProfitRanges([]); // Clear the ranges after successful submission
      } else {
        message.error('Failed to create profit data.');
      }
    } catch (error) {
      message.error('Error creating profit data: ' + error.message);
    }
  };

  const columns = [
    {
      title: 'Range (Units)',
      dataIndex: 'range',
      key: 'range',
      width: '50%',
    },
    {
      title: 'Profit (%)',
      dataIndex: 'profit',
      key: 'profit',
      width: '50%',
      render: (text, record) => (
        <Input
          type="number"
          value={text.replace('%', '')}
          onChange={(e) => handleProfitChange(record.key, e.target.value)}
          suffix="%"
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <Row justify="space-between" align="middle">
        <Col span={18}>
          <Title level={2}>Select Country to Set Profit Ranges</Title>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={handleCreateProfit}>
            Save
          </Button>
        </Col>
      </Row>

      <Select
        showSearch
        style={{ width: '65%', marginBottom: '20px' }}
        placeholder="Select a Country"
        optionFilterProp="children"
        onChange={handleCountryChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {countries.map((country) => (
          <Option key={country.iso} value={country.iso}>
            {country.name}
          </Option>
        ))}
      </Select>

      {selectedCountry && (
        <div>
          <Row justify="space-between" align="middle">
            <Col span={20}>
              <Title level={4}>
                Profit Ranges for{' '}
                {countries.find((c) => c.iso === selectedCountry)?.name}
              </Title>
            </Col>
          </Row>
          <Table
            style={{ width: '65%', marginBottom: '20px' }}
            columns={columns}
            dataSource={customProfitRanges}
            pagination={false}
            bordered
          />
        </div>
      )}
    </div>
  );
};

export default ProfitInput;
