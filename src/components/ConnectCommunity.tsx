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
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-white">選擇社群平台</CardTitle>
                <p className="text-muted-foreground text-sm">選擇您要將 AI 助理部署到的平台</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platforms.map((platform) => (
                    <div
                      key={platform.id}
                      onClick={() => handlePlatformSelect(platform.id)}
                      className="border-2 border-border rounded-xl p-6 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer bg-card/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-muted/50 border border-border">
                          <SocialMediaIcon platform={platform.id} size={32} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">{platform.name}</h3>
                          <p className="text-muted-foreground text-sm">連結並部署 AI 助理</p>
                        </div>
                        <ArrowRight className="text-purple-400" />
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
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-white mb-2">平台授權與設定 - {selectedPlatform}</CardTitle>
                <p className="text-muted-foreground text-sm">
                  {selectedPlatform === 'LINE' && '請至 LINE Developer 後台，複製您的 Channel Access Token 和 Channel Secret'}
                  {selectedPlatform === 'Facebook Messenger' && '請至 Facebook Developer 後台取得 Page Access Token'}
                  {selectedPlatform === 'Instagram' && '請至 Instagram Business 後台取得 Access Token'}
                  {selectedPlatform === 'Discord' && '請至 Discord Developer Portal 取得 Bot Token'}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-4">
                  <h4 className="text-blue-400 mb-3 font-semibold">設定步驟說明</h4>
                  <ol className="list-decimal list-inside space-y-2 text-blue-300 text-sm">
                    <li>前往 {selectedPlatform} Developer 後台</li>
                    <li>建立或選擇您的應用程式/頻道</li>
                    <li>複製 API 金鑰與密鑰</li>
                    <li>將金鑰貼到下方欄位</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="token" className="text-white text-sm">
                      {selectedPlatform === 'LINE' ? 'Channel Access Token' : 'Access Token'}
                    </Label>
                    <Input
                      id="token"
                      placeholder="貼上您的 Access Token"
                      value={channelAccessToken}
                      onChange={(e) => setChannelAccessToken(e.target.value)}
                      className="font-mono bg-input-background border-border text-white placeholder:text-muted-foreground"
                    />
                  </div>

                  {selectedPlatform === 'LINE' && (
                    <div className="space-y-2">
                      <Label htmlFor="secret" className="text-white text-sm">Channel Secret</Label>
                      <Input
                        id="secret"
                        placeholder="貼上您的 Channel Secret"
                        value={channelSecret}
                        onChange={(e) => setChannelSecret(e.target.value)}
                        className="font-mono bg-input-background border-border text-white placeholder:text-muted-foreground"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="webhook" className="text-white text-sm">Webhook URL（請複製到平台設定中）</Label>
                    <Input
                      id="webhook"
                      value={`https://api.your-platform.com/webhook/${selectedPlatform.toLowerCase().replace(' ', '-')}`}
                      readOnly
                      className="bg-muted border-border text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-border">
                  <Button variant="outline" onClick={() => setStep(1)} className="border-border text-muted-foreground hover:text-white hover:bg-muted">
                    返回選擇平台
                  </Button>
                  <Button 
                    onClick={handleSaveSettings}
                    disabled={!channelAccessToken || (selectedPlatform === 'LINE' && !channelSecret)}
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/50"
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
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-white">指派 AI 助理</CardTitle>
                <p className="text-muted-foreground">選擇要部署到 {selectedPlatform} 的 AI 助理</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="agent" className="text-white">選擇 AI 助理</Label>
                  <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                    <SelectTrigger className="bg-input-background border-border text-white">
                      <SelectValue placeholder="請選擇一個 AI 助理" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {agents.filter(a => a.status === 'active').map((agent) => (
                        <SelectItem key={agent.id} value={agent.id.toString()} className="text-white">
                          {agent.name} (回覆率: {agent.autoReplyRate}%)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedAgent && (
                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-4">
                    <h4 className="text-green-400 mb-2 font-semibold">確認部署資訊</h4>
                    <div className="space-y-2 text-green-300">
                      <p>• 平台：{selectedPlatform}</p>
                      <p>• AI 助理：{agents.find(a => a.id === parseInt(selectedAgent))?.name}</p>
                      <p>• 狀態：準備啟用</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="border-border text-muted-foreground hover:text-white hover:bg-muted">
                    上一步
                  </Button>
                  <Button 
                    onClick={handleActivate}
                    disabled={!selectedAgent}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg shadow-green-500/50"
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
    <div className="p-8 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">連結社群應用</h1>
        <div className="flex items-center gap-4 mt-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  step >= s 
                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/50' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {s}
              </div>
              <span className={step >= s ? 'text-green-400 font-medium' : 'text-muted-foreground'}>
                {s === 1 && '選擇平台'}
                {s === 2 && '授權設定'}
                {s === 3 && '指派助理'}
              </span>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-green-500' : 'bg-border'}`} />}
            </div>
          ))}
        </div>
      </div>

      {renderStep()}
    </div>
  );
}
