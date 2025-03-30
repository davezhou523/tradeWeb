import React, { useState } from 'react';
import { Table, Card, Tag, Button, Space, Drawer, Timeline, Upload, Tabs } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, TagOutlined, FileOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 24px;
`;

const CustomerCard = styled(Card)`
  margin-bottom: 24px;
`;

const CustomerManagement: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const columns = [
    {
      title: '公司名称',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusColors = {
          potential: 'blue',
          contacted: 'orange',
          replied: 'green',
          deal: 'purple',
        };
        return <Tag color={statusColors[status as keyof typeof statusColors]}>{status}</Tag>;
      },
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => showCustomerDetail(record)}>
          查看详情
        </Button>
      ),
    },
  ];

  const mockData = [
    {
      key: '1',
      companyName: '示例公司1',
      contact: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      source: 'LinkedIn',
      status: 'potential',
      tags: ['科技', '北美'],
    },
    // 更多模拟数据...
  ];

  const showCustomerDetail = (customer: any) => {
    setSelectedCustomer(customer);
    setDrawerVisible(true);
  };

  const customerDetailTabs = [
    {
      key: 'basic',
      label: '基本信息',
      children: (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card>
            <p><UserOutlined /> 联系人：{selectedCustomer?.contact}</p>
            <p><PhoneOutlined /> 电话：{selectedCustomer?.phone}</p>
            <p><MailOutlined /> 邮箱：{selectedCustomer?.email}</p>
            <p><TagOutlined /> 标签：
              {selectedCustomer?.tags.map((tag: string) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </p>
          </Card>
        </Space>
      ),
    },
    {
      key: 'timeline',
      label: '联系历史',
      children: (
        <Timeline
          items={[
            {
              children: '首次接触',
              color: 'green',
            },
            {
              children: '发送产品介绍',
              color: 'blue',
            },
            {
              children: '客户回复感兴趣',
              color: 'blue',
            },
            // 更多时间线项目...
          ]}
        />
      ),
    },
    {
      key: 'files',
      label: '相关文档',
      children: (
        <>
          <Upload
            action="/api/upload"
            listType="text"
            defaultFileList={[
              {
                uid: '1',
                name: '产品介绍.pdf',
                status: 'done',
                url: 'http://example.com/files/product.pdf',
              },
            ]}
          >
            <Button icon={<FileOutlined />}>上传文档</Button>
          </Upload>
        </>
      ),
    },
  ];

  return (
    <Container>
      <CustomerCard>
        <Table columns={columns} dataSource={mockData} />
      </CustomerCard>

      <Drawer
        title={`客户详情 - ${selectedCustomer?.companyName}`}
        placement="right"
        width={600}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Tabs items={customerDetailTabs} />
      </Drawer>
    </Container>
  );
};

export default CustomerManagement;