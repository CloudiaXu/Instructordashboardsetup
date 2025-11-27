import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, MessageCircle, Zap, ChevronRight, Circle, Users, UserPlus, Activity, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import SocialMediaIcon from './SocialMediaIcon';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export default function Dashboard({ agents, communityApps, updateCommunityApp }) {
  const totalReplies = agents.reduce((sum, agent) => sum + agent.replyCount, 0);
  const totalQuestions = 487;
  const avgAutoReplyRate = agents.length > 0 
    ? Math.round(agents.reduce((sum, agent) => sum + agent.autoReplyRate, 0) / agents.length)
    : 0;

  // Mock data for dashboard
  const totalUsers = 1234;
  const newUsersThisMonth = 156;
  const activeUsersThisMonth = 892;
  const todayActiveUsers = 234;
  const weekActiveUsers = 1089;
  const todayReplies = totalReplies;
  const weekReplies = 3421;

  // User growth data for line chart
  const userGrowthData = [
    { month: '1月', users: 856 },
    { month: '2月', users: 912 },
    { month: '3月', users: 978 },
    { month: '4月', users: 1045 },
    { month: '5月', users: 1123 },
    { month: '6月', users: 1234 },
  ];

  // Mini trend data for total users card
  const totalUsersTrendData = [
    { value: 980 },
    { value: 1020 },
    { value: 1050 },
    { value: 1080 },
    { value: 1100 },
    { value: 1120 },
    { value: 1150 },
    { value: 1180 },
    { value: 1200 },
    { value: 1210 },
    { value: 1220 },
    { value: 1234 },
  ];

  // Category statistics data
  const categoryBarData = [
    { category: '課程報名', count: 432 },
    { category: '技術問題', count: 298 },
    { category: '進階剪輯', count: 234 },
    { category: '軟體操作', count: 156 },
    { category: '帳號相關', count: 98 },
  ];

  // Community platform distribution data for pie chart
  const communityPlatformData = communityApps.length > 0
    ? communityApps.map((app, index) => {
        // Purple gradient colors from dark to light
        const colors = ['#6d28d9', '#8b5cf6', '#a855f7', '#c084fc', '#9333ea', '#7c3aed'];
        return {
          name: app.platform,
          value: app.replyCount || 0,
          color: colors[index % colors.length],
        };
      })
    : [
        { name: 'LINE', value: 45, color: '#8b5cf6' },
        { name: 'Facebook', value: 32, color: '#a855f7' },
        { name: 'Instagram', value: 28, color: '#c084fc' },
        { name: 'Telegram', value: 15, color: '#9333ea' },
      ];

  // Recent activity data
  const recentActivities = [
    { id: 1, user: '張小明', action: '註冊新帳號', category: '帳號相關', time: '2 分鐘前', status: 'completed' },
    { id: 2, user: '李美麗', action: '完成課程報名', category: '課程報名', time: '15 分鐘前', status: 'completed' },
    { id: 3, user: '王大華', action: '提交技術問題', category: '技術問題', time: '32 分鐘前', status: 'pending' },
    { id: 4, user: '陳小芳', action: '查看進階剪輯課程', category: '進階剪輯', time: '1 小時前', status: 'completed' },
    { id: 5, user: '林志強', action: '軟體操作諮詢', category: '軟體操作', time: '2 小時前', status: 'completed' },
    { id: 6, user: '黃雅文', action: '註冊新帳號', category: '帳號相關', time: '3 小時前', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <div className="p-6 max-w-full">
        {/* ─ 卡片區 KPI ─────────┐ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* 卡片 1: 總用戶數 (大字) */}
        <Card className="bg-card border-border lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-4 pt-4">
            <CardTitle className="text-muted-foreground text-xs font-medium">總用戶數</CardTitle>
            <Users className="text-purple-500" size={18} />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex items-start justify-between gap-4 mb-2">
              {/* Left side: Number and stats */}
              <div className="flex-1 min-w-0">
                <div className="text-4xl font-bold text-white mb-1">{totalUsers.toLocaleString()}</div>
                <div className="flex items-center gap-2 text-xs">
                  <TrendingUp size={14} className="text-green-400" />
                  <span className="text-green-400 font-medium">+12.5%</span>
                  <span className="text-muted-foreground">較上個月</span>
                </div>
              </div>
              {/* Right side: Mini trend chart */}
              <div className="w-28 h-16 flex-shrink-0 -mr-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={totalUsersTrendData} 
                    margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
                  >
                    <defs>
                      <linearGradient id="userTrendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8b5cf6" 
                      strokeWidth={2.5}
                      fill="url(#userTrendGradient)"
                      dot={false}
                      isAnimationActive={false}
                    />
                    {/* Highlight the last point */}
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="none"
                      dot={(props) => {
                        const { cx, cy, index } = props;
                        if (index === totalUsersTrendData.length - 1) {
                          return (
                            <g>
                              <circle cx={cx} cy={cy} r={5} fill="#8b5cf6" opacity={0.2} />
                              <circle cx={cx} cy={cy} r={3.5} fill="#8b5cf6" />
                            </g>
                          );
                        }
                        return null;
                      }}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="pt-3 border-t border-border/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">本月新增</span>
                <span className="text-white font-semibold">+{newUsersThisMonth}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 卡片 2: 本月新增 / 活躍人數 */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-4 pt-4">
            <CardTitle className="text-muted-foreground text-xs font-medium">本月統計</CardTitle>
            <Calendar className="text-blue-500" size={18} />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <UserPlus className="text-blue-400" size={16} />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">本月新增用戶</p>
                    <p className="text-xl font-bold text-white">{newUsersThisMonth}</p>
                  </div>
                </div>
                <ArrowUpRight className="text-blue-400" size={16} />
              </div>
              <div className="flex items-center justify-between p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Activity className="text-green-400" size={16} />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">本月活躍用戶</p>
                    <p className="text-xl font-bold text-white">{activeUsersThisMonth}</p>
                  </div>
                </div>
                <ArrowUpRight className="text-green-400" size={16} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 卡片 3: 今日/本週 關鍵指標 (KPI) */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-4 pt-4">
            <CardTitle className="text-muted-foreground text-xs font-medium">關鍵指標</CardTitle>
            <Zap className="text-yellow-500" size={18} />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground text-xs">今日活躍</span>
                  <span className="text-lg font-bold text-white">{todayActiveUsers}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground text-xs">本週活躍</span>
                  <span className="text-lg font-bold text-white">{weekActiveUsers}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-border/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground text-xs">今日回覆</span>
                  <span className="text-lg font-bold text-purple-400">{todayReplies}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">本週回覆</span>
                  <span className="text-lg font-bold text-purple-400">{weekReplies}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ┌────────── 圖表區 (Trend / Charts) ─────────┐ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* 圖表 1: 用戶成長折線圖 */}
        <Card className="bg-card border-border">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-sm mb-0.5">活躍用戶成長趨勢</CardTitle>
                <p className="text-muted-foreground text-xs">過去 6 個月的用戶增長情況</p>
              </div>
              <TrendingUp className="text-purple-400" size={20} />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="userGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="50%" stopColor="#6d28d9" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#1a1a1a" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="userGrowthLineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a855f7"/>
                    <stop offset="100%" stopColor="#8b5cf6"/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #8b5cf6',
                    borderRadius: '8px',
                    color: '#fff',
                    boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.3)'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="url(#userGrowthLineGradient)"
                  strokeWidth={3}
                  fill="url(#userGrowthGradient)"
                  dot={{ fill: '#8b5cf6', r: 5, strokeWidth: 2, stroke: '#1a1a1a' }}
                  activeDot={{ r: 7, fill: '#a855f7', strokeWidth: 2, stroke: '#fff' }}
                  name="用戶數"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 圖表 2: 分類統計 (長條圖) */}
        <Card className="bg-card border-border">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-sm mb-0.5">問題分類統計</CardTitle>
                <p className="text-muted-foreground text-xs">各類別問題分布情況</p>
              </div>
              <MessageCircle className="text-blue-400" size={20} />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryBarData} layout="vertical">
                <defs>
                  <linearGradient id="categoryBarGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.9}/>
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.7}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis dataKey="category" type="category" stroke="#9ca3af" style={{ fontSize: '12px' }} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #8b5cf6',
                    borderRadius: '8px',
                    color: '#fff',
                    boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.3)'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="url(#categoryBarGradient)" 
                  radius={[0, 8, 8, 0]}
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3))' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ┌────────── Table / 詳細資料區 ─────────┐ */}
      <Card className="mb-6 bg-card border-border">
        <CardHeader className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-sm mb-0.5">最新活動紀錄</CardTitle>
              <p className="text-muted-foreground text-xs">用戶操作與活動追蹤</p>
            </div>
            <Clock className="text-purple-400" size={20} />
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="text-muted-foreground font-semibold text-xs py-2">用戶</TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-xs py-2">操作</TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-xs py-2">分類</TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-xs py-2">時間</TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-xs py-2 text-right">狀態</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity) => (
                  <TableRow key={activity.id} className="hover:bg-muted/20">
                    <TableCell className="font-medium text-white text-sm py-2">{activity.user}</TableCell>
                    <TableCell className="text-muted-foreground text-sm py-2">{activity.action}</TableCell>
                    <TableCell className="py-2">
                      <Badge 
                        variant="outline" 
                        className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs"
                      >
                        {activity.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground flex items-center gap-2 text-sm py-2">
                      <Clock size={12} />
                      {activity.time}
                    </TableCell>
                    <TableCell className="text-right py-2">
                      <Badge 
                        variant={activity.status === 'completed' ? 'default' : 'secondary'}
                        className={
                          activity.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/50 text-xs' 
                            : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50 text-xs'
                        }
                      >
                        {activity.status === 'completed' ? '已完成' : '處理中'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Link to="/create-agent">
          <Card className="hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer border-2 border-dashed border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Plus className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-purple-400 font-semibold text-sm">建立新的 AI 助理</h3>
                <p className="text-muted-foreground text-xs">上傳知識庫，訓練您專屬的 AI</p>
              </div>
              <ChevronRight className="ml-auto text-purple-400" size={18} />
            </CardContent>
          </Card>
        </Link>

        <Link to="/connect-community">
          <Card className="hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer border-2 border-dashed border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Plus className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-purple-400 font-semibold text-sm">連結新的社群 App</h3>
                <p className="text-muted-foreground text-xs">將 AI 部署到 LINE、FB 等平台</p>
              </div>
              <ChevronRight className="ml-auto text-purple-400" size={18} />
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI Agent List */}
        <Card className="bg-card border-border">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-sm">AI 助理列表</CardTitle>
              <Link to="/agents">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white h-7 text-xs">
                  查看全部 <ChevronRight size={14} />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-2">
              {agents.map((agent) => (
                <Link key={agent.id} to="/agents">
                  <div className="p-3 border border-border rounded-lg hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all cursor-pointer bg-card/50">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-medium text-sm">{agent.name}</h4>
                      <Badge 
                        variant={agent.status === 'active' ? 'default' : 'secondary'}
                        className={agent.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/50 text-xs' : 'bg-muted text-muted-foreground text-xs'}
                      >
                        {agent.status === 'active' ? '啟用中' : '已停用'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground text-xs">
                      <span className="flex items-center gap-1">
                        <Circle size={6} className={agent.status === 'active' ? 'fill-green-500 text-green-500' : 'fill-gray-500 text-gray-500'} />
                        <span className="text-white">回覆 <span className="text-purple-400 font-semibold">{agent.replyCount}</span> 次</span>
                      </span>
                      <span className="text-border">|</span>
                      <span>更新於 {agent.lastUpdated}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Platform Distribution - Pie Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-sm">社群渠道分布</CardTitle>
                <p className="text-muted-foreground text-xs">各平台回覆量占比</p>
              </div>
              <Link to="/community-apps">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white h-7 text-xs">
                  查看全部 <ChevronRight size={14} />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={communityPlatformData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    fill="#8b5cf6"
                    dataKey="value"
                  >
                    {communityPlatformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #8b5cf6',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.3)'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={28}
                    formatter={(value, entry) => (
                      <span style={{ color: entry.color, fontSize: '11px' }}>
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Platform details list */}
              <div className="w-full mt-4 space-y-1.5">
                {communityApps.map((app, index) => (
                  <div key={app.id} className="flex items-center justify-between p-2 border border-border rounded-lg bg-card/50">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: communityPlatformData[index]?.color || '#8b5cf6' }}
                      />
                      <SocialMediaIcon platform={app.platform} size={16} />
                      <span className="text-white font-medium text-sm">{app.platform}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground text-xs">
                        回覆 <span className="text-purple-400 font-semibold">{app.replyCount}</span>
                      </span>
                      <Switch
                        checked={app.status === 'active'}
                        onCheckedChange={(checked) => {
                          updateCommunityApp(app.id, { status: checked ? 'active' : 'inactive' });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Report Quick Link */}
      <Card className="mt-4 bg-gradient-to-r from-purple-500/20 to-yellow-500/20 border-purple-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-sm mb-0.5">查看完整數據分析</h3>
              <p className="text-muted-foreground text-xs">了解學員問題趨勢，發現開課機會</p>
            </div>
            <Link to="/reports">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/50 h-8 text-xs">
                前往數據報告 <ChevronRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
