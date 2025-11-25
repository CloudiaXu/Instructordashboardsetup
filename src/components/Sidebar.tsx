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
    <div className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent leading-none">
            ELEMI
          </h1>
          <div className="flex flex-col items-start justify-center h-[1.5rem]">
            <span className="text-xs font-normal text-sidebar-foreground leading-none">Assistant</span>
            <span className="text-xs font-normal text-sidebar-foreground leading-none">Manager</span>
          </div>
        </div>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-600/30 to-purple-500/20 text-white border border-purple-500/50 shadow-lg shadow-purple-500/20' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-white'
              }`}
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
