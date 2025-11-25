import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import SocialMediaIcon from './SocialMediaIcon';

export default function ConnectCommunity({ agents, addCommunityApp }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [channelAccessToken, setChannelAccessToken] = useState('');
  const [channelSecret, setChannelSecret] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');

  const platforms = [
    { id: 'LINE', name: 'LINE', color: 'bg-green-500' },
    { id: 'Facebook Messenger', name: 'Facebook Messenger', color: 'bg-blue-500' },
    { id: 'Instagram', name: 'Instagram', color: 'bg-pink-500' },
    { id: 'Discord', name: 'Discord', color: 'bg-indigo-500' },
  ];

  const handlePlatformSelect = (platformId) => {
    setSelectedPlatform(platformId);
    setStep(2);
  };

  const handleSaveSettings = () => {
    if (channelAccessToken && channelSecret) {
      setStep(3);
    }
  };

  const handleActivate = () => {
    const agent = agents.find(a => a.id === parseInt(selectedAgent));
    addCommunityApp({
      platform: selectedPlatform,
      agentName: agent?.name || '',
      agentId: agent?.id || null,
      status: 'active',
    });
    navigate('/community-apps');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>選擇社群平台</CardTitle>
                <p className="text-gray-600">選擇您要將 AI 助理部署到的平台</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platforms.map((platform) => (
                    <div
                      key={platform.id}
                      onClick={() => handlePlatformSelect(platform.id)}
                      className="border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 ${platform.color} rounded-lg flex items-center justify-center`}>
                          <SocialMediaIcon platform={platform.id} size={32} />
                        </div>
                        <div className="flex-1">
                          <h3>{platform.name}</h3>
                          <p className="text-gray-600">連結並部署 AI 助理</p>
                        </div>
                        <ArrowRight className="text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>平台授權與設定 - {selectedPlatform}</CardTitle>
                <p className="text-gray-600">
                  {selectedPlatform === 'LINE' && '請至 LINE Developer 後台，複製您的 Channel Access Token 和 Channel Secret'}
                  {selectedPlatform === 'Facebook Messenger' && '請至 Facebook Developer 後台取得 Page Access Token'}
                  {selectedPlatform === 'Instagram' && '請至 Instagram Business 後台取得 Access Token'}
                  {selectedPlatform === 'Discord' && '請至 Discord Developer Portal 取得 Bot Token'}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-blue-900 mb-2">設定步驟說明</h4>
                  <ol className="list-decimal list-inside space-y-1 text-blue-800">
                    <li>前往 {selectedPlatform} Developer 後台</li>
                    <li>建立或選擇您的應用程式/頻道</li>
                    <li>複製 API 金鑰與密鑰</li>
                    <li>將金鑰貼到下方欄位</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="token">
                      {selectedPlatform === 'LINE' ? 'Channel Access Token' : 'Access Token'}
                    </Label>
                    <Input
                      id="token"
                      placeholder="貼上您的 Access Token"
                      value={channelAccessToken}
                      onChange={(e) => setChannelAccessToken(e.target.value)}
                      className="font-mono"
                    />
                  </div>

                  {selectedPlatform === 'LINE' && (
                    <div>
                      <Label htmlFor="secret">Channel Secret</Label>
                      <Input
                        id="secret"
                        placeholder="貼上您的 Channel Secret"
                        value={channelSecret}
                        onChange={(e) => setChannelSecret(e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="webhook">Webhook URL（請複製到平台設定中）</Label>
                    <Input
                      id="webhook"
                      value={`https://api.your-platform.com/webhook/${selectedPlatform.toLowerCase().replace(' ', '-')}`}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    返回選擇平台
                  </Button>
                  <Button 
                    onClick={handleSaveSettings}
                    disabled={!channelAccessToken || (selectedPlatform === 'LINE' && !channelSecret)}
                  >
                    儲存並繼續
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>指派 AI 助理</CardTitle>
                <p className="text-gray-600">選擇要部署到 {selectedPlatform} 的 AI 助理</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="agent">選擇 AI 助理</Label>
                  <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                    <SelectTrigger>
                      <SelectValue placeholder="請選擇一個 AI 助理" />
                    </SelectTrigger>
                    <SelectContent>
                      {agents.filter(a => a.status === 'active').map((agent) => (
                        <SelectItem key={agent.id} value={agent.id.toString()}>
                          {agent.name} (回覆率: {agent.autoReplyRate}%)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedAgent && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-green-900 mb-2">確認部署資訊</h4>
                    <div className="space-y-2 text-green-800">
                      <p>• 平台：{selectedPlatform}</p>
                      <p>• AI 助理：{agents.find(a => a.id === parseInt(selectedAgent))?.name}</p>
                      <p>• 狀態：準備啟用</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    上一步
                  </Button>
                  <Button 
                    onClick={handleActivate}
                    disabled={!selectedAgent}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    確認啟用
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>連結社群應用</h1>
        <div className="flex items-center gap-4 mt-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= s ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s}
              </div>
              <span className={step >= s ? 'text-green-600' : 'text-gray-600'}>
                {s === 1 && '選擇平台'}
                {s === 2 && '授權設定'}
                {s === 3 && '指派助理'}
              </span>
              {s < 3 && <div className="w-12 h-0.5 bg-gray-300" />}
            </div>
          ))}
        </div>
      </div>

      {renderStep()}
    </div>
  );
}
