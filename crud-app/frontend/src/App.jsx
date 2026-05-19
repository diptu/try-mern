import React from 'react';
import { Button, Image, Table, Modal, Form, Input, Select } from 'antd';
import { PlusCircleOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';

import './App.css'

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    profile: <Image
      width={200}
      alt="basic"
      src="https://cdn-icons-png.flaticon.com/512/6733/6733137.png"
    />,
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    profile: <Image
      width={200}
      alt="basic"
      src="https://cdn-icons-png.flaticon.com/512/6733/6733137.png"
    />,
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',

    dataIndex: 'name',
    key: 'name',
  },
  {
    profile: 'profile',
    dataIndex: 'profile',
    key: 'profile',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action',

    render: (_, record) => (
      <div className="flex gap-2">
        <Button
          type="text"
          className="hover:bg-green-50"
          style={{ color: '#16a34a' }}
          icon={<EditFilled />}

        />
        <Button
          type="text"
          className="hover:danger"
          style={{ color: '#FF0000' }}
          icon={<DeleteFilled />}
        />
      </div>

    )
  }
];

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

const App = () => (



  <div className="min-h-screen bg-rose-100 flex flex-col items-center md:p-4">
    <div className='flex justify-between items-center  bg-blue-600 w-10/12 my-5 p-4'>
      <h1 className='capitalize font-bold text-white text-xl'>Mern Crud app</h1>
      <Button icon={<PlusCircleOutlined />}></Button>

    </div>
    <div className='w-10/12'>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5, position: ['bottomCenter'] }}
        scroll={{ x: 'max-content' }} />;
    </div>
    <Modal
      open={true}
      footer={null}
      title={
        <h1 className='text-xl font-semibold'>Registration Form</h1>
      }

    >
      <Form layout='vertical' className='font-semibold' initialValues={{ gender: undefined }}>
        <div className='grid md:grid-clo-2 gap-x-2'>
          <Form.Item
            label='profile'
            name='profile'
          >
            <Input type="file" size='large' style={{ borderRadius: 8 }}></Input>
          </Form.Item>

          <Form.Item
            label='fullname'
            name='fullname'
            rules={[{ required: true }]}
          >
            <Input type="text" size='large' style={{ borderRadius: 8 }}></Input>
          </Form.Item>

          <Form.Item
            label='email'
            name='email'
            rules={[{ required: true }]}
          >
            <Input type="email" size='large' style={{ borderRadius: 8 }}></Input>
          </Form.Item>
          <Form.Item
            label='mobile'
            name='mobile'
            rules={[{ required: true }]}
          >
            <Input type="text" size='large' style={{ borderRadius: 8 }}></Input>
          </Form.Item>
          <Form.Item
            label='DOB'
            name='dob'
            rules={[{ required: true }]}
          >
            <Input type="date" size='large' style={{ borderRadius: 8 }}></Input>
          </Form.Item>
          <Form.Item
            label='Gender'
            name='gender'
            rules={[{ required: true }]}
          >
            <Select
              options={genderOptions}
              placeholder="Select gender"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  </div >
);

export default App
