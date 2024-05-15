import { useState } from "react";
import Button from "../common/Button"
import Input from "../common/Input"
import { IoIosArrowBack } from 'react-icons/io';
import AddressModal from "../common/AddressModal";



const MyInfo =()=>{
  const [isModalOpen,setIsModalOpen] =useState<boolean>(false)
  const [address,setAddress] = useState<string>("")


  const handleAddressSelection = (address: string) => {
    setAddress(address);
    setIsModalOpen(false);
  };
  return (
  <div className="flex flex-col items-center justify-around"> 
    <Input inputFor="image" className="mt-3"/>
    <div className="shadow-lg w-[339px] h-[86px] flex flex-col p-3">
      <span className="font-sans font-bold mb-3">주소</span>
      <div className="flex flex-row">
        <div className="text-lightgray font-sans">{address}</div>
        <div className='absolute z-20 right-7 flex justify-center items-center'>
          <IoIosArrowBack className='w-6 h-6 fill-gray rotate-180' onClick={()=>setIsModalOpen(!isModalOpen)}  />
       </div>
      </div>
    </div>
    <div className="flex flex-col space-y-4 items-center justify-center p-2 absolute bottom-20"> 
      <Button size="large" children="로그아웃" className="" color="lightgray"/>
      <Button size="large" children="회원탈퇴" color="pastelred"/>
    </div>
    <AddressModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} onSelectAddress={handleAddressSelection} />
  </div>)
}

export default MyInfo