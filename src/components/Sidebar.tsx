import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bot, MessageSquare, BarChart3, Settings, Brain, Inbox, Clock } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

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

  // Mock messages data
  const messages = [
    { id: 1, name: '張小明', text: '請問課程可以退費嗎？需要什麼條件？', time: '10分鐘前', status: 'online', unread: true },
    { id: 2, name: '李美華', text: '我想了解進階剪輯課程的詳細內容', time: '1小時前', status: 'online', unread: true },
    { id: 3, name: '王建國', text: '影片上傳一直失敗，該怎麼辦？', time: '2小時前', status: 'away', unread: false },
    { id: 4, name: '陳雅婷', text: '謝謝您的回覆，我已經成功報名了！', time: '3小時前', status: 'online', unread: true },
  ];

  const unreadCount = 4;

  // Points remaining chart data
  const totalPoints = 10000;
  const pointsRemainingData = [
    { day: '週一', remaining: 8500, used: 1500 },
    { day: '週二', remaining: 8200, used: 1800 },
    { day: '週三', remaining: 7850, used: 2150 },
    { day: '週四', remaining: 7500, used: 2500 },
    { day: '週五', remaining: 7200, used: 2800 },
    { day: '週六', remaining: 6900, used: 3100 },
    { day: '週日', remaining: 6500, used: 3500 },
  ];

  const currentPointsRemaining = 6500;
  const pointsUsed = totalPoints - currentPointsRemaining;

  return (
    <div className="h-screen w-80 bg-background border-r border-border/50 flex flex-shrink-0 overflow-hidden" style={{ overscrollBehavior: 'none' }}>
      {/* Left Navigation Bar */}
      <div className="w-20 flex flex-col items-center justify-between pt-6 pb-6 border-r border-border/50 overflow-hidden h-full" style={{ overscrollBehavior: 'none', touchAction: 'none' }}>
        {/* Top section */}
        <div className="flex flex-col items-center w-full">
          {/* Logo area */}
          <div className="mb-4">
            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center shadow-sm overflow-hidden">
              <img 
                src="/Instructordashboardsetup/favicon.svg" 
                alt="ELEMI" 
                className="w-full h-full object-contain p-1" 
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </div>

          {/* Navigation icons */}
          <nav className="flex flex-col items-center gap-2 w-full px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 relative group ${
                    isActive
                      ? 'bg-blue-500/15 text-blue-500 shadow-sm' 
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                  title={item.label}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom section - Settings */}
        <div className="flex-shrink-0">
          <Link
            to="/settings"
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
              location.pathname === '/settings'
                ? 'bg-blue-500/15 text-blue-500 shadow-sm' 
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
            title="設定"
          >
            <Settings size={20} strokeWidth={location.pathname === '/settings' ? 2.5 : 2} />
          </Link>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden" style={{ overscrollBehavior: 'none' }}>
        {/* Welcome Section */}
        <div className="p-6 pb-4 flex-shrink-0">
          <h2 className="text-foreground font-bold text-3xl mb-1">ELEMI</h2>
          <p className="text-muted-foreground text-lg">像你一樣回話的 AI 夥伴</p>
        </div>

        {/* Messages Section */}
        <div className="px-6 pb-4 flex-1 min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <h3 className="text-foreground font-bold text-base">待審核訊息</h3>
            {unreadCount > 0 && (
              <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="h-full overflow-y-auto overflow-x-hidden" style={{ overscrollBehavior: 'contain' }}>
            <div className="space-y-2">
              {messages.map((message) => (
                <button
                  key={message.id}
                  className="w-full p-4 text-left bg-card border border-border/50 rounded-lg hover:bg-card/80 hover:border-purple-500/30 transition-all relative"
                >
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/30">
                      <span className="text-white font-medium text-xs">{message.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <h4 className="font-medium text-sm flex-1 text-white">{message.name}</h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{message.time}</span>
                      </div>
                      <p className="text-sm truncate text-muted-foreground">{message.text}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Points Remaining Section */}
        <div className="px-6 pb-6 flex-shrink-0">
          <div className="p-4 rounded-xl bg-card border border-border/50 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-foreground font-bold text-sm">點數使用剩餘數量</h3>
              <Clock className="text-muted-foreground" size={14} />
            </div>
            <div className="mb-3">
              <div className="flex mb-1" style={{ alignItems: 'flex-end', gap: '0.5rem' }}>
                <span className="text-2xl font-bold text-white" style={{ lineHeight: '1', display: 'block' }}>{currentPointsRemaining.toLocaleString()}</span>
                <span className="text-muted-foreground text-xs" style={{ lineHeight: '1', display: 'block', marginBottom: '0' }}>/ {totalPoints.toLocaleString()}</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${(currentPointsRemaining / totalPoints) * 100}%` }}
                />
              </div>
              <p className="text-muted-foreground text-[10px] mt-1">已使用 {pointsUsed.toLocaleString()} 點數</p>
            </div>
            <div className="h-32 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pointsRemainingData} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                  <defs>
                    <linearGradient id="pointsUsedBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity={0.9}/>
                      <stop offset="50%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#6b7280"
                    style={{ fontSize: '10px' }}
                    tick={{ fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '10px' }}
                    tick={{ fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #f97316',
                      borderRadius: '6px',
                      padding: '6px 8px',
                      fontSize: '11px'
                    }}
                    formatter={(value) => [`${value.toLocaleString()} 點`, '今日使用']}
                    labelStyle={{ color: '#fff', marginBottom: '4px' }}
                  />
                  <Bar
                    dataKey="used"
                    fill="url(#pointsUsedBarGradient)"
                    radius={[4, 4, 0, 0]}
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(249, 115, 22, 0.3))' }}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
