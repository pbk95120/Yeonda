import MainHeader from '@/components/common/MainHeader';
import MainFooter from '@/components/common/MainFooter';
import ChatHeader from '@/components/chat/ChatHeader';
import ScrollToTop from '@/components/common/ScrollToTop';

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
    <div className='font-sans mx-auto max-w-screen-sm relative h-screen w-[375px]'>
      {showHeader && (
        <MainHeader value={value} onlyLogo={onlyLogo} setting={setting} cancelStr={cancelStr} backBtn={backBtn} />
      )}
      {chatHeader && <ChatHeader />}
      <ScrollToTop />
      <main className={`h-screen overflow-auto ${showFooter ? 'max-h-content' : ''}`} id='main-content'>
        {children}
      </main>
      {showFooter && <MainFooter />}
    </div>
  );
};

export default Layout;
