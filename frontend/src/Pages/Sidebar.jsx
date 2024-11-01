import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileTextOutlined,
  FileSearchOutlined,
  LockOutlined,
  ApiOutlined,
  DatabaseOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom';

const items = [
  { key: '1', icon: <PieChartOutlined />, label: <Link to="/">Dashboard Overview</Link> },
  { key: '2', icon: <UserOutlined />, label: <Link to="/user-management">User Management</Link> },
  { key: '3', icon: <ContainerOutlined />, label: <Link to="/product-management">Product Management</Link> },
  {
    key: 'complaints', 
    icon: <ExclamationCircleOutlined />, 
    label: <Link to="/complaints">Complaints</Link> 
  },
  {
    key: 'sub1',
    label: 'Reports',
    icon: <BarChartOutlined />,
    children: [
      { key: '5', icon: <FileTextOutlined />, label: 'User Activity Report' },
      { key: '6', icon: <FileTextOutlined />, label: 'Sales Report' },
      { key: '7', icon: <FileSearchOutlined />, label: 'Traffic Report' },
      { key: '8', icon: <FileSearchOutlined />, label: 'Error Logs' },
    ],
  },
  {
    key: 'sub2',
    label: 'Settings',
    icon: <SettingOutlined />,
    children: [
      { key: '9', icon: <SettingOutlined />, label: 'General Settings' },
      { key: '10', icon: <LockOutlined />, label: 'Security Settings' },
      {
        key: 'sub3',
        label: 'Advanced Settings',
        icon: <SettingOutlined />,
        children: [
          { key: '11', icon: <ApiOutlined />, label: 'API Management' },
          { key: '12', icon: <DatabaseOutlined />, label: 'Backup & Restore' },
        ],
      },
    ],
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 256, height: '100vh', backgroundColor: '#001529' }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default Sidebar;
