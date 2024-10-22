// import React, { useState, useEffect } from 'react';
// import { Select, Table, Input, Typography, Button, Row, Col, message } from 'antd';
// import 'antd/dist/reset.css';

// const { Option } = Select;
// const { Title } = Typography;

// const ProfitInput = () => {
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [customProfitRanges, setCustomProfitRanges] = useState([]);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch('https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getCountries?data=web');
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

//   useEffect(() => {
//     if (selectedCountry) {
//       const fetchProfitRanges = async () => {
//         try {
//           const response = await fetch('https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getAllProfits');
//           const data = await response.json();

//           if (data.success) {
//             const countryProfitData = data.data.find(item =>
//               item.countryId && item.countryId.iso === selectedCountry
//             );

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
//               setCustomProfitRanges([]);
//               message.warning(`No data found for the selected country: ${selectedCountry}.`);
//             }
//           } else {
//             setCustomProfitRanges([]); // Reset the profit ranges on failure
//             message.error('Failed to load profit data.');
//           }
//         } catch (error) {
//           setCustomProfitRanges([]); // Reset the profit ranges on error
//           message.error('Error fetching profit data: ' + error.message);
//         }
//       };
//       fetchProfitRanges();
//     } else {
//       setCustomProfitRanges([]); // Reset the profit ranges if no country is selected
//     }
//   }, [selectedCountry]);

//   const handleCountryChange = (value) => {
//     setSelectedCountry(value);
//   };

//   const handleProfitChange = (rangeKey, value) => {
//     const updatedRanges = customProfitRanges.map((range) =>
//       range.key === rangeKey ? { ...range, profit: value + '%' } : range
//     );
//     setCustomProfitRanges(updatedRanges);
//   };

//   const handleSave = () => {
//     console.log('Profit data saved:', customProfitRanges);
//     message.success('Profit data saved successfully.');
//   };

//   const handleCreateProfit = async () => {
//     const profitData = {
//         countryId: { iso: selectedCountry },
//       ranges: customProfitRanges.map(range => range.range), // Collect the ranges to send
//       profit: customProfitRanges.length > 0 ? customProfitRanges[0].profit.replace('%', '') : '0' // Use a default profit value if none are set

//     };
//     console.log("profit show", profitData)
//     try {
//       const response = await fetch('https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/createProfitForCountry', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(profitData),
//       });

//       const data = await response.json();
//       console.log("Server response:", data);
//       if (data.success) {
//         message.success(data.message);
//         setCustomProfitRanges([]); // Clear the ranges after successful submission
//       } else {
//         message.error('Failed to create profit data.');
//       }
//     } catch (error) {
//       message.error('Error creating profit data: ' + error.message);
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
//         <Col span={6} style={{ textAlign: 'right' }}>
//           <Button type="primary" onClick={handleCreateProfit}>
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
//             dataSource={customProfitRanges}
//             pagination={false}
//             bordered
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfitInput;
import React, { useState, useEffect } from "react";
import {
  Select,
  Table,
  Input,
  Typography,
  Button,
  Row,
  Col,
  message,
} from "antd";
import "antd/dist/reset.css";

const { Option } = Select;
const { Title } = Typography;

