
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
  Spin,
} from "antd";
import "antd/dist/reset.css";

const { Option } = Select;
const { Title } = Typography;

const ProfitInput = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [customProfitRanges, setCustomProfitRanges] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [loading, setLoading] = useState(false); 

  const staticRanges = [
   "0-9", "9-19", "19-29", "29-39", "39-49", "49-59", "59-69", "69-79", "79-89", "89-99", 
"99-109", "109-119", "119-129", "129-139", "139-149", "149-159", "159-169", "169-179", 
"179-189", "189-199", "199-209", "209-219", "219-229", "229-239", "239-249", "249-259", 
"259-269", "269-279", "279-289", "289-300"

  ];

  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/getCountries?data=web"
        );
        const data = await response.json();

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

  
  const fetchProfitRanges = async () => {
    if (!selectedCountry) return; 

    setLoading(true); 

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
          const generatedRanges = staticRanges.map((range, index) => {
            const profitValue = countryProfitData.ranges?.find(
              (r) => r.range === range
            )?.profit || 0;
            return {
              key: `${range}-${index}`,
              range: range,
              profit: profitValue,
            };
          });

          setCustomProfitRanges(generatedRanges);
        } else {
          const initialRanges = staticRanges.map((range, index) => ({
            key: `${range}-${index}`,
            range: range,
            profit: 0,
          }));
          setCustomProfitRanges(initialRanges);
        }
      } else {
        setCustomProfitRanges([]);
        message.error("Failed to load profit data.");
      }
    } catch (error) {
      setCustomProfitRanges([]);
      message.error("Error fetching profit data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchProfitRanges();
  }, [selectedCountry]);

  const handleCountryChange = (value) => {
    const country = JSON.parse(value);
    setSelectedCountry(country.iso);
    setSelectedCountryId(country._id);
  };

  const handleProfitChange = (rangeKey, value) => {
    const updatedRanges = customProfitRanges.map((range) =>
      range.key === rangeKey ? { ...range, profit: Number(value) } : range
    );
    setCustomProfitRanges(updatedRanges);
  };

  const handleCreateProfit = async () => {
    setLoading(true); 
    const profitData = {
      countryId: selectedCountryId,
      ranges: customProfitRanges.map((range) => ({
        range: range.range,
        profit: range.profit,
      })),
    };

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
        message.success("Profit Updated Successfully");

        
        fetchProfitRanges();
      } else {
        message.error("Failed to create profit data.");
      }
    } catch (error) {
      message.error("Error creating profit data: " + error.message);
    } finally {
      setLoading(false); 
    }
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
          value={record.profit}
          onChange={(e) => handleProfitChange(record.key, e.target.value)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Spin spinning={loading}> 
        <Row justify="space-between" align="middle">
          <Col span={18}>
            <Title level={2}>Select Country to Set Profit Ranges</Title>
          </Col>
          <Col span={6} style={{ textAlign: "right" }}>
            <Button type="primary" onClick={handleCreateProfit} disabled={loading}>
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
      </Spin>
    </div>
  );
};

export default ProfitInput;
