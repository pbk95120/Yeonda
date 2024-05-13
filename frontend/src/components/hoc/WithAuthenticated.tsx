import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const WithAuthenticated = (Component: React.ComponentType<any>) => {
  const WithAuthenticatedComponent = (props: any) => {
    const { isLoggedIn } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        if (!(await isLoggedIn())) {
          alert('로그인을 해주세요');
          navigate('/login');
        }
      };
      checkAuth();
    }, []);

    return <Component {...props} />;
  };

  return WithAuthenticatedComponent;
};
