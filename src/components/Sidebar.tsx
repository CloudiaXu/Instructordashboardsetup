import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bot, MessageSquare, BarChart3, Settings, Brain, Inbox } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: '主儀表板' },
    { path: '/knowledge-base', icon: Brain, label: '我的知識庫' },
    { path: '/agents', icon: Bot, label: 'AI 助理管理' },
    { path: '/community-apps', icon: MessageSquare, label: '社群應用' },
    { path: '/community-inbox', icon: Inbox, label: '社群管理' },
    { path: '/reports', icon: BarChart3, label: '數據報告' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <h1 style={{ color: '#02567F' }}>AI 講師助理平台</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors text-gray-700 hover:bg-gray-50"
              style={isActive ? { 
                backgroundColor: '#D4EAF0',
                color: '#02567F'
              } : undefined}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
