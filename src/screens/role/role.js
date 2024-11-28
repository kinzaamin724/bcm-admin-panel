

import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Typography, Alert } from 'antd';
import axios from 'axios';
import debounce from 'lodash.debounce'; 
import "../../style/home/home.scss";

const { Option } = Select;

const UpdateUserRole = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [allEmails, setAllEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loadingEmails, setLoadingEmails] = useState(true);


  const fetchAllUsers = async () => {
    let emails = [];
    let page = 1;
    const limit = 100; 
    let hasMoreData = true;

    try {
      while (hasMoreData) {
        const response = await axios.get(
          `https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/all?page=${page}&limit=${limit}`
        );
        if (response.data.success) {
          emails = [...emails, ...response.data.users.map((user) => user.email)];
          hasMoreData = response.data.hasMoreData;
          page += 1;
        } else {
          setError('Failed to fetch user emails.');
          hasMoreData = false;
        }
      }
      setAllEmails(emails);
      setFilteredEmails(emails); 
      setLoadingEmails(false); 
    } catch (err) {
      setError('Error fetching user emails.');
      setLoadingEmails(false);
    }
  };

 
  useEffect(() => {
    fetchAllUsers();
  }, []);


  const handleSearch = debounce((value) => {
    if (value) {
      const filtered = allEmails.filter((email) =>
        email.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredEmails(filtered);
    } else {
      setFilteredEmails(allEmails); 
    }
  }, 300); 
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

  
    if (loadingEmails) {
      setError('Please wait while the emails are loading.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/updateUserRole',
        { email, role }
      );
      if (response.data.success) {
        setSuccess('User role updated successfully.');
        fetchAllUsers();
      } else {
        setError('Failed to update the user role.');
      }
    } catch (err) {
      setError('Error updating the user role.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="screen">
      <div className="form-container">
        <Typography className="font-semibold text-2xl p-3">Role Management</Typography>
        {error && <Alert message={error} type="error" showIcon closable />}
        {success && <Alert message={success} type="success" showIcon closable />}
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          className="w-[400px] m-0 p-8"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter the email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Select
              showSearch
              placeholder="Select email"
              value={email}
              onChange={(value) => setEmail(value)}
              onSearch={handleSearch} 
              filterOption={false} 
              loading={loadingEmails} 
            >
              {filteredEmails.map((email) => (
                <Option key={email} value={email}>
                  {email}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select
              placeholder="Select role"
              value={role}
              onChange={(value) => setRole(value)}
            >
              <Option value="admin">Admin</Option>
              <Option value="subadmin">Subadmin</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isSubmitting}
              disabled={loadingEmails}
            >
              Update Role
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUserRole;
