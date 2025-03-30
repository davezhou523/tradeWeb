import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Form, Input, Space, List, Tag, Typography } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const { Title } = Typography;

const Container = styled.div`
  padding: 24px;
  background-color: #f5f5f5;
  min-height: calc(100vh - 48px);
`;

const TemplateCard = styled(Card)`
  margin-bottom: 16px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PreviewContainer = styled.div`
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  min-height: 300px;
  background: #fff;
`;

const EmailTemplates: React.FC = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [form] = Form.useForm();

  const mockTemplates = [
    {
      id: '1',
      name: '新产品介绍模板',
      type: 'system',
      description: '用于介绍新产品的邮件模板',
      lastModified: '2024-03-28',
      variables: ['客户名称', '产品名称', '产品特点'],
    },
    {
      id: '2',
      name: '促销活动模板',
      type: 'custom',
      description: '用于推广促销活动的邮件模板',
      lastModified: '2024-03-27',
      variables: ['客户名称', '折扣力度', '活动时间'],
    },
    // 更多模拟数据...
  ];

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template);
    form.setFieldsValue(template);
    setEditModalVisible(true);
  };

  const handlePreviewTemplate = (template: any) => {
    setSelectedTemplate(template);
    setPreviewModalVisible(true);
  };

  const handleSaveTemplate = (values: any) => {
    console.log('Save template:', values);
    setEditModalVisible(false);
    form.resetFields();
  };

  const handleSendTestEmail = () => {
    console.log('Send test email for template:', selectedTemplate?.id);
  };

  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card
            title="模板库"
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={() => handleEditTemplate({})}>
                创建模板
              </Button>
            }
          >
            <List
              dataSource={mockTemplates}
              renderItem={(template) => (
                <TemplateCard>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Title level={5}>{template.name}</Title>
                      <p>{template.description}</p>
                      <Space>
                        <Tag color={template.type === 'system' ? 'blue' : 'green'}>
                          {template.type === 'system' ? '系统模板' : '自定义模板'}
                        </Tag>
                        <span>最后修改：{template.lastModified}</span>
                      </Space>
                    </Col>
                    <Col>
                      <Space>
                        <Button
                          icon={<EditOutlined />}
                          onClick={() => handleEditTemplate(template)}
                        >
                          编辑
                        </Button>
                        <Button
                          icon={<EyeOutlined />}
                          onClick={() => handlePreviewTemplate(template)}
                        >
                          预览
                        </Button>
                        <Button icon={<DeleteOutlined />} danger>
                          删除
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </TemplateCard>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="变量说明">
            <p>在模板中可以使用以下变量：</p>
            <ul>
              <li>{'{{客户名称}}'} - 收件人的姓名</li>
              <li>{'{{公司名称}}'} - 收件人的公司名</li>
              <li>{'{{产品名称}}'} - 产品的名称</li>
              <li>{'{{联系人}}'} - 发件人姓名</li>
              <li>{'{{联系电话}}'} - 发件人联系电话</li>
            </ul>
          </Card>
        </Col>
      </Row>

      <Modal
        title={selectedTemplate?.id ? '编辑模板' : '创建模板'}
        open={editModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setEditModalVisible(false)}
        width={800}
      >
        <Form form={form} onFinish={handleSaveTemplate} layout="vertical">
          <Form.Item
            name="name"
            label="模板名称"
            rules={[{ required: true, message: '请输入模板名称' }]}
          >
            <Input placeholder="请输入模板名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="模板描述"
            rules={[{ required: true, message: '请输入模板描述' }]}
          >
            <Input.TextArea placeholder="请输入模板描述" rows={2} />
          </Form.Item>
          <Form.Item
            name="content"
            label="模板内容"
            rules={[{ required: true, message: '请输入模板内容' }]}
          >
            <Input.TextArea
              placeholder="在此编辑邮件内容，可使用变量如 {{客户名称}}"
              rows={10}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="模板预览"
        open={previewModalVisible}
        onCancel={() => setPreviewModalVisible(false)}
        footer={[
          <Button key="test" type="primary" icon={<SendOutlined />} onClick={handleSendTestEmail}>
            发送测试邮件
          </Button>,
          <Button key="close" onClick={() => setPreviewModalVisible(false)}>
            关闭
          </Button>,
        ]}
        width={800}
      >
        <PreviewContainer>
          {selectedTemplate && (
            <div>
              <h2>{selectedTemplate.name}</h2>
              <p>{selectedTemplate.description}</p>
              {/* 这里显示模板的实际预览内容 */}
            </div>
          )}
        </PreviewContainer>
      </Modal>
    </Container>
  );
};

export default EmailTemplates;