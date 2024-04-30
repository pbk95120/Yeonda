import MainHeader from '@/components/common/MainHeader';
import MainFooter from '@/components/common/MainFooter';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

/**
 * Layout 컴포넌트
 */
const Layout = ({ children, showHeader = true, showFooter = true }: LayoutProps) => {
  return (
    <main className='font-sans w-full mx-auto max-w-screen-sm border-lightgray border-2 min-h-[667px]'>
      {showHeader && <MainHeader />}
      <div>{children}</div>
      {showFooter && <MainFooter />}
    </main>
  );
};

export default Layout;
