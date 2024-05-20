import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { IoIosArrowBack } from 'react-icons/io';
import AddressModal from '../common/AddressModal';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/api/user.api';
import { useAuthStore } from '@/store/authStore';
import { getMyPageMyInfo, patchMyInfoAddress, patchMyInfoPicture } from '@/api/mypage.api';
import { useForm } from 'react-hook-form';

interface PreferenceFormInputs {
  address: string;
  picture: File;
}

const MyInfo = () => {
  const { setValue, getValues } = useForm<PreferenceFormInputs>();
  const { storeLogout } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [picture_url, setPicture_url] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [newAddress, setNewAddress] = useState<string>('');
  const [beforePicture, setBeforePicture] = useState<string>('');
  useEffect(() => {
    getMyPageMyInfo().then((data) => {
      const { picture_url, detail } = data;
      console.log(detail, address, newAddress);
      setBeforePicture(picture_url);
      setPicture_url(picture_url);
      setAddress(detail);
      saveBtn();
    });
  }, [newAddress, picture_url]);
  const saveBtn = () => {
    let save = document.querySelector('#myPrefBtn');
    let back = document.querySelector('#backBtn');
    if (address !== newAddress && newAddress.length > 0) {
      back?.addEventListener('click', () => {
        setTimeout(() => patchMyInfoAddress(getValues('address')).then(() => console.log('주소변경 완료')), 2000);
      });
      save?.addEventListener('click', () => {
        setTimeout(() => patchMyInfoAddress(getValues('address')).then(() => console.log('주소변경 완료')), 2000);
      });
    }
    back?.addEventListener('click', () => {
      let imageFormData = new FormData();
      imageFormData.append('picture', getValues('picture'));
      setTimeout(() => patchMyInfoPicture(imageFormData).then(() => console.log('사진변경 완료')), 2000);
    });
    save?.addEventListener('click', () => {
      let imageFormData = new FormData();
      imageFormData.append('picture', getValues('picture'));
      setTimeout(() => patchMyInfoPicture(imageFormData).then(() => console.log('사진변경 완료')), 2000);
    });
  };

  const handleAddressSelection = (address: string) => {
    console.log(address);
    setNewAddress(address);
    setValue('address', address);
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
      <Input
        inputFor='image'
        className='mt-3'
        contentImageState={{ contentImage: picture_url, setContentImage: setPicture_url }}
        setValue={setValue}
      />
      <div className='flex h-[86px] w-[339px] flex-col p-3 shadow-lg'>
        <span className='mb-3 font-sans font-bold'>주소</span>
        <div className='flex flex-row'>
          <div className='font-sans text-lightgray'>{newAddress ? newAddress : address}</div>
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
