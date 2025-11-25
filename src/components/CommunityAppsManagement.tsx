import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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
import SocialMediaIcon from './SocialMediaIcon';

export default function CommunityAppsManagement({ 
  communityApps, 
  agents, 
  updateCommunityApp, 
  deleteCommunityApp 
}) {

  const handleToggleStatus = (id, currentStatus) => {
    updateCommunityApp(id, { status: currentStatus === 'active' ? 'inactive' : 'active' });
  };

  const handleChangeAgent = (appId, agentId) => {
    const agent = agents.find(a => a.id === parseInt(agentId));
    if (agent) {
      updateCommunityApp(appId, { agentId: agent.id, agentName: agent.name });
    }
  };

  const handleDelete = (id) => {
    deleteCommunityApp(id);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1>社群應用管理</h1>
          <p className="text-gray-600">管理所有已連結的社群平台</p>
        </div>
        <Link to="/connect-community">
          <Button>
            <Plus size={16} className="mr-2" />
            連結新平台
          </Button>
        </Link>
      </div>

      {communityApps.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Plus size={40} className="text-gray-400" />
            </div>
            <h3 className="text-gray-600 mb-2">尚未連結任何社群平台</h3>
            <p className="text-gray-500 mb-6">開始連結您的社群平台，讓 AI 助理為學員服務</p>
            <Link to="/connect-community">
              <Button>連結第一個平台</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {communityApps.map((app) => (
            <Card key={app.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Platform Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SocialMediaIcon platform={app.platform} size={32} />
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3>{app.platform}</h3>
                        <Badge variant={app.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                          {app.status === 'active' ? '啟用中' : '已停用'}
                        </Badge>
                      </div>
                      <Switch
                        checked={app.status === 'active'}
                        onCheckedChange={() => handleToggleStatus(app.id, app.status)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600 mb-2">指派的 AI 助理</p>
                        <Select 
                          value={app.agentId?.toString() || ''} 
                          onValueChange={(value) => handleChangeAgent(app.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="選擇 AI 助理" />
                          </SelectTrigger>
                          <SelectContent>
                            {agents.filter(a => a.status === 'active').map((agent) => (
                              <SelectItem key={agent.id} value={agent.id.toString()}>
                                {agent.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <p className="text-gray-600 mb-2">回覆統計</p>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-indigo-600">
                            已回覆 {app.replyCount} 次
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Edit size={14} className="mr-2" />
                        編輯設定
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw size={14} className="mr-2" />
                        重新授權
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto"
                          >
                            <Trash2 size={14} className="mr-2" />
                            刪除連結
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>確定要刪除此連結嗎？</AlertDialogTitle>
                            <AlertDialogDescription>
                              刪除「{app.platform}」的連結後，AI 助理將停止在該平台上回覆訊息。此操作無法復原。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(app.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              確定刪除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {communityApps.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>總計統計</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-600 mb-2">已連結平台</p>
                <p className="text-indigo-600">{communityApps.length}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-gray-600 mb-2">啟用中平台</p>
                <p className="text-green-600">
                  {communityApps.filter(app => app.status === 'active').length}
                </p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-gray-600 mb-2">總回覆次數</p>
                <p className="text-yellow-600">
                  {communityApps.reduce((sum, app) => sum + app.replyCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
