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
    <div className='font-sans w-full mx-auto max-w-screen-sm fixed h-screen'>
      {showHeader && (
        <MainHeader value={value} onlyLogo={onlyLogo} setting={setting} cancelStr={cancelStr} backBtn={backBtn} />
      )}
      {chatHeader && <ChatHeader />}
      <main className={`h-screen overflow-auto ${showFooter ? 'max-h-content' : ''}`} id='main-content'>
        {children}
      </main>
      {showFooter && <MainFooter />}
    </div>
  );
};

export default Layout;
