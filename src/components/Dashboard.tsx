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
        <h1 className="text-3xl font-bold text-white mb-2">講師後台</h1>
        <p className="text-muted-foreground text-base">歡迎回來！這是您所有 AI 助理與社群渠道的總覽</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground">今日總回覆數</CardTitle>
            <MessageCircle className="text-purple-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">{totalReplies}</div>
            <p className="text-muted-foreground mt-1">
              <TrendingUp size={14} className="inline mr-1 text-purple-400" />
              <span className="text-purple-400">比昨日增加 12%</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground">學員問題總數</CardTitle>
            <MessageCircle className="text-purple-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">{totalQuestions}</div>
            <p className="text-muted-foreground mt-1">本週累積</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground">AI 自動回覆率</CardTitle>
            <Zap className="text-yellow-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{avgAutoReplyRate}%</div>
            <p className="text-muted-foreground mt-1">平均所有助理</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link to="/create-agent">
          <Card className="hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer border-2 border-dashed border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Plus className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-purple-400 font-semibold text-lg">建立新的 AI 助理</h3>
                <p className="text-muted-foreground text-sm">上傳知識庫，訓練您專屬的 AI</p>
              </div>
              <ChevronRight className="ml-auto text-purple-400" />
            </CardContent>
          </Card>
        </Link>

        <Link to="/connect-community">
          <Card className="hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer border-2 border-dashed border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Plus className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-purple-400 font-semibold text-lg">連結新的社群 App</h3>
                <p className="text-muted-foreground text-sm">將 AI 部署到 LINE、FB 等平台</p>
              </div>
              <ChevronRight className="ml-auto text-purple-400" />
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Agent List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">AI 助理列表</CardTitle>
              <Link to="/agents">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                  查看全部 <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {agents.map((agent) => (
                <Link key={agent.id} to="/agents">
                  <div className="p-4 border border-border rounded-xl hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all cursor-pointer bg-card/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{agent.name}</h4>
                      <Badge 
                        variant={agent.status === 'active' ? 'default' : 'secondary'}
                        className={agent.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-muted text-muted-foreground'}
                      >
                        {agent.status === 'active' ? '啟用中' : '已停用'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <Circle size={8} className={agent.status === 'active' ? 'fill-green-500 text-green-500' : 'fill-gray-500 text-gray-500'} />
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

        {/* Community Apps List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">社群渠道列表</CardTitle>
              <Link to="/community-apps">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                  查看全部 <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {communityApps.map((app) => (
                <div key={app.id} className="p-4 border border-border rounded-xl bg-card/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <SocialMediaIcon platform={app.platform} size={24} />
                      <h4 className="text-white font-medium">{app.platform}</h4>
                    </div>
                    <Switch
                      checked={app.status === 'active'}
                      onCheckedChange={(checked) => {
                        updateCommunityApp(app.id, { status: checked ? 'active' : 'inactive' });
                      }}
                    />
                  </div>
                  <div className="text-muted-foreground ml-10 text-sm">
                    <p>AI 助理：<span className="text-white">{app.agentName}</span></p>
                    <p>回覆次數：<span className="text-purple-400 font-semibold">{app.replyCount}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Report Quick Link */}
      <Card className="mt-6 bg-gradient-to-r from-purple-500/20 to-yellow-500/20 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">查看完整數據分析</h3>
              <p className="text-muted-foreground text-sm">了解學員問題趨勢，發現開課機會</p>
            </div>
            <Link to="/reports">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/50">
                前往數據報告 <ChevronRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
