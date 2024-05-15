import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import { useState } from "react";




const WithdrawalPage = () => {
  const [open,isOpen] = useState<boolean>(false)
  const openModal = ()=> {
    isOpen(true)
  }
  const closeModal = ()=>{
    isOpen(false)
  }
  return (
  <div className="pt-12">
    <div className="ml-8">비밀번호 확인</div> 
    <div className="flex flex-col justify-center items-center mt-2"> 
      <Input className="font-sans w-[316px] h-[56px]" inputFor="default" placeholder="비밀번호 확인(placeholder)"/>
      <Button size="large" color="pastelred" children="회원 탈퇴" className="bottom-12 absolute" onClick={openModal}/>
    </div>
   {open && <Modal isOpen={open} closeModal={closeModal} cautionMsg="탈퇴한 계정은 복구가 불가능합니다.
정말 탈퇴하시겠습니까?" purposeMsg="회원 탈퇴"/>}
  </div>)
};

export default WithdrawalPage;
