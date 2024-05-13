import { login } from '@/api/user.api';
import { useAuthStore } from '@/store/authStore';
import { LoginProps } from '@/types/user';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { storeLogin } = useAuthStore();
  const navigate = useNavigate();

  const userLogin = (data: LoginProps) => {
    login(data).then(
      (res) => {
        storeLogin({
          email: data.email,
          preferGender: res.preferGender,
          startAge: res.startAge,
          endAge: res.endAge,
          distance: res.distance,
        });
        alert('로그인 성공');
        navigate('/othersdiary/suggestion');
      },
      (err) => {
        alert('로그인 실패');
      },
    );
  };

  return {
    userLogin,
  };
};
