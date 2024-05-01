import MainHeader from '@/components/common/MainHeader';
import MainFooter from '@/components/common/MainFooter';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  value?: string;
  onlyLogo?: boolean;
  setting?: null | boolean;
  cancelStr?: boolean;
  backBtn?: boolean;
  profileImg?: null | string;
  list?: null | boolean;
}

/**
 * Layout 컴포넌트
 */
const Layout = ({
  children,
  showHeader = true,
  showFooter = true,
  value,
  onlyLogo,
  setting,
  cancelStr,
  backBtn,
  profileImg,
  list,
}: LayoutProps) => {
  return (
    <main className='font-sans w-full mx-auto max-w-screen-sm'>
      {showHeader && (
        <MainHeader
          value={value}
          onlyLogo={onlyLogo}
          setting={setting}
          cancelStr={cancelStr}
          backBtn={backBtn}
          profileImg={profileImg ? profileImg : null}
          list={list}
        />
      )}
      <div className='h-9'>{children}</div>
      {showFooter && <MainFooter />}
    </main>
  );
};

export default Layout;
