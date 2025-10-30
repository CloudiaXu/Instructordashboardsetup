import React, { useState } from 'react';
import { Download, TrendingUp, Users, Clock, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Reports({ agents, communityApps }) {
  const [timeRange, setTimeRange] = useState('7');

  const questionCategoryData = [
    { name: '課程報名', value: 145, color: '#6366f1' },
    { name: '技術問題', value: 98, color: '#8b5cf6' },
    { name: '進階剪輯', value: 87, color: '#ec4899' },
    { name: '軟體操作', value: 76, color: '#f59e0b' },
    { name: '帳號相關', value: 52, color: '#10b981' },
    { name: '其他', value: 29, color: '#6b7280' },
  ];

  const platformActivityData = communityApps.map(app => ({
    name: app.platform,
    replies: app.replyCount,
    active: app.status === 'active' ? app.replyCount : 0,
  }));

  const trendData = [
    { date: '10/24', questions: 45, replies: 38 },
    { date: '10/25', questions: 52, replies: 47 },
    { date: '10/26', questions: 48, replies: 43 },
    { date: '10/27', questions: 61, replies: 54 },
    { date: '10/28', questions: 58, replies: 52 },
    { date: '10/29', questions: 67, replies: 61 },
    { date: '10/30', questions: 72, replies: 65 },
  ];

  const topQuestions = [
    { question: '如何重設密碼？', count: 23, category: '帳號相關' },
    { question: '課程可以退費嗎？', count: 19, category: '課程報名' },
    { question: '影片剪輯軟體推薦', count: 17, category: '進階剪輯' },
    { question: '上傳影片失敗怎麼辦', count: 15, category: '技術問題' },
    { question: '如何使用綠幕功能', count: 14, category: '軟體操作' },
  ];

  const insights = [
    {
      title: '開課建議：進階剪輯技巧課程',
      description: '最多學員在詢問「進階剪輯技巧」相關問題（87次），建議您可以開設相關主題的 Mini-Course，預估有高度需求。',
      impact: 'high',
    },
    {
      title: '優化建議：帳號管理 FAQ',
      description: '「如何重設密碼」被問了 23 次，建議在知識庫中加強帳號管理相關的 FAQ 文件，可降低重複問題。',
      impact: 'medium',
    },
    {
      title: '平台活躍度：LINE 表現最佳',
      description: 'LINE 平台的互動率最高，建議將主要資源投入在 LINE 官方帳號的經營與內容優化。',
      impact: 'medium',
    },
  ];

  const totalReplies = agents.reduce((sum, agent) => sum + agent.replyCount, 0);
  const avgResponseTime = '2.3';

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1>數據報告</h1>
          <p className="text-gray-600">將後台數據轉化為有價值的商業洞察</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">過去 7 天</SelectItem>
              <SelectItem value="30">過去 30 天</SelectItem>
              <SelectItem value="90">過去 90 天</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            匯出報告
          </Button>
        </div>
      </div>

      {/* Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gray-600">回覆學員總數</CardTitle>
            <Users className="text-indigo-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-indigo-600">{totalReplies}</div>
            <p className="text-gray-500 mt-1">
              <TrendingUp size={14} className="inline mr-1" />
              比上週增加 18%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gray-600">平均回覆時間</CardTitle>
            <Clock className="text-green-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-green-600">{avgResponseTime} 分鐘</div>
            <p className="text-gray-500 mt-1">比上週快 25%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gray-600">問題總數</CardTitle>
            <TrendingUp className="text-yellow-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-yellow-600">487</div>
            <p className="text-gray-500 mt-1">本週累積</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="text-indigo-600" size={24} />
            <CardTitle className="text-indigo-900">AI 智能洞察與建議</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-indigo-100">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    insight.impact === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <h4 className="text-indigo-900">{insight.title}</h4>
                    <p className="text-gray-700 mt-1">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Question Categories */}
        <Card>
          <CardHeader>
            <CardTitle>問題分類統計</CardTitle>
            <p className="text-gray-600">點擊圖表區塊查看該分類的熱門問題</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={questionCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name} (${entry.value})`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {questionCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {questionCategoryData.slice(0, 3).map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span>{cat.name}</span>
                  </div>
                  <span>{cat.value} 次</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Activity */}
        <Card>
          <CardHeader>
            <CardTitle>平台活躍度比較</CardTitle>
            <p className="text-gray-600">了解學員在哪個平台最活躍</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="replies" fill="#6366f1" name="回覆次數" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>問題與回覆趨勢</CardTitle>
          <p className="text-gray-600">追蹤每日問題數量與回覆率變化</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="questions" stroke="#f59e0b" strokeWidth={2} name="問題數" />
              <Line type="monotone" dataKey="replies" stroke="#10b981" strokeWidth={2} name="回覆數" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Questions */}
      <Card>
        <CardHeader>
          <CardTitle>熱門問題排行</CardTitle>
          <p className="text-gray-600">最常被詢問的問題</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topQuestions.map((q, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p>{q.question}</p>
                  <p className="text-gray-500">{q.category}</p>
                </div>
                <div className="text-indigo-600">
                  {q.count} 次
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
