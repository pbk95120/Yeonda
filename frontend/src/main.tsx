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
    onlyLogo: false,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
    showHeader: true,
    showFooter: true,
    onlyLogo: false,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
  },
  {
    path: '/join',
    element: <JoinPage />,
    showHeader: true,
    showFooter: false,
    onlyLogo: true,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
  },
  {
    path: '/find',
    element: <FindPassWordPage />,
    showHeader: true,
    showFooter: false,
    onlyLogo: true,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
  },
  {
    path: '/tutorial',
    element: <TutorialPage />,
    showHeader: true,
    showFooter: false,
    onlyLogo: true,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
  },
  {
    path: '/admin/statistics',
    element: <StatisticsPage />,
    showHeader: true,
    showFooter: false,
    onlyLogo: true,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
  },
  {
    path: '/admin/analysis',
    element: <AnalysisPage />,
    showHeader: true,
    showFooter: false,
    onlyLogo: true,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
  },
  {
    path: '/mydiary',
    element: <MyDiaryPage />,
    showHeader: true,
    showFooter: true,
    onlyLogo: false,
    value: '내 일기',
    backBtn: false,
    cancelStr: false,
  },
  {
    path: '/mydiary/:id',
    element: <MyDiaryDetailPage />,
    showHeader: true,
    showFooter: false,
    onlyLogo: true,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
  },
  {
    path: '/othersdiary/suggestion',
    element: <DiarySuggestionPage />,
    showHeader: true,
    showFooter: true,
    onlyLogo: true,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
  },
  {
    path: '/othersdiary/popular',
    element: <DiaryPopularPage />,
    showHeader: true,
    showFooter: false,
    onlyLogo: true,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
  },
  {
    path: '/mypage',
    element: <MyPage />,
    showHeader: true,
    showFooter: true,
    onlyLogo: false,
    setting: true,
    value: 'MyPage',
    backBtn: false,
    cancelStr: false,
  },
  {
    path: '/mypage/setting',
    element: <SettingPage />,
    showHeader: true,
    showFooter: false,
    onlyLogo: true,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
  },
  {
    path: '/withdrawal',
    element: <WithdrawalPage />,
    showHeader: true,
    showFooter: false,
    onlyLogo: true,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
  },
  {
    path: '/writeDiary',
    element: <WriteDiaryPage />,
    showHeader: true,
    showFooter: true,
    onlyLogo: false,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
  },
  {
    path: '/chat',
    element: <ChatPage />,
    showHeader: true,
    showFooter: true,
    onlyLogo: false,
    value: '채팅',
    backBtn: true,
    cancelStr: false,
  },
  {
    path: '/chat/:id',
    element: <ChatDetailPage />,
    showHeader: true,
    showFooter: true,
    onlyLogo: false,
    value: '박상하킹갓',
    backBtn: true,
    cancelStr: false,
    profileImg: 'favicon.ico',
    list: true,
  },
  {
    path: '/chat/profile/:id',
    element: <ChatProfilePage />,
    showHeader: true,
    showFooter: false,
    onlyLogo: true,
    value: '박상하킹갓',
    backBtn: false,
    cancelStr: true,
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
            <Layout
              showHeader={item.showHeader}
              showFooter={item.showFooter}
              onlyLogo={item.onlyLogo}
              value={item.value}
              backBtn={item.backBtn}
              cancelStr={item.cancelStr}
              setting={item.setting ? item.setting : null}
              profileImg={item.profileImg ? item.profileImg : null}
              list={item.list ? item.list : null}
            >
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
