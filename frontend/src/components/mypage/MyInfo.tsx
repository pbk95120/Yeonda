import Button from "../common/Button"
import Input from "../common/Input"



const MyInfo =()=>{
  return (
  <div> 
    <Input inputFor="image"/>
    <div className="flex flex-col space-y-4 items-center justify-center p-2"> 
      <Button size="large" children="로그아웃" className="" color="lightgray"/>
      <Button size="large" children="회원탈퇴" color="pastelred"/>
    </div>
   
  </div>)
}

export default MyInfo