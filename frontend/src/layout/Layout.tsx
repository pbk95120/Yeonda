import MainHeader from '@/components/common/MainHeader';
import MainFooter from '@/components/common/MainFooter';

/**
 * Layout component
 */
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className=''>
      <MainHeader />
      <main className='font-sans'>{children}</main>
      <MainFooter />
    </div>
  );
};

export default Layout;
