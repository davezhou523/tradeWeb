import React, { useState } from 'react';
import { Input, Select, Button, Table, Card, Space, Row, Col } from 'antd';
import { SearchOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const { Search } = Input;

const Container = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
  .ant-table-wrapper {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  .ant-table {
    border-radius: 8px;
    overflow: hidden;
  }
  .ant-table-row {
    &:hover {
      background-color: #e6f7ff !important;
    }
    &.ant-table-row-selected {
      background-color: #e6f7ff;
      td {
        background-color: transparent !important;
      }
    }
  }
  .ant-table-thead > tr > th {
    background-color: #fafafa;
    font-weight: 600;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  .ant-table-tbody > tr > td {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  .ant-table-tbody > tr:last-child > td {
    border-bottom: none;
  }
  .ant-card {
    border-radius: 8px;
  }
  .ant-btn {
    border-radius: 4px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  .ant-select {
    width: 100%;
  }
  .ant-pagination {
    margin: 16px 0;
  }
`;


const FilterCard = styled(Card)`
  margin-bottom: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  .ant-row {
    align-items: center;
  }
  .ant-input-search {
    width: 100%;
  }
  .ant-input-group-addon {
    background-color: #1890ff;
    border-color: #1890ff;
  }
  .ant-input-search-button {
    border-radius: 0 4px 4px 0;
    height: 40px;
  }
`;

const CustomerAcquisition: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

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
      title: '职位',
      dataIndex: 'position',
      key: 'position',
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
      title: '社交媒体',
      dataIndex: 'social',
      key: 'social',
      render: (social: string[]) => social?.join(', '),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="primary" icon={<PlusOutlined />} size="small" style={{ borderRadius: '4px' }}>
          添加到客户库
        </Button>
      ),
    },
  ];

  const mockData = [
    {
      key: '1',
      companyName: '示例公司1',
      contact: 'John Doe',
      position: 'CEO',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      social: ['LinkedIn', 'Twitter'],
    },
    // 更多模拟数据...
  ];

  return (
    <Container>
      <FilterCard>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Search
              placeholder="输入关键词搜索"
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={(value) => console.log(value)}
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="选择平台"
              style={{ width: '100%' }}
              size="large"
              options={[
                { value: 'google', label: 'Google' },
                { value: 'linkedin', label: 'LinkedIn' },
                { value: 'facebook', label: 'Facebook' },
              ]}
            />
          </Col>
        </Row>
      </FilterCard>

      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Card style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', padding: '24px' }}>
            <Space style={{ marginBottom: 24, display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                disabled={selectedRows.length === 0}
              >
                批量导出
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                disabled={selectedRows.length === 0}
              >
                批量添加到客户库
              </Button>
            </Space>
            <Table
              columns={columns}
              dataSource={mockData}
              rowSelection={{
                type: 'checkbox',
                selectedRowKeys: selectedRows.map(row => row.key),
                onChange: (_, selectedRows) => setSelectedRows(selectedRows),
              }}
              style={{ marginTop: 8 }}
              pagination={{
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`,
                pageSize: 10,
                style: { marginTop: '16px', textAlign: 'right' }
              }}
              bordered={false}
              size="large"
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="筛选器" style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', padding: '16px' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%', padding: '16px 0' }}>
              <Select
                placeholder="选择行业"
                style={{ width: '100%' }}
                options={[
                  { value: 'tech', label: '科技' },
                  { value: 'finance', label: '金融' },
                  { value: 'retail', label: '零售' },
                ]}
              />
              <Select
                placeholder="选择地区"
                style={{ width: '100%' }}
                options={[
                  { value: 'na', label: '北美' },
                  { value: 'eu', label: '欧洲' },
                  { value: 'asia', label: '亚洲' },
                ]}
              />
              <Select
                placeholder="公司规模"
                style={{ width: '100%' }}
                options={[
                  { value: 'small', label: '小型企业' },
                  { value: 'medium', label: '中型企业' },
                  { value: 'large', label: '大型企业' },
                ]}
              />
            </Space>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerAcquisition;