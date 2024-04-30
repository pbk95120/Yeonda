import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/layout/Layout';
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
import ErrorPage from '@/pages/ErrorPage';

const queryClient = new QueryClient();

/**
 * 라우터 설정 목록
 * path: 각 페이지의 경로
 * elemnet: 렌더링할 컴포넌트
 * showHeader: Header 표시 여부
 * showFooter: Footer 표시 여부
 */
const routeList = [
  {
    path: '/',
    element: <TestPage />,
    showHeader: true,
    showFooter: false,
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
    showHeader: true,
    showFooter: true,
  },
  {
    path: '/chat/:id',
    element: <ChatDetailPage />,
  },
  {
    path: '/chat/profile/:id',
    element: <ChatProfilePage />,
    showHeader: true,
    showFooter: true,
  },
];

/**
 * router 설정
 */
const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: (
        <>
          {!item.path.includes('/admin') ? (
            <Layout showHeader={item.showHeader} showFooter={item.showFooter}>
              {item.element}
            </Layout>
          ) : (
            item.element
          )}
        </>
      ),
      errorElement: <ErrorPage />,
    };
  }),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