const ProfitInput = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [customProfitRanges, setCustomProfitRanges] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");

  const staticRanges = [
    "0-9",
    "10-19",
    "20-29",
    "30-39",
    "40-49",
    "50-59",
    "60-69",
    "70-79",
    "80-89",
    "90-99",
    "100-109",
    "110-119",
    "120-129",
    "130-139",
    "140-149",
    "150-159",
    "160-169",
    "170-179",
    "180-189",
    "190-199",
    "200-209",
    "210-219",
    "220-229",
    "230-239",
    "240-249",
    "250-259",
    "260-269",
    "270-279",
    "280-289",
    "290-300",
  ];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getCountries?data=web"
        );
        const data = await response.json();
        // console.log("data ->", data)
        if (data.success) {
          setCountries(data.countries);
        } else {
          message.error("Failed to load countries.");
        }
      } catch (error) {
        message.error("Error fetching countries.");
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchProfitRanges = async () => {
        try {
          const response = await fetch(
            "https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getAllProfits"
          );
          const data = await response.json();

          if (data.success) {
            const countryProfitData = data.data.find(
              (item) => item.countryId && item.countryId.iso === selectedCountry
            );

            if (countryProfitData) {
              const generatedRanges = staticRanges.map((range, index) => ({
                key: `${range}-${index}`,
                range: range,
                profit: countryProfitData.ranges?.includes(range)
                  ? `${countryProfitData.profit}%`
                  : "0%",
              }));

              setCustomProfitRanges(generatedRanges);
            } else {
              const initialRanges = staticRanges.map((range, index) => ({
                key: `${range}-${index}`,
                range: range,
                profit: "0%", // Default profit if no data found
              }));
              setCustomProfitRanges(initialRanges);
              // message.warning(
              //   `No data found for the selected country: ${selectedCountry}.`
              // );
            }
          } else {
            setCustomProfitRanges([]); // Reset the profit ranges on failure
            message.error("Failed to load profit data.");
          }
        } catch (error) {
          setCustomProfitRanges([]); // Reset the profit ranges on error
          message.error("Error fetching profit data: " + error.message);
        }
      };
      fetchProfitRanges();
    } else {
      setCustomProfitRanges([]); // Reset the profit ranges if no country is selected
    }
  }, [selectedCountry]);

  const handleCountryChange = (value) => {
    const country = JSON.parse(value);
    console.log("country ->", country);
    setSelectedCountry(country.iso);
    setSelectedCountryId(country._id);
  };

  const handleProfitChange = (rangeKey, value) => {
    const updatedRanges = customProfitRanges.map((range) =>
      range.key === rangeKey ? { ...range, profit: value + "%" } : range
    );
    setCustomProfitRanges(updatedRanges);
  };
 
  const handleCreateProfit = async () => {
    const profitData = {
      countryId: selectedCountryId,
      ranges: customProfitRanges.map((range) => range.range), // Collect the ranges to send
      profit:
        customProfitRanges.length > 0
          ? customProfitRanges[0].profit.replace("%", "")
          : "0", // Use a default profit value if none are set
    };
    console.log("abc ->", profitData);
    try {
      const response = await fetch(
        "https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/createProfitForCountry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profitData),
        }
      );

      const data = await response.json();
      if (data.success) {
        message.success(data.message);
        setCustomProfitRanges([]); // Clear the ranges after successful submission
      } else {
        message.error("Failed to create profit data.");
      }
    } catch (error) {
      message.error("Error creating profit data: " + error.message);
    }
  };

  const handleKeyDown = (e, rangeKey) => {
    if (e.key === "ArrowUp") {
      increaseProfit(rangeKey);
    } else if (e.key === "ArrowDown") {
      decreaseProfit(rangeKey);
    }
  };

  const increaseProfit = (rangeKey) => {
    const updatedRanges = customProfitRanges.map((range) => {
      if (range.key === rangeKey) {
        const newProfit = parseFloat(range.profit.replace("%", "")) + 1; // Increment by 1%
        return { ...range, profit: `${newProfit}%` };
      }
      return range;
    });
    setCustomProfitRanges(updatedRanges);
  };

  const decreaseProfit = (rangeKey) => {
    const updatedRanges = customProfitRanges.map((range) => {
      if (range.key === rangeKey) {
        const newProfit = Math.max(
          parseFloat(range.profit.replace("%", "")) - 1,
          0
        ); // Decrement by 1%, minimum 0%
        return { ...range, profit: `${newProfit}%` };
      }
      return range;
    });
    setCustomProfitRanges(updatedRanges);
  };

  const columns = [
    {
      title: "Range (Units)",
      dataIndex: "range",
      key: "range",
      width: "50%",
    },
    {
      title: "Profit (%)",
      dataIndex: "profit",
      key: "profit",
      width: "50%",
      render: (text, record) => (
        <Input
          type="number"
          value={text.replace("%", "")}
          onChange={(e) => handleProfitChange(record.key, e.target.value)}
          suffix="%"
          onKeyDown={(e) => handleKeyDown(e, record.key)} // Add key down event handler
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Row justify="space-between" align="middle">
        <Col span={18}>
          <Title level={2}>Select Country to Set Profit Ranges</Title>
        </Col>
        <Col span={6} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={handleCreateProfit}>
            Save
          </Button>
        </Col>
      </Row>

      <Select
        showSearch
        style={{ width: "65%", marginBottom: "20px" }}
        placeholder="Select a Country"
        optionFilterProp="children"
        onChange={(value) => handleCountryChange(value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {countries.map((country) => (
          // <Option key={country.iso} value={country.iso}>
          <Option key={country.iso} value={JSON.stringify(country)}>
            {country.name}
          </Option>
        ))}
      </Select>

      {selectedCountry && (
        <div>
          <Row justify="space-between" align="middle">
            <Col span={20}>
              <Title level={4}>
                Profit Ranges for{" "}
                {countries.find((c) => c.iso === selectedCountry)?.name}
              </Title>
            </Col>
          </Row>
          <Table
            style={{ width: "65%", marginBottom: "20px" }}
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
