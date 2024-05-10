import { login } from "@/api/user.api"
import { useAuthStore } from "@/store/authStore";
import { LoginProps } from "@/types/user"
import { useNavigate } from "react-router-dom";

export const useAuth = () =>{
  const { storeLogin } = useAuthStore();
  const navigate = useNavigate();
    const userLogin = (data:LoginProps) => {
        login(data).then(
            (res) => {
                navigate("/othersdiary/suggestion");
                alert('로그인 성공')
            },
            (err) => {
                alert('로그인 실패')
            }
        )
    }
    
    return {
        userLogin,
    }
}