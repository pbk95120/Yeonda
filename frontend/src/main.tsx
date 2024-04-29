import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TestPage from '@/pages/TestPage';
import LoginPage from '@/pages/LoginPage';
import JoinPage from '@/pages/JoinPage';
import FindPassWordPage from '@/pages/FindPassWordPage';
import TutorialPage from '@/pages/TutorialPage';
import StatisticsPage from '@/pages/StatisticsPage';
import AnalysisPage from '@/pages/AnalysisPage';
import MyDiaryPage from '@/pages/MyDiaryPage';
import MyDiaryDetailPage from '@/pages/MyDiaryDetailPage';
import DiarySuggestionPage from '@/pages/DiarySuggestionPage';
import DiaryPopularPage from '@/pages/DiaryPopularPage';
import MyPage from '@/pages/MyPage';
import SettingPage from '@/pages/SettingPage';
import WithdrawalPage from '@/pages/WithdrawalPage';
import WriteDiaryPage from '@/pages/WriteDiaryPage';
import ChatPage from '@/pages/ChatPage';
import ChatDetailPage from '@/pages/ChatDetailPage';
import ChatProfilePage from '@/pages/ChatProfilePage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <TestPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/join',
    element: <JoinPage />,
  },
  {
    path: '/find',
    element: <FindPassWordPage />,
  },
  {
    path: '/tutorial',
    element: <TutorialPage />,
  },
  {
    path: '/admin/statistics',
    element: <StatisticsPage />,
  },
  {
    path: '/admin/analysis',
    element: <AnalysisPage />,
  },
  {
    path: '/mydiary',
    element: <MyDiaryPage />,
  },
  {
    path: '/mydiary/:id',
    element: <MyDiaryDetailPage />,
  },
  {
    path: '/othersdiary/suggestion',
    element: <DiarySuggestionPage />,
  },
  {
    path: '/othersdiary/popular',
    element: <DiaryPopularPage />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '/mypage/setting',
    element: <SettingPage />,
  },
  {
    path: '/withdrawal',
    element: <WithdrawalPage />,
  },
  {
    path: '/writeDiary',
    element: <WriteDiaryPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/chat/:id',
    element: <ChatDetailPage />,
  },
  {
    path: '/chat/profile/:id',
    element: <ChatProfilePage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
