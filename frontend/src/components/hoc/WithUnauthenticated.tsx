import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const WithUnauthenticated = (Component: React.ComponentType<any>) => {
  const WithUnauthenticatedComponent = (props: any) => {
    const { isLoggedIn } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        if (isLoggedIn) {
          alert('이미 로그인하셨습니다');
          navigate('/othersdiary/suggestion');
        }
      };
      checkAuth();
    }, []);

    return <Component {...props} />;
  };

  return WithUnauthenticatedComponent;
};
