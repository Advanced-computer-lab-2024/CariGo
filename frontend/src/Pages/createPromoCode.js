import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, message } from 'antd';
import axios from 'axios';

const CreatePromoCode = () => {
  const [form] = Form.useForm();
  const token = localStorage.getItem('jwt');

  const handleSubmit = async (values) => {
  try {
    const response = await axios.post('http://localhost:4000/Admin/promo-code', values, {
        headers: { authorization: `Bearer ${token}` }
      }); // Update with your endpoint
    message.success('Promo Code created successfully!');
    console.log('Server Response:', response.data);
  } catch (error) {
    console.error('Error creating promo code:', error);
    message.error('Failed to create promo code. Please try again.');
  }
};

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h2>Create Promo Code</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          discount: 10,
        }}
      >
        <Form.Item
          label="Promo Code"
          name="code"
          rules={[{ required: true, message: 'Please enter a promo code' }]}
        >
          <Input placeholder="Enter promo code" />
        </Form.Item>

        <Form.Item
          label="Discount Percentage"
          name="discount"
          rules={[{ required: true, message: 'Please enter a discount percentage' }]}
        >
          <InputNumber min={1} max={100} placeholder="Enter discount percentage" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Expiration Date"
          name="expirationDate"
          rules={[{ required: true, message: 'Please select an expiration date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Promo Code
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePromoCode;
