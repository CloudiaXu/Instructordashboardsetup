import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Upload, FileText, X, Send, RefreshCw, Save, CheckCircle, Link2, MessageCircle, FileEdit, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';

export default function CreateAgent({ addAgent, links = [], qas = [], notes = [] }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [agentName, setAgentName] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedKnowledgeItems, setSelectedKnowledgeItems] = useState([]);
  const [chatTexts, setChatTexts] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedTone, setSelectedTone] = useState('balanced');

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      uploadDate: new Date().toLocaleDateString('zh-TW'),
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      text: currentMessage,
    };

    setChatHistory([...chatHistory, newMessage]);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: generateAIResponse(currentMessage, selectedTone),
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);

    setCurrentMessage('');
  };

  const generateAIResponse = (question, tone) => {
    const responses = {
      professional: '根據課程資料，我可以為您詳細說明這個問題。首先，讓我們從基礎概念開始探討...',
      casual: '嗨！關於這個問題，讓我用簡單的方式跟你說明一下～基本上就是...',
      concise: '簡單來說：這個功能的核心在於三個步驟：1. 設定 2. 執行 3. 驗證',
      balanced: '謝謝您的提問！關於這個問題，根據課程內容，我建議您可以從以下幾個方向思考...',
    };
    return responses[tone] || responses.balanced;
  };

  const regenerateWithTone = (tone) => {
    setSelectedTone(tone);
    if (chatHistory.length > 0) {
      const lastUserMessage = [...chatHistory].reverse().find(msg => msg.type === 'user');
      if (lastUserMessage) {
        const updatedHistory = chatHistory.slice(0, -1);
        const newResponse = {
          id: Date.now(),
          type: 'ai',
          text: generateAIResponse(lastUserMessage.text, tone),
        };
        setChatHistory([...updatedHistory, newResponse]);
      }
    }
  };

  const handleDeploy = () => {
    const newAgentId = addAgent({
      name: agentName || '新 AI 助理',
      status: 'active',
    });
    navigate('/');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-white">建立您的 AI 知識大腦：請上傳您的課程資料</CardTitle>
                <p className="text-muted-foreground text-sm">
                  支援的檔案格式：.pdf, .docx, .txt<br />
                  建議上傳內容：課程講義、FAQ、教學文章
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="mb-4">
                  <label className="block mb-2 text-white">AI 助理名稱</label>
                  <Input
                    placeholder="例如：課程 A 專用助理"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="bg-input-background border-border text-white placeholder:text-muted-foreground"
                  />
                </div>

                <div className="border-2 border-dashed border-purple-500/50 rounded-xl p-12 text-center hover:border-purple-500/80 hover:shadow-lg hover:shadow-purple-500/20 transition-all bg-gradient-to-br from-purple-500/10 to-purple-600/5">
                  <Upload className="mx-auto mb-4 text-purple-400" size={48} />
                  <p className="mb-4 text-muted-foreground">拖曳檔案到這裡，或點擊上傳</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.docx,.txt"
                  />
                  <label htmlFor="file-upload">
                    <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/50">
                      <span>選擇檔案</span>
                    </Button>
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold">已上傳文件 ({uploadedFiles.length})</h4>
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-card/50 border border-border rounded-xl">
                        <div className="flex items-center gap-3">
                          <FileText className="text-purple-400" size={20} />
                          <div>
                            <p className="text-white">{file.name}</p>
                            <p className="text-muted-foreground text-sm">{file.size} • {file.uploadDate}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="text-muted-foreground hover:text-white hover:bg-muted"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Select from Knowledge Base */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-semibold">或從知識庫選擇現有內容</h4>
                      {selectedKnowledgeItems.length > 0 && (
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                          已選擇 {selectedKnowledgeItems.length} 項
                        </Badge>
                      )}
                    </div>
                    <Link to="/knowledge-base">
                      <Button variant="link" size="sm" className="text-purple-400 hover:text-purple-300">
                        前往知識庫 <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </Link>
                  </div>
                  
                  {(links.length > 0 || qas.length > 0 || notes.length > 0) ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {links.length > 0 && (
                        <div>
                          <p className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                            <Link2 size={16} className="text-purple-400" />
                            Links ({links.length})
                          </p>
                          <div className="space-y-2">
                            {links.slice(0, 3).map((link) => (
                              <div key={link.id} className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border hover:border-purple-500/50 transition-all">
                                <Checkbox 
                                  checked={selectedKnowledgeItems.includes(`link-${link.id}`)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedKnowledgeItems([...selectedKnowledgeItems, `link-${link.id}`]);
                                    } else {
                                      setSelectedKnowledgeItems(selectedKnowledgeItems.filter(id => id !== `link-${link.id}`));
                                    }
                                  }}
                                />
                                <span className="flex-1 text-white">{link.name}</span>
                                <Badge variant="outline" className="border-border text-muted-foreground">{link.type}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {qas.length > 0 && (
                        <div>
                          <p className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                            <MessageCircle size={16} className="text-purple-400" />
                            Q&A Pairs ({qas.length})
                          </p>
                          <div className="space-y-2">
                            {qas.slice(0, 3).map((qa) => (
                              <div key={qa.id} className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border hover:border-purple-500/50 transition-all">
                                <Checkbox 
                                  checked={selectedKnowledgeItems.includes(`qa-${qa.id}`)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedKnowledgeItems([...selectedKnowledgeItems, `qa-${qa.id}`]);
                                    } else {
                                      setSelectedKnowledgeItems(selectedKnowledgeItems.filter(id => id !== `qa-${qa.id}`));
                                    }
                                  }}
                                />
                                <span className="flex-1 text-white">{qa.question}</span>
                                <Badge variant="outline" className="border-border text-muted-foreground">{qa.category}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {notes.length > 0 && (
                        <div>
                          <p className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                            <FileEdit size={16} className="text-purple-400" />
                            Text Notes ({notes.length})
                          </p>
                          <div className="space-y-2">
                            {notes.slice(0, 3).map((note) => (
                              <div key={note.id} className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border hover:border-purple-500/50 transition-all">
                                <Checkbox 
                                  checked={selectedKnowledgeItems.includes(`note-${note.id}`)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedKnowledgeItems([...selectedKnowledgeItems, `note-${note.id}`]);
                                    } else {
                                      setSelectedKnowledgeItems(selectedKnowledgeItems.filter(id => id !== `note-${note.id}`));
                                    }
                                  }}
                                />
                                <span className="flex-1 text-white">{note.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-border rounded-xl bg-card/50">
                      <p className="text-muted-foreground mb-2">知識庫目前是空的</p>
                      <Link to="/knowledge-base">
                        <Button variant="link" className="text-purple-400 hover:text-purple-300">
                          前往建立知識內容 <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => navigate('/')} className="border-border text-muted-foreground hover:text-white hover:bg-muted">
                    取消
                  </Button>
                  <Button 
                    onClick={() => setStep(2)} 
                    disabled={uploadedFiles.length === 0 && selectedKnowledgeItems.length === 0}
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/50"
                  >
                    下一步：學習對話風格
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-white">讓 AI 像您一樣說話：請上傳過去的對話紀錄</CardTitle>
                <p className="text-muted-foreground text-sm">
                  上傳您過去與學員的對話記錄，讓 AI 學習您的語氣、措辭與回覆風格
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block mb-2 text-white">對話紀錄格式範例</label>
                  <div className="bg-muted/50 p-4 rounded-xl mb-4 border border-border">
                    <code className="text-muted-foreground text-sm">
                      學員：請問如何使用這個功能？<br />
                      老師：很高興為您解答！首先...<br />
                      <br />
                      學員：上傳失敗怎麼辦？<br />
                      老師：別擔心，這個問題很常見...
                    </code>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-white">貼上對話內容</label>
                  <Textarea
                    placeholder="請將您過去的對話記錄貼上於此..."
                    value={chatTexts}
                    onChange={(e) => setChatTexts(e.target.value)}
                    className="min-h-[300px] bg-input-background border-border text-white placeholder:text-muted-foreground"
                  />
                </div>

                <div className="border-2 border-dashed border-purple-500/50 rounded-xl p-8 text-center bg-gradient-to-br from-purple-500/10 to-purple-600/5">
                  <p className="mb-3 text-muted-foreground">或上傳對話紀錄檔案 (.txt, .csv)</p>
                  <input
                    type="file"
                    className="hidden"
                    id="chat-upload"
                    accept=".txt,.csv"
                  />
                  <label htmlFor="chat-upload">
                    <Button variant="outline" className="border-border text-muted-foreground hover:text-white hover:bg-muted" asChild>
                      <span>上傳檔案</span>
                    </Button>
                  </label>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="border-border text-muted-foreground hover:text-white hover:bg-muted">
                    上一步
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/50"
                  >
                    下一步：測試與調校
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="max-w-5xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-white">Agent 試用與調校</CardTitle>
                <p className="text-muted-foreground text-sm">
                  在正式部署前，測試您的 AI 助理並調整回覆風格
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Chat Window */}
                  <div className="lg:col-span-2">
                    <div className="border border-border rounded-xl h-[500px] flex flex-col bg-card/50">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {chatHistory.length === 0 && (
                          <div className="text-center text-muted-foreground mt-20">
                            <p className="text-white mb-1">開始測試您的 AI 助理</p>
                            <p className="text-sm">輸入學員可能會問的問題</p>
                          </div>
                        )}
                        {chatHistory.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-xl p-3 ${
                                msg.type === 'user'
                                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
                                  : 'bg-card border border-border text-white'
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-border p-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="輸入測試問題..."
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="bg-input-background border-border text-white placeholder:text-muted-foreground"
                          />
                          <Button 
                            onClick={handleSendMessage}
                            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/50"
                          >
                            <Send size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tone Controls */}
                  <div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-3 text-white font-semibold">風格調整</h4>
                        <div className="space-y-2">
                          {[
                            { id: 'professional', label: '更專業', icon: '👔' },
                            { id: 'casual', label: '更口語', icon: '💬' },
                            { id: 'concise', label: '更簡潔', icon: '⚡' },
                            { id: 'balanced', label: '平衡風格', icon: '⚖️' },
                          ].map((tone) => (
                            <Button
                              key={tone.id}
                              variant={selectedTone === tone.id ? 'default' : 'outline'}
                              className={`w-full justify-start ${
                                selectedTone === tone.id
                                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/50'
                                  : 'border-border text-muted-foreground hover:text-white hover:bg-muted'
                              }`}
                              onClick={() => regenerateWithTone(tone.id)}
                            >
                              <span className="mr-2">{tone.icon}</span>
                              {tone.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-border pt-4">
                        <h4 className="mb-3 text-white font-semibold">快速測試問題</h4>
                        <div className="space-y-2">
                          {[
                            '課程如何報名？',
                            '忘記密碼怎麼辦？',
                            '可以退費嗎？',
                          ].map((question, idx) => (
                            <Button
                              key={idx}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-left text-muted-foreground hover:text-white hover:bg-muted"
                              onClick={() => {
                                setCurrentMessage(question);
                                setTimeout(() => handleSendMessage(), 100);
                              }}
                            >
                              {question}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6 mt-6 border-t border-border">
                  <Button variant="outline" onClick={() => setStep(2)} className="border-border text-muted-foreground hover:text-white hover:bg-muted">
                    上一步
                  </Button>
                  <Button 
                    onClick={handleDeploy} 
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/50"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    完成並部署
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
        <h1 className="text-3xl font-bold text-white mb-2">建立 AI 助理</h1>
        <div className="flex items-center gap-4 mt-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  step >= s 
                    ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/50' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {s}
              </div>
              <span className={step >= s ? 'text-purple-400 font-medium' : 'text-muted-foreground'}>
                {s === 1 && '上傳知識庫'}
                {s === 2 && '學習風格'}
                {s === 3 && '測試調校'}
              </span>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-purple-500' : 'bg-border'}`} />}
            </div>
          ))}
        </div>
      </div>

      {renderStep()}
    </div>
  );
}
