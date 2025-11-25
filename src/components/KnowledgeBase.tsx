import React, { useState } from 'react';
import { Search, Plus, Link2, MessageCircle, FileText, ExternalLink, Edit, Trash2, Upload, Download, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';

export default function KnowledgeBase({ links, setLinks, qas, setQas, notes, setNotes }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('links');
  
  // Dialog states
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [qaDialogOpen, setQaDialogOpen] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  
  // Form states
  const [editingLink, setEditingLink] = useState(null);
  const [editingQa, setEditingQa] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  // Link form
  const [linkForm, setLinkForm] = useState({
    name: '',
    type: '線上課程',
    expiration: '永久',
    url: '',
    status: '啟用',
  });

  // Q&A form
  const [qaForm, setQaForm] = useState({
    question: '',
    answer: '',
    category: '課程政策',
    visibility: '公開',
  });

  // Note form
  const [noteForm, setNoteForm] = useState({
    title: '',
    content: '',
    usedForTraining: true,
  });

  const handleAddLink = () => {
    if (editingLink !== null) {
      setLinks(links.map((link, idx) => idx === editingLink ? { ...linkForm, id: link.id } : link));
      setEditingLink(null);
    } else {
      setLinks([...links, { ...linkForm, id: Date.now() }]);
    }
    setLinkForm({ name: '', type: '線上課程', expiration: '永久', url: '', status: '啟用' });
    setLinkDialogOpen(false);
  };

  const handleEditLink = (link, index) => {
    setLinkForm(link);
    setEditingLink(index);
    setLinkDialogOpen(true);
  };

  const handleDeleteLink = (index) => {
    setLinks(links.filter((_, idx) => idx !== index));
  };

  const handleAddQa = () => {
    if (editingQa !== null) {
      setQas(qas.map((qa, idx) => idx === editingQa ? { ...qaForm, id: qa.id } : qa));
      setEditingQa(null);
    } else {
      setQas([...qas, { ...qaForm, id: Date.now() }]);
    }
    setQaForm({ question: '', answer: '', category: '課程政策', visibility: '公開' });
    setQaDialogOpen(false);
  };

  const handleEditQa = (qa, index) => {
    setQaForm(qa);
    setEditingQa(index);
    setQaDialogOpen(true);
  };

  const handleDeleteQa = (index) => {
    setQas(qas.filter((_, idx) => idx !== index));
  };

  const handleAddNote = () => {
    if (editingNote !== null) {
      setNotes(notes.map((note, idx) => 
        idx === editingNote 
          ? { ...noteForm, id: note.id, lastUpdated: new Date().toISOString().split('T')[0], summary: noteForm.content.substring(0, 100) + '...' } 
          : note
      ));
      setEditingNote(null);
    } else {
      setNotes([...notes, { 
        ...noteForm, 
        id: Date.now(), 
        lastUpdated: new Date().toISOString().split('T')[0],
        summary: noteForm.content.substring(0, 100) + '...'
      }]);
    }
    setNoteForm({ title: '', content: '', usedForTraining: true });
    setNoteDialogOpen(false);
  };

  const handleEditNote = (note, index) => {
    setNoteForm(note);
    setEditingNote(index);
    setNoteDialogOpen(true);
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, idx) => idx !== index));
  };

  const filteredLinks = links.filter(link => 
    link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQas = qas.filter(qa => 
    qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    qa.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">我的知識庫</h1>
        <p className="text-[14px] text-muted-foreground leading-[20px]">管理您的教材、常見問題和筆記，為您的 AI 助理提供知識支持。</p>
      </div>

      {/* Search and Action Bar */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="搜尋所有知識內容..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => { setEditingLink(null); setLinkForm({ name: '', type: '線上課程', expiration: '永久', url: '', status: '啟用' }); }}>
                <Link2 size={16} className="mr-2" />
                新增連結
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingLink !== null ? '編輯連結' : '新增連結'}</DialogTitle>
                <DialogDescription>新增課程相關或推廣連結給學生。</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="link-name">名稱</Label>
                  <Input
                    id="link-name"
                    value={linkForm.name}
                    onChange={(e) => setLinkForm({ ...linkForm, name: e.target.value })}
                    placeholder="例如：Python 初學者課程"
                  />
                </div>
                <div>
                  <Label htmlFor="link-type">類型</Label>
                  <Select value={linkForm.type} onValueChange={(value) => setLinkForm({ ...linkForm, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="線上課程">線上課程</SelectItem>
                      <SelectItem value="行銷頁面">行銷頁面</SelectItem>
                      <SelectItem value="資源">資源</SelectItem>
                      <SelectItem value="文件">文件</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="link-expiration">有效期限</Label>
                  <Select value={linkForm.expiration} onValueChange={(value) => setLinkForm({ ...linkForm, expiration: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="永久">永久</SelectItem>
                      <SelectItem value="1 個月">1 個月</SelectItem>
                      <SelectItem value="3 個月">3 個月</SelectItem>
                      <SelectItem value="6 個月">6 個月</SelectItem>
                      <SelectItem value="1 年">1 年</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="link-url">網址</Label>
                  <Input
                    id="link-url"
                    type="url"
                    value={linkForm.url}
                    onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>取消</Button>
                <Button onClick={handleAddLink}>{editingLink !== null ? '更新' : '新增'}連結</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={qaDialogOpen} onOpenChange={setQaDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => { setEditingQa(null); setQaForm({ question: '', answer: '', category: '課程政策', visibility: '公開' }); }}>
                <MessageCircle size={16} className="mr-2" />
                新增問答
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingQa !== null ? '編輯問答' : '新增問答'}</DialogTitle>
                <DialogDescription>新增固定的問答配對。</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="qa-question">問題</Label>
                  <Input
                    id="qa-question"
                    value={qaForm.question}
                    onChange={(e) => setQaForm({ ...qaForm, question: e.target.value })}
                    placeholder="例如：我可以使用多久？"
                  />
                </div>
                <div>
                  <Label htmlFor="qa-answer">答案</Label>
                  <Textarea
                    id="qa-answer"
                    value={qaForm.answer}
                    onChange={(e) => setQaForm({ ...qaForm, answer: e.target.value })}
                    placeholder="例如：購買後終身使用。"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="qa-category">分類</Label>
                  <Select value={qaForm.category} onValueChange={(value) => setQaForm({ ...qaForm, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="課程政策">課程政策</SelectItem>
                      <SelectItem value="技術支援">技術支援</SelectItem>
                      <SelectItem value="付款">付款</SelectItem>
                      <SelectItem value="帳號">帳號</SelectItem>
                      <SelectItem value="一般">一般</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="qa-visibility">可見性</Label>
                  <Select value={qaForm.visibility} onValueChange={(value) => setQaForm({ ...qaForm, visibility: value })}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="公開">公開</SelectItem>
                      <SelectItem value="私人">私人</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setQaDialogOpen(false)}>取消</Button>
                <Button onClick={handleAddQa}>{editingQa !== null ? '更新' : '新增'}問答</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => { setEditingNote(null); setNoteForm({ title: '', content: '', usedForTraining: true }); }}>
                <FileText size={16} className="mr-2" />
                新增文字筆記
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingNote !== null ? '編輯筆記' : '新增文字筆記'}</DialogTitle>
                <DialogDescription>儲存個人筆記、教學風格短語或自由文本。</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="note-title">標題</Label>
                  <Input
                    id="note-title"
                    value={noteForm.title}
                    onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                    placeholder="例如：授課的編輯技巧"
                  />
                </div>
                <div>
                  <Label htmlFor="note-content">內容</Label>
                  <Textarea
                    id="note-content"
                    value={noteForm.content}
                    onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                    placeholder="總是從架構開始..."
                    rows={8}
                    className="font-mono"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="note-training">用於 AI 訓練</Label>
                  <Switch
                    id="note-training"
                    checked={noteForm.usedForTraining}
                    onCheckedChange={(checked) => setNoteForm({ ...noteForm, usedForTraining: checked })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNoteDialogOpen(false)}>取消</Button>
                <Button onClick={handleAddNote}>{editingNote !== null ? '更新' : '新增'}筆記</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="links" className="gap-2">
            <Link2 size={16} />
            連結
          </TabsTrigger>
          <TabsTrigger value="qas" className="gap-2">
            <MessageCircle size={16} />
            固定問答
          </TabsTrigger>
          <TabsTrigger value="notes" className="gap-2">
            <FileText size={16} />
            文字筆記
          </TabsTrigger>
        </TabsList>

        {/* Links Tab */}
        <TabsContent value="links">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>課程與推廣連結</CardTitle>
                  <p className="text-muted-foreground text-sm mt-1">管理學生存取課程和資源的連結</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload size={14} className="mr-2" />
                    匯入 CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    篩選：即將到期
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredLinks.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
                  <Link2 className="mx-auto mb-4 text-gray-400" size={48} />
                  <h3 className="text-gray-600 mb-2">尚無連結</h3>
                  <p className="text-gray-500 mb-4">從新增第一個課程或行銷連結開始！</p>
                  <Button onClick={() => setLinkDialogOpen(true)}>
                    <Plus size={16} className="mr-2" />
                    新增第一個連結
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名稱</TableHead>
                      <TableHead>類型</TableHead>
                      <TableHead>有效期限</TableHead>
                      <TableHead>網址</TableHead>
                      <TableHead>狀態</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLinks.map((link, index) => (
                      <TableRow key={link.id}>
                        <TableCell>{link.name}</TableCell>
                        <TableCell>{link.type}</TableCell>
                        <TableCell>{link.expiration}</TableCell>
                        <TableCell>
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                            <ExternalLink size={14} />
                            連結
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge variant={link.status === '啟用' ? 'default' : 'secondary'}>
                            {link.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditLink(link, index)}>
                              <Edit size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteLink(index)}>
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Q&A Tab */}
        <TabsContent value="qas">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>固定問答配對</CardTitle>
                  <p className="text-gray-600 mt-1">固定的問答配對，總是以相同方式回應</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Sparkles size={14} className="mr-2" />
                    AI 生成問答
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload size={14} className="mr-2" />
                    匯入 CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredQas.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
                  <MessageCircle className="mx-auto mb-4 text-gray-400" size={48} />
                  <h3 className="text-gray-600 mb-2">尚未新增問答</h3>
                  <p className="text-gray-500 mb-4">讓我們開始建立您的常見問題清單！</p>
                  <Button onClick={() => setQaDialogOpen(true)}>
                    <Plus size={16} className="mr-2" />
                    新增第一個問答
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>問題</TableHead>
                      <TableHead>答案</TableHead>
                      <TableHead>分類</TableHead>
                      <TableHead>可見性</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQas.map((qa, index) => (
                      <TableRow key={qa.id}>
                        <TableCell className="max-w-xs">{qa.question}</TableCell>
                        <TableCell className="max-w-md text-gray-600">{qa.answer}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{qa.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={qa.visibility === '公開' ? 'default' : 'secondary'}>
                            {qa.visibility}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditQa(qa, index)}>
                              <Edit size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteQa(index)}>
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Text Notes Tab */}
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>教學筆記與風格參考</CardTitle>
                  <p className="text-gray-600 mt-1">個人筆記、教學風格短語或用於 AI 訓練的自由文本</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download size={14} className="mr-2" />
                    匯出全部
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredNotes.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
                  <FileText className="mx-auto mb-4 text-gray-400" size={48} />
                  <h3 className="text-gray-600 mb-2">尚無文字筆記</h3>
                  <p className="text-gray-500 mb-4">新增您的第一個教學筆記或風格參考！</p>
                  <Button onClick={() => setNoteDialogOpen(true)}>
                    <Plus size={16} className="mr-2" />
                    新增第一個筆記
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>標題</TableHead>
                      <TableHead>摘要</TableHead>
                      <TableHead>最後更新</TableHead>
                      <TableHead>用於訓練</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotes.map((note, index) => (
                      <TableRow key={note.id}>
                        <TableCell>{note.title}</TableCell>
                        <TableCell className="max-w-md text-gray-600">{note.summary}</TableCell>
                        <TableCell>{note.lastUpdated}</TableCell>
                        <TableCell>
                          {note.usedForTraining ? (
                            <Badge>✅ 是</Badge>
                          ) : (
                            <Badge variant="outline">否</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditNote(note, index)}>
                              <Edit size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteNote(index)}>
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sync CTA */}
      <Card className="mt-6 bg-gradient-to-r from-purple-500/20 to-yellow-500/20 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">準備好更新您的 AI 助理了嗎？</h3>
              <p className="text-muted-foreground text-sm">一鍵同步所有變更到您連結的 AI 代理</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/50">
              <Upload size={16} className="mr-2" />
              同步到 AI 助理
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
