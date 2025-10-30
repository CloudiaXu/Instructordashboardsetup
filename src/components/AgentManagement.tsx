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
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1>AI 助理管理</h1>
          <p className="text-gray-600">管理所有已建立的 AI 助理</p>
        </div>
        <Link to="/create-agent">
          <Button>
            <Plus size={16} className="mr-2" />
            建立新助理
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{agent.name}</CardTitle>
                <Switch
                  checked={agent.status === 'active'}
                  onCheckedChange={() => handleToggleStatus(agent.id, agent.status)}
                />
              </div>
              <Badge variant={agent.status === 'active' ? 'default' : 'secondary'} className="w-fit">
                {agent.status === 'active' ? '啟用中' : '已停用'}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 mb-1">回覆次數</p>
                  <p className="text-indigo-600">{agent.replyCount}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 mb-1">自動回覆率</p>
                  <p className="text-green-600">{agent.autoReplyRate}%</p>
                </div>
              </div>

              <div>
                <p className="text-gray-600">最後更新</p>
                <p>{agent.lastUpdated}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1">
                  <Settings size={16} className="mr-2" />
                  設定
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>確定要刪除此 AI 助理嗎？</AlertDialogTitle>
                      <AlertDialogDescription>
                        刪除「{agent.name}」後，所有相關設定與數據將永久移除，此操作無法復原。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(agent.id)}
                        className="bg-red-600 hover:bg-red-700"
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
          <Card className="border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors cursor-pointer h-full flex items-center justify-center min-h-[300px]">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Plus size={32} className="text-gray-400" />
              </div>
              <h3 className="text-gray-600">建立新的 AI 助理</h3>
              <p className="text-gray-500 mt-2">開始訓練您的專屬 AI</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {agents.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>效能總覽</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-600 mb-2">總回覆次數</p>
                <p className="text-indigo-600">
                  {agents.reduce((sum, agent) => sum + agent.replyCount, 0)}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-gray-600 mb-2">平均自動回覆率</p>
                <p className="text-green-600">
                  {Math.round(agents.reduce((sum, agent) => sum + agent.autoReplyRate, 0) / agents.length)}%
                </p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-gray-600 mb-2">啟用中助理</p>
                <p className="text-yellow-600">
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
