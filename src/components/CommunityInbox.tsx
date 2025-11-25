import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Filter, MoreVertical, Sun, Moon, Sparkles, X, Send } from 'lucide-react';
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
  const [usageCount, setUsageCount] = useState(45);
  const [usageLimit] = useState(100);

  // Mock conversations data
  const [conversations] = useState<Conversation[]>([
    {
      id: 1,
      name: '張小明',
      platform: 'LINE',
      lastMessage: '請問課程可以退費嗎？',
      timestamp: '10:30',
      unread: true,
      avatar: '張',
      tag: '付款',
      status: 'pending',
    },
    {
      id: 2,
      name: '李美華',
      platform: 'Facebook Messenger',
      lastMessage: '謝謝您的回覆，我已經成功報名了！',
      timestamp: '09:15',
      unread: false,
      avatar: '李',
      tag: '報名',
      status: 'resolved',
    },
    {
      id: 3,
      name: '王建國',
      platform: 'LINE',
      lastMessage: '影片上傳一直失敗，該怎麼辦？',
      timestamp: '昨天',
      unread: true,
      avatar: '王',
      tag: '技術問題',
      status: 'active',
    },
    {
      id: 4,
      name: '陳雅婷',
      platform: 'Instagram',
      lastMessage: '想了解進階剪輯課程的詳細內容',
      timestamp: '昨天',
      unread: false,
      avatar: '陳',
      status: 'active',
    },
    {
      id: 5,
      name: '林志強',
      platform: 'LINE',
      lastMessage: '忘記密碼了，可以幫我重設嗎？',
      timestamp: '2 天前',
      unread: true,
      avatar: '林',
      tag: '帳號',
      status: 'pending',
    },
    {
      id: 6,
      name: '黃淑芬',
      platform: 'Facebook Messenger',
      lastMessage: '課程內容非常實用，感謝老師！',
      timestamp: '3 天前',
      unread: false,
      avatar: '黃',
      status: 'resolved',
    },
    {
      id: 7,
      name: '吳文傑',
      platform: 'Discord',
      lastMessage: '請問這個功能要如何使用？',
      timestamp: '3 天前',
      unread: false,
      avatar: '吳',
      tag: '操作',
      status: 'active',
    },
    {
      id: 8,
      name: '劉佳玲',
      platform: 'LINE',
      lastMessage: '我想報名下個月的課程',
      timestamp: '4 天前',
      unread: false,
      avatar: '劉',
      tag: '報名',
      status: 'active',
    },
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
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-card h-[73px] border-b border-border shrink-0">
        <div className="flex items-start h-full px-6 pb-[21px] pt-5">
          <div className="flex flex-col">
            <h1 className="text-[20px] text-white leading-[28px] font-semibold">收件匣</h1>
            <p className="text-[14px] text-muted-foreground leading-[20px]">客戶訊息管理</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Conversation List */}
        <div className="bg-card w-80 border-r border-border flex flex-col">
          {/* Filters Section */}
          <div className="border-b border-border p-4 space-y-3">
            {/* Usage Counter */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>使用量</span>
                <svg className="size-5" fill="none" viewBox="0 0 20 20">
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d={svgPaths.p11304070} 
                    fill="currentColor" 
                    className="text-muted-foreground"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-green-400">{usageCount}/{usageLimit}</span>
                <ChevronDown size={16} className="text-muted-foreground" />
              </div>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="搜尋對話（即時過濾 / Enter 搜尋全部）"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-20 text-sm bg-input-background border-border text-white placeholder:text-muted-foreground"
              />
              <Button 
                size="sm" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white h-7 px-3 shadow-lg shadow-yellow-500/30"
              >
                搜尋
              </Button>
            </div>

            {/* Tag and Status Filters */}
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="bg-muted border border-border rounded-md px-3 py-2">
                  <span className="text-sm text-muted-foreground">尚無標籤</span>
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-28 h-auto text-sm bg-muted border border-border text-white px-3 py-2">
                  <SelectValue placeholder="全部狀態" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all" className="text-white">全部狀態</SelectItem>
                  <SelectItem value="active" className="text-white">進行中</SelectItem>
                  <SelectItem value="pending" className="text-white">待處理</SelectItem>
                  <SelectItem value="resolved" className="text-white">已解決</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Unread Filter */}
            <Button
              variant="outline"
              size="sm"
              className={`w-full justify-start gap-2 border-border ${
                showUnreadOnly 
                  ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-white'
              }`}
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
                <h3 className="text-lg font-medium text-muted-foreground mb-1">沒有對話</h3>
                <p className="text-sm text-muted-foreground">當有新訊息時，對話會出現在這裡</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                      selectedConversation === conv.id 
                        ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/10 border-l-2 border-purple-500' 
                        : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/30">
                        <span className="text-white font-medium">{conv.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-white truncate">{conv.name}</h4>
                          <span className="text-xs text-muted-foreground ml-2 shrink-0">{conv.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs border-border text-muted-foreground">{conv.platform}</Badge>
                          {conv.tag && <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-400 border-purple-500/50">{conv.tag}</Badge>}
                        </div>
                      </div>
                      {conv.unread && (
                        <div className="size-2 rounded-full bg-purple-500 shrink-0 mt-2 shadow-lg shadow-purple-500/50" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Message View */}
        <div className="flex-1 bg-card flex items-center justify-center">
          {selectedConversation === null ? (
            <p className="text-muted-foreground">請選擇一個對話</p>
          ) : (
            <div className="flex-1 flex flex-col h-full">
              {/* Conversation Header */}
              <div className="border-b border-border p-4 bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const conv = conversations.find(c => c.id === selectedConversation);
                      return (
                        <>
                          <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <span className="text-white font-medium">{conv?.avatar || 'U'}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{conv?.name || '對話詳情'}</h3>
                            <p className="text-sm text-muted-foreground">{conv?.platform || '選中的對話'}</p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white hover:bg-muted">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-background space-y-4 w-full">
                {(() => {
                  const conv = conversations.find(c => c.id === selectedConversation);
                  if (!conv) return null;
                  
                  // Generate sample messages based on conversation - student asks first, then AI replies
                  const getSampleMessages = () => {
                    if (conv.lastMessage.includes('退費')) {
                      return [
                        {
                          type: 'user',
                          text: '您好，我想請問一下，如果購買了課程之後不滿意，可以申請退費嗎？需要什麼條件嗎？',
                          time: '10:25',
                        },
                        {
                          type: 'ai',
                          text: '您好！根據我們的退費政策，購買後 30 天內可以申請退費。退費條件包括：\n\n1. 購買日期在 30 天內\n2. 課程進度未超過 50%\n3. 未下載或分享課程內容\n\n請提供您的訂單編號，我會協助您處理退費申請。',
                          time: '10:26',
                        },
                        {
                          type: 'user',
                          text: '好的，我的訂單編號是 ORD-2024-1028-001',
                          time: '10:28',
                        },
                        {
                          type: 'ai',
                          text: '收到！我已經為您查詢到訂單資訊。您的訂單符合退費條件，退費金額將在 3-5 個工作天內退回到您的原付款帳戶。\n\n退費流程已啟動，您會收到確認郵件。如有任何問題，隨時告訴我！',
                          time: '10:30',
                        },
                      ];
                    } else if (conv.lastMessage.includes('報名')) {
                      return [
                        {
                          type: 'user',
                          text: '我想報名下個月的 Python 進階課程，請問還有名額嗎？費用是多少？',
                          time: '09:10',
                        },
                        {
                          type: 'ai',
                          text: '很高興您對我們的 Python 進階課程有興趣！\n\n目前下個月的課程還有名額，費用是 NT$ 8,900。課程包含：\n\n• 12 小時的實作課程\n• 完整的專案範例\n• 終身觀看權限\n• 專屬學習群組支援\n\n您想要我為您保留名額嗎？',
                          time: '09:11',
                        },
                        {
                          type: 'user',
                          text: '好的，我想報名！請問要怎麼付款？',
                          time: '09:12',
                        },
                        {
                          type: 'ai',
                          text: '太好了！您可以透過以下方式付款：\n\n1. 信用卡線上付款\n2. 銀行轉帳\n3. 超商代碼繳費\n\n完成付款後，我會立即為您開通課程權限。您比較偏好哪種付款方式呢？',
                          time: '09:13',
                        },
                      ];
                    } else if (conv.lastMessage.includes('失敗')) {
                      return [
                        {
                          type: 'user',
                          text: '老師您好，我上傳作業影片時一直顯示上傳失敗，已經試了好幾次都不行。檔案大小是 500MB，格式是 MP4，請問是什麼問題？',
                          time: '昨天 14:20',
                        },
                        {
                          type: 'ai',
                          text: '關於上傳失敗的問題，我來幫您排查一下：\n\n1. 檔案大小：我們的系統限制單檔最大 300MB，您的檔案 500MB 超過限制了。建議您：\n   • 使用影片壓縮工具降低檔案大小\n   • 或將影片分段上傳\n\n2. 格式檢查：MP4 格式是支援的，這部分沒問題。\n\n3. 網路連線：建議使用穩定的網路環境上傳。\n\n需要我提供影片壓縮的教學嗎？',
                          time: '昨天 14:22',
                        },
                        {
                          type: 'user',
                          text: '原來是檔案太大！我試試看壓縮，謝謝您的協助。',
                          time: '昨天 14:30',
                        },
                        {
                          type: 'ai',
                          text: '不客氣！如果壓縮後還是有問題，隨時告訴我。祝您學習順利！',
                          time: '昨天 14:31',
                        },
                      ];
                    } else if (conv.lastMessage.includes('密碼')) {
                      return [
                        {
                          type: 'user',
                          text: '不好意思，我忘記登入密碼了，可以幫我重設嗎？我的註冊信箱是 example@email.com',
                          time: '2 天前 16:45',
                        },
                        {
                          type: 'ai',
                          text: '沒問題！我已經為您發送密碼重設連結到您的信箱 example@email.com。\n\n請檢查您的收件匣（如果沒看到，也請檢查垃圾郵件），點擊連結後即可設定新密碼。\n\n連結有效期限為 24 小時。如果沒有收到郵件，請告訴我，我會重新發送。',
                          time: '2 天前 16:46',
                        },
                        {
                          type: 'user',
                          text: '收到了！已經成功重設密碼，謝謝。',
                          time: '2 天前 17:00',
                        },
                        {
                          type: 'ai',
                          text: '太好了！很高興能協助您解決問題。如果之後還有任何問題，隨時都可以找我。祝您學習愉快！',
                          time: '2 天前 17:01',
                        },
                      ];
                    } else if (conv.lastMessage.includes('詳細內容')) {
                      return [
                        {
                          type: 'user',
                          text: '我想了解進階剪輯課程的詳細內容，包括課程大綱、上課時間、以及需要什麼基礎能力？',
                          time: '昨天 11:00',
                        },
                        {
                          type: 'ai',
                          text: '很高興您對進階剪輯課程有興趣！以下是課程詳細資訊：\n\n📋 課程大綱：\n• 進階轉場技巧與特效應用\n• 色彩校正與調色實作\n• 音效設計與混音\n• 動態圖形與標題設計\n• 完整專案實作\n\n⏰ 上課時間：\n• 每週三、五晚上 19:00-21:00\n• 為期 6 週，共 12 堂課\n• 可觀看錄影回放\n\n💡 基礎要求：\n• 熟悉基本剪輯軟體操作\n• 完成過至少 3 個剪輯專案\n\n需要我為您保留名額嗎？',
                          time: '昨天 11:02',
                        },
                      ];
                    } else if (conv.lastMessage.includes('感謝')) {
                      return [
                        {
                          type: 'user',
                          text: '老師，課程內容非常實用，我學到很多！特別是色彩校正的部分，讓我對影片品質有了新的認識。',
                          time: '3 天前 20:15',
                        },
                        {
                          type: 'ai',
                          text: '聽到您這麼說真的很開心！色彩校正確實是提升影片質感的關鍵技巧。\n\n如果您在後續的專案中遇到任何問題，或想要更深入學習特定主題，隨時都可以找我討論。\n\n也歡迎您分享您的作品，我很樂意提供建議和回饋！',
                          time: '3 天前 20:16',
                        },
                        {
                          type: 'user',
                          text: '好的，我會繼續努力學習的！',
                          time: '3 天前 20:18',
                        },
                      ];
                    } else {
                      return [
                        {
                          type: 'user',
                          text: conv.lastMessage || '請問這個功能要如何使用？我試了好幾次都不太確定操作步驟。',
                          time: conv.timestamp,
                        },
                        {
                          type: 'ai',
                          text: '感謝您的詢問！關於這個功能的使用方式，讓我為您詳細說明：\n\n1. 首先，請確認您已經完成基本設定\n2. 接著，按照以下步驟操作：\n   • 步驟一：點選功能選單\n   • 步驟二：選擇您需要的選項\n   • 步驟三：確認設定後儲存\n\n如果操作過程中遇到任何問題，隨時告訴我，我會協助您解決！',
                          time: '剛剛',
                        },
                      ];
                    }
                  };
                  
                  const sampleMessages = getSampleMessages();
                  
                  return sampleMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex w-full ${msg.type === 'user' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-md rounded-xl p-3 ${
                          msg.type === 'user'
                            ? 'bg-card border border-border text-white'
                            : 'bg-purple-500/15 border border-purple-500/30 text-white'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{msg.text}</p>
                        <p className={`text-xs mt-2 ${msg.type === 'user' ? 'text-muted-foreground' : 'text-purple-300/80'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ));
                })()}
              </div>

              {/* Message Input */}
              <div className="border-t border-border p-4 bg-card">
                <div className="flex gap-2">
                  <Input
                    placeholder="輸入訊息..."
                    className="flex-1 bg-input-background border-border text-white placeholder:text-muted-foreground"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-muted-foreground hover:text-white hover:bg-muted"
                    title="AI 生成文字"
                  >
                    <Sparkles size={20} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-muted-foreground hover:text-white hover:bg-muted"
                    title="清除"
                  >
                    <X size={20} />
                  </Button>
                  <Button 
                    size="icon"
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white shadow-lg shadow-yellow-500/30"
                    title="發送"
                  >
                    <Send size={20} />
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
