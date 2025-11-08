import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import KnowledgeBase from './components/KnowledgeBase';
import CreateAgent from './components/CreateAgent';
import ConnectCommunity from './components/ConnectCommunity';
import Reports from './components/Reports';
import AgentManagement from './components/AgentManagement';
import CommunityAppsManagement from './components/CommunityAppsManagement';
import CommunityInbox from './components/CommunityInbox';
import Sidebar from './components/Sidebar';

export default function App() {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: '課程 A 專用助理',
      status: 'active',
      lastUpdated: '2025-10-28',
      replyCount: 342,
      autoReplyRate: 85,
    },
    {
      id: 2,
      name: '進階課程助理',
      status: 'active',
      lastUpdated: '2025-10-25',
      replyCount: 189,
      autoReplyRate: 78,
    },
    {
      id: 3,
      name: 'FAQ 專用機器人',
      status: 'inactive',
      lastUpdated: '2025-10-20',
      replyCount: 0,
      autoReplyRate: 0,
    },
  ]);

  const [communityApps, setCommunityApps] = useState([
    {
      id: 1,
      platform: 'LINE',
      agentName: '課程 A 專用助理',
      agentId: 1,
      status: 'active',
      replyCount: 256,
    },
    {
      id: 2,
      platform: 'Facebook Messenger',
      agentName: '進階課程助理',
      agentId: 2,
      status: 'active',
      replyCount: 143,
    },
    {
      id: 3,
      platform: 'Instagram',
      agentName: '課程 A 專用助理',
      agentId: 1,
      status: 'inactive',
      replyCount: 0,
    },
  ]);

  // Knowledge Base state
  const [links, setLinks] = useState([
    {
      id: 1,
      name: 'Python 初學者課程',
      type: '線上課程',
      expiration: '永久',
      url: 'https://example.com/python-course',
      status: '啟用',
    },
    {
      id: 2,
      name: '進階影片剪輯',
      type: '線上課程',
      expiration: '6 個月',
      url: 'https://example.com/video-editing',
      status: '啟用',
    },
  ]);

  const [qas, setQas] = useState([
    {
      id: 1,
      question: '我可以使用多久？',
      answer: '購買後終身使用。',
      category: '課程政策',
      visibility: '公開',
    },
    {
      id: 2,
      question: '可以退款嗎？',
      answer: '可以，如果您不滿意，購買後 30 天內可以退款。',
      category: '付款',
      visibility: '公開',
    },
  ]);

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: '授課的編輯技巧',
      content: '總是從架構���大綱開始，再深入細節。使用來自真實情境的具體範例...',
      summary: '總是從架構和大綱開始，再深入細節。使用來自真實情境的具體範例...',
      lastUpdated: '2025-11-08',
      usedForTraining: true,
    },
  ]);

  const addAgent = (agent) => {
    const newAgent = {
      ...agent,
      id: agents.length + 1,
      lastUpdated: new Date().toISOString().split('T')[0],
      replyCount: 0,
      autoReplyRate: 0,
    };
    setAgents([...agents, newAgent]);
    return newAgent.id;
  };

  const updateAgent = (id, updates) => {
    setAgents(agents.map(agent => 
      agent.id === id ? { ...agent, ...updates } : agent
    ));
  };

  const deleteAgent = (id) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  const addCommunityApp = (app) => {
    const newApp = {
      ...app,
      id: communityApps.length + 1,
      replyCount: 0,
    };
    setCommunityApps([...communityApps, newApp]);
  };

  const updateCommunityApp = (id, updates) => {
    setCommunityApps(communityApps.map(app => 
      app.id === id ? { ...app, ...updates } : app
    ));
  };

  const deleteCommunityApp = (id) => {
    setCommunityApps(communityApps.filter(app => app.id !== id));
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  agents={agents}
                  communityApps={communityApps}
                  updateCommunityApp={updateCommunityApp}
                />
              } 
            />
            <Route 
              path="/knowledge-base" 
              element={
                <KnowledgeBase 
                  links={links}
                  setLinks={setLinks}
                  qas={qas}
                  setQas={setQas}
                  notes={notes}
                  setNotes={setNotes}
                />
              } 
            />
            <Route 
              path="/create-agent" 
              element={
                <CreateAgent 
                  addAgent={addAgent}
                  links={links}
                  qas={qas}
                  notes={notes}
                />
              } 
            />
            <Route 
              path="/connect-community" 
              element={
                <ConnectCommunity 
                  agents={agents}
                  addCommunityApp={addCommunityApp}
                />
              } 
            />
            <Route path="/reports" element={<Reports agents={agents} communityApps={communityApps} />} />
            <Route 
              path="/agents" 
              element={
                <AgentManagement 
                  agents={agents}
                  updateAgent={updateAgent}
                  deleteAgent={deleteAgent}
                />
              } 
            />
            <Route 
              path="/community-apps" 
              element={
                <CommunityAppsManagement 
                  communityApps={communityApps}
                  agents={agents}
                  updateCommunityApp={updateCommunityApp}
                  deleteCommunityApp={deleteCommunityApp}
                />
              } 
            />
            <Route path="/community-inbox" element={<CommunityInbox />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
