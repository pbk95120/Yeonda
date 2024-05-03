import MainHeader from '@/components/common/MainHeader';
import MainFooter from '@/components/common/MainFooter';
import ChatHeader from '@/components/chat/ChatHeader';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  chatHeader?: boolean;
  showFooter?: boolean;
  value?: string;
  onlyLogo?: boolean;
  setting?: null | boolean;
  cancelStr?: boolean;
  backBtn?: boolean;
}

/**
 * Layout 컴포넌트
 */
const Layout = ({
  children,
  showHeader = true,
  chatHeader = false,
  showFooter = true,
  value,
  onlyLogo,
  setting,
  cancelStr,
  backBtn,
}: LayoutProps) => {
  return (
    <main className='font-sans w-full h-screen mx-auto max-w-sm'>
      {showHeader && (
        <MainHeader value={value} onlyLogo={onlyLogo} setting={setting} cancelStr={cancelStr} backBtn={backBtn} />
      )}
      {chatHeader && <ChatHeader />}
      <div className='h-screen max-h-content overflow-auto'>{children}</div>
      {showFooter && <MainFooter />}
    </main>
  );
};

export default Layout;
