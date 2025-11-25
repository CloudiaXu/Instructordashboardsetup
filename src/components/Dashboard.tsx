import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, MessageCircle, Zap, ChevronRight, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import SocialMediaIcon from './SocialMediaIcon';

export default function Dashboard({ agents, communityApps, updateCommunityApp }) {
  const totalReplies = agents.reduce((sum, agent) => sum + agent.replyCount, 0);
  const totalQuestions = 487;
  const avgAutoReplyRate = agents.length > 0 
    ? Math.round(agents.reduce((sum, agent) => sum + agent.autoReplyRate, 0) / agents.length)
    : 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>講師後台</h1>
        <p className="text-gray-600">歡迎回來！這是您所有 AI 助理與社群渠道的總覽</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gray-600">今日總回覆數</CardTitle>
            <MessageCircle className="text-indigo-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-indigo-600">{totalReplies}</div>
            <p className="text-gray-500 mt-1">
              <TrendingUp size={14} className="inline mr-1" />
              比昨日增加 12%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gray-600">學員問題總數</CardTitle>
            <MessageCircle className="text-green-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-green-600">{totalQuestions}</div>
            <p className="text-gray-500 mt-1">本週累積</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gray-600">AI 自動回覆率</CardTitle>
            <Zap className="text-yellow-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-yellow-600">{avgAutoReplyRate}%</div>
            <p className="text-gray-500 mt-1">平均所有助理</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link to="/create-agent">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-indigo-200 bg-indigo-50/50">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                <Plus className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-indigo-600">建立新的 AI 助理</h3>
                <p className="text-gray-600">上傳知識庫，訓練您專屬的 AI</p>
              </div>
              <ChevronRight className="ml-auto text-indigo-600" />
            </CardContent>
          </Card>
        </Link>

        <Link to="/connect-community">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-green-200 bg-green-50/50">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                <Plus className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-green-600">連結新的社群 App</h3>
                <p className="text-gray-600">將 AI 部署到 LINE、FB 等平台</p>
              </div>
              <ChevronRight className="ml-auto text-green-600" />
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Agent List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>AI 助理列表</CardTitle>
              <Link to="/agents">
                <Button variant="ghost" size="sm">
                  查看全部 <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {agents.map((agent) => (
                <Link key={agent.id} to="/agents">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4>{agent.name}</h4>
                      <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                        {agent.status === 'active' ? '啟用中' : '已停用'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <Circle size={8} className={agent.status === 'active' ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'} />
                        回覆 {agent.replyCount} 次
                      </span>
                      <span>|</span>
                      <span>更新於 {agent.lastUpdated}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Apps List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>社群渠道列表</CardTitle>
              <Link to="/community-apps">
                <Button variant="ghost" size="sm">
                  查看全部 <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {communityApps.map((app) => (
                <div key={app.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <SocialMediaIcon platform={app.platform} size={24} />
                      <h4>{app.platform}</h4>
                    </div>
                    <Switch
                      checked={app.status === 'active'}
                      onCheckedChange={(checked) => {
                        updateCommunityApp(app.id, { status: checked ? 'active' : 'inactive' });
                      }}
                    />
                  </div>
                  <div className="text-gray-600 ml-10">
                    <p>AI 助理：{app.agentName}</p>
                    <p>回覆次數：{app.replyCount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Report Quick Link */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3>查看完整數據分析</h3>
              <p className="text-gray-600">了解學員問題趨勢，發現開課機會</p>
            </div>
            <Link to="/reports">
              <Button>
                前往數據報告 <ChevronRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
