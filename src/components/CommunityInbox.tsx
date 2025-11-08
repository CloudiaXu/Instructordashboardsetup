import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Filter, MoreVertical, Sun, Moon } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import svgPaths from '../imports/svg-vh2ynnyyum';

interface Conversation {
  id: number;
  name: string;
  platform: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar: string;
  tag?: string;
  status: string;
}

export default function CommunityInbox() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [usageCount, setUsageCount] = useState(0);
  const [usageLimit] = useState(100);

  // Mock conversations data
  const [conversations] = useState<Conversation[]>([
    // Example data structure - currently empty to match design
  ]);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || conv.tag === selectedTag;
    const matchesStatus = selectedStatus === 'all' || conv.status === selectedStatus;
    const matchesUnread = !showUnreadOnly || conv.unread;
    
    return matchesSearch && matchesTag && matchesStatus && matchesUnread;
  });

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white h-[73px] border-b border-neutral-200 shrink-0">
        <div className="flex items-center justify-between h-full px-6">
          {/* Left: Title */}
          <div className="flex flex-col">
            <h1 className="text-[20px] text-gray-900 leading-[28px]">收件匣</h1>
            <p className="text-[14px] text-gray-500 leading-[20px]">客戶訊息管理</p>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {/* Notification Button */}
            <Button variant="ghost" size="sm" className="p-2">
              <Bell size={20} className="text-gray-600" />
            </Button>

            {/* Dark Mode Toggle */}
            <div className="flex items-center">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="bg-gray-200 rounded-full w-12 h-6 p-0.5 relative transition-colors"
              >
                <div 
                  className={`bg-white rounded-full size-5 shadow flex items-center justify-center transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                >
                  {isDarkMode ? (
                    <Moon size={12} className="text-blue-600" />
                  ) : (
                    <Sun size={12} className="text-yellow-500" />
                  )}
                </div>
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-neutral-200">
              <div className="size-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium">C</span>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900">Cloudia</p>
                <p className="text-xs text-gray-500">shiau.cloudia@gmail.com</p>
              </div>
              <Button variant="ghost" size="sm" className="p-0">
                <MoreVertical size={16} className="text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Conversation List */}
        <div className="bg-white w-80 border-r border-neutral-200 flex flex-col">
          {/* Filters Section */}
          <div className="border-b border-gray-200 p-4 space-y-3">
            {/* Usage Counter */}
            <div className="flex items-center justify-between p-2 rounded-lg">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>使用量</span>
                <svg className="size-5" fill="none" viewBox="0 0 20 20">
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d={svgPaths.p11304070} 
                    fill="#6B7280" 
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-green-600">{usageCount}/{usageLimit}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="搜尋對話（即時過濾 / Enter 搜尋全部）"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-20 text-sm"
              />
              <Button 
                size="sm" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#e7c419] hover:bg-[#d4b117] text-white h-7 px-3"
              >
                搜尋
              </Button>
            </div>

            {/* Tag and Status Filters */}
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2">
                  <span className="text-sm text-gray-500">尚無標籤</span>
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-28 text-sm">
                  <SelectValue placeholder="全部狀態" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部狀態</SelectItem>
                  <SelectItem value="active">進行中</SelectItem>
                  <SelectItem value="pending">待處理</SelectItem>
                  <SelectItem value="resolved">已解決</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Unread Filter */}
            <Button
              variant="outline"
              size="sm"
              className={`w-full justify-start gap-2 ${showUnreadOnly ? 'bg-blue-50 border-blue-300' : ''}`}
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            >
              <Filter size={14} />
              <span className="text-sm">過濾未讀</span>
            </Button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <h3 className="text-lg font-medium text-gray-500 mb-1">沒有對話</h3>
                <p className="text-sm text-gray-500">當有新訊息時，對話會出現在這裡</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedConversation === conv.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="size-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shrink-0">
                        <span className="text-white font-medium">{conv.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900 truncate">{conv.name}</h4>
                          <span className="text-xs text-gray-500 ml-2 shrink-0">{conv.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">{conv.platform}</Badge>
                          {conv.tag && <Badge variant="secondary" className="text-xs">{conv.tag}</Badge>}
                        </div>
                      </div>
                      {conv.unread && (
                        <div className="size-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Message View */}
        <div className="flex-1 bg-white flex items-center justify-center">
          {selectedConversation === null ? (
            <p className="text-gray-500">請選擇一個對話</p>
          ) : (
            <div className="flex-1 flex flex-col h-full">
              {/* Conversation Header */}
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-medium">U</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">對話詳情</h3>
                      <p className="text-sm text-gray-500">選中的對話</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="text-center text-gray-500 mt-8">
                  訊息內容將顯示在這裡
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="輸入訊息..."
                    className="flex-1"
                  />
                  <Button className="bg-[#e7c419] hover:bg-[#d4b117]">
                    發送
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
