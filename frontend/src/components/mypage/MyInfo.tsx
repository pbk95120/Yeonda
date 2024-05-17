import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { IoIosArrowBack } from 'react-icons/io';
import AddressModal from '../common/AddressModal';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/api/user.api';
import { useAuthStore } from '@/store/authStore';

const MyInfo = () => {
  const { storeLogout } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const navigate = useNavigate();

  const handleAddressSelection = (address: string) => {
    setAddress(address);
    setIsModalOpen(false);
  };

  const myInfoLogout = async () => {
    logout().then(() => {
      storeLogout();
      navigate('/login');
    });
  };

  return (
    <div className='flex flex-col items-center justify-around'>
      <Input inputFor='image' className='mt-3' />
      <div className='flex h-[86px] w-[339px] flex-col p-3 shadow-lg'>
        <span className='mb-3 font-sans font-bold'>주소</span>
        <div className='flex flex-row'>
          <div className='font-sans text-lightgray'>{address}</div>
          <div className='absolute right-7 z-20 flex items-center justify-center'>
            <IoIosArrowBack className='h-6 w-6 rotate-180 fill-gray' onClick={() => setIsModalOpen(!isModalOpen)} />
          </div>
        </div>
      </div>
      <div className='absolute bottom-20 flex flex-col items-center justify-center space-y-4 p-2'>
        <Button size='large' children='로그아웃' className='' color='lightgray' onClick={myInfoLogout} />
        <Button size='large' children='회원탈퇴' color='pastelred' onClick={() => navigate('/withdrawal')} />
      </div>
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectAddress={handleAddressSelection}
      />
    </div>
  );
};

export default MyInfo;
