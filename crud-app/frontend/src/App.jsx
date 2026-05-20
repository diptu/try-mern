import React, { useState } from 'react';

import {
  Button,
  Image,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
} from 'antd';

import {
  PlusCircleOutlined,
  EditFilled,
  DeleteFilled,
  PlusOutlined,
} from '@ant-design/icons';

import './App.css';

const initialProducts = [
  {
    key: '1',
    title: 'Mechanical Keyboard K2',
    brand: 'Keychron',
    description: 'Wireless mechanical keyboard',
    price: 89,
    discountPrice: 79,
    stock: 45,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&q=80',
        altText: 'Mechanical Keyboard Front View',
      },
    ],
  },
  {
    key: '2',
    title: 'Gaming Mouse',
    brand: 'Logitech',
    description: 'High precision wireless mouse',
    price: 99,
    discountPrice: 89,
    stock: 12,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200&q=80',
        altText: 'Gaming Mouse Side View',
      },
    ],
  },
];

const App = () => {
  const [modal, setModal] = useState(false);
  const [form] = Form.useForm();

  const [products, setProducts] = useState(initialProducts);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',

      render: (images) => (
        <Image
          width={70}
          height={70}
          className="object-cover rounded"
          alt={images?.[0]?.altText || 'Product'}
          src={
            images?.[0]?.url ||
            'https://placehold.co/70x70?text=No+Image'
          }
        />
      ),
    },

    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },

    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },

    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',

      render: (price) => `$${price}`,
    },

    {
      title: 'Discount Price',
      dataIndex: 'discountPrice',
      key: 'discountPrice',

      render: (discountPrice) =>
        discountPrice ? (
          `$${discountPrice}`
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },

    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',

      render: (stock) => (
        <span
          className={
            stock < 10
              ? 'text-red-500 font-semibold'
              : 'text-green-600'
          }
        >
          {stock} units
        </span>
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',

      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<EditFilled />}
            style={{ color: '#16a34a' }}
          />

          <Button
            type="text"
            icon={<DeleteFilled />}
            style={{ color: '#ff0000' }}
          />
        </div>
      ),
    },
  ];

  const onFinish = (values) => {
    const slug = values.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProduct = {
      key: Date.now().toString(),

      title: values.title,
      slug,
      description: values.description,
      brand: values.brand,
      price: values.price,
      discountPrice: values.discountPrice,
      stock: values.stock,

      images: [
        {
          url: values.imageUrl,
          altText: values.altText,
        },
      ],
    };

    console.log('Product Payload:', newProduct);

    setProducts([...products, newProduct]);

    form.resetFields();
    setModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center md:p-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-emerald-600 w-10/12 my-5 p-4 rounded shadow">
        <h1 className="capitalize font-bold text-white text-xl">
          Product Inventory Manager
        </h1>

        <Button
          type="primary"
          size="large"
          icon={<PlusCircleOutlined />}
          onClick={() => setModal(true)}
          className="text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 border-2"
          style={{
            borderRadius: '8px',
          }}
        >
          Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="w-10/12 bg-white p-4 rounded shadow">
        <Table
          dataSource={products}
          columns={columns}
          pagination={{
            pageSize: 5,
            position: ['bottomCenter'],
          }}
          scroll={{ x: 'max-content' }}
        />
      </div>

      {/* Modal */}
      <Modal
        open={modal}
        footer={null}
        width={750}
        onCancel={() => {
          setModal(false);
          form.resetFields();
        }}
        title={
          <h1 className="text-xl font-semibold">
            Add New Product
          </h1>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            stock: 0,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            {/* Product Title */}
            <Form.Item
              label="Product Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Product title is required',
                },
                {
                  max: 200,
                  message:
                    'Title cannot exceed 200 characters',
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter product title"
                style={{ borderRadius: 0 }}
              />
            </Form.Item>

            {/* Brand */}
            <Form.Item
              label="Brand"
              name="brand"
              rules={[
                {
                  required: true,
                  message: 'Brand name is required',
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter brand name"
                style={{ borderRadius: 0 }}
              />
            </Form.Item>

            {/* Price */}
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Price is required',
                },
              ]}
            >
              <InputNumber
                min={0}
                size="large"
                className="w-full"
                placeholder="0.00"
                style={{ borderRadius: 0 }}
              />
            </Form.Item>

            {/* Discount Price */}
            <Form.Item
              label="Discount Price"
              name="discountPrice"
              dependencies={['price']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      value < getFieldValue('price')
                    ) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        'Discount price must be lower than original price'
                      )
                    );
                  },
                }),
              ]}
            >
              <InputNumber
                min={0}
                size="large"
                className="w-full"
                placeholder="0.00"
                style={{ borderRadius: 0 }}
              />
            </Form.Item>

            {/* Stock */}
            <Form.Item
              label="Stock Quantity"
              name="stock"
              rules={[
                {
                  required: true,
                  message:
                    'Stock quantity is required',
                },
              ]}
            >
              <InputNumber
                min={0}
                size="large"
                className="w-full"
                placeholder="0"
                style={{ borderRadius: 0 }}
              />
            </Form.Item>

            {/* Product Image URL */}
            <Form.Item
              label="Product Image URL"
              name="imageUrl"
              rules={[
                {
                  required: true,
                  message:
                    'Product image URL is required',
                },
              ]}
            >
              <Input
                size="large"
                placeholder="https://example.com/product.png"
                style={{ borderRadius: 0 }}
              />
            </Form.Item>

            {/* Alt Text */}
            <Form.Item
              label="Image Alt Text"
              name="altText"
              rules={[
                {
                  required: true,
                  message: 'Image alt text is required',
                },
              ]}
            >
              <Input
                size="large"
                placeholder="e.g. Mechanical Keyboard Front View"
                style={{ borderRadius: 0 }}
              />
            </Form.Item>
          </div>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message:
                  'Product description is required',
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Write product description..."
              style={{ borderRadius: 0 }}
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button
              block
              size="large"
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              className="bg-emerald-600 hover:bg-emerald-700"
              style={{ borderRadius: 0 }}
            >
              Save Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;