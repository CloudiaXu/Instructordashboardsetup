import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Settings, Trash2, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

export default function AgentManagement({ agents, updateAgent, deleteAgent }) {
  const handleToggleStatus = (id, currentStatus) => {
    updateAgent(id, { status: currentStatus === 'active' ? 'inactive' : 'active' });
  };

  const handleDelete = (id) => {
    deleteAgent(id);
  };

  return (
    <div className="p-8 bg-background">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI 助理管理</h1>
          <p className="text-muted-foreground text-base">管理所有已建立的 AI 助理</p>
        </div>
        <Link to="/create-agent">
          <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/50">
            <Plus size={16} className="mr-2" />
            建立新助理
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="bg-card border-border hover:shadow-lg hover:shadow-purple-500/10 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{agent.name}</CardTitle>
                <Switch
                  checked={agent.status === 'active'}
                  onCheckedChange={() => handleToggleStatus(agent.id, agent.status)}
                />
              </div>
              <Badge 
                variant={agent.status === 'active' ? 'default' : 'secondary'} 
                className={`w-fit ${
                  agent.status === 'active' 
                    ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {agent.status === 'active' ? '啟用中' : '已停用'}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 p-3 rounded-xl border border-purple-500/30">
                  <p className="text-muted-foreground text-sm mb-1">回覆次數</p>
                  <p className="text-purple-400 font-bold text-xl">{agent.replyCount}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 p-3 rounded-xl border border-yellow-500/30">
                  <p className="text-muted-foreground text-sm mb-1">自動回覆率</p>
                  <p className="text-yellow-400 font-bold text-xl">{agent.autoReplyRate}%</p>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground text-sm">最後更新</p>
                <p className="text-white">{agent.lastUpdated}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 border-border text-muted-foreground hover:text-white hover:bg-muted">
                  <Settings size={16} className="mr-2" />
                  設定
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-400 hover:text-red-300 hover:bg-red-500/20 border-red-500/50">
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-card border-border">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">確定要刪除此 AI 助理嗎？</AlertDialogTitle>
                      <AlertDialogDescription className="text-muted-foreground">
                        刪除「{agent.name}」後，所有相關設定與數據將永久移除，此操作無法復原。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-border text-muted-foreground hover:text-white">取消</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(agent.id)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        確定刪除
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Create New Card */}
        <Link to="/create-agent">
          <Card className="border-2 border-dashed border-purple-500/50 hover:border-purple-500/80 transition-all cursor-pointer h-full flex items-center justify-center min-h-[300px] bg-gradient-to-br from-purple-500/10 to-purple-600/5 hover:shadow-lg hover:shadow-purple-500/20">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                <Plus size={32} className="text-white" />
              </div>
              <h3 className="text-white font-semibold">建立新的 AI 助理</h3>
              <p className="text-muted-foreground mt-2 text-sm">開始訓練您的專屬 AI</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {agents.length > 0 && (
        <Card className="mt-8 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white">效能總覽</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl border border-purple-500/30">
                <p className="text-muted-foreground mb-2 text-sm">總回覆次數</p>
                <p className="text-purple-400 text-2xl font-bold">
                  {agents.reduce((sum, agent) => sum + agent.replyCount, 0)}
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl border border-yellow-500/30">
                <p className="text-muted-foreground mb-2 text-sm">平均自動回覆率</p>
                <p className="text-yellow-400 text-2xl font-bold">
                  {Math.round(agents.reduce((sum, agent) => sum + agent.autoReplyRate, 0) / agents.length)}%
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl border border-green-500/30">
                <p className="text-muted-foreground mb-2 text-sm">啟用中助理</p>
                <p className="text-green-400 text-2xl font-bold">
                  {agents.filter(a => a.status === 'active').length} / {agents.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
