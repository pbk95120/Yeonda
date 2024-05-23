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
import { myPageStore } from '@/store/myPageStore';
import Toast from '../common/Toast';

interface PreferenceFormInputs {
  address: string;
  picture: File;
}

const MyInfo = () => {
  const { setValue, getValues } = useForm<PreferenceFormInputs>();
  const { storeLogout } = useAuthStore();
  const { changeInfo } = myPageStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [afterPicture, setAfterPicture] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [newAddress, setNewAddress] = useState<string>('');
  const [beforePicture, setBeforePicture] = useState<string>('');
  const [toast, setToast] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  const [toastValue, setToastValue] = useState<string>('');

  const handleAddressSelection = (address: string) => {
    setNewAddress(address);
    setValue('address', address);
    setIsModalOpen(false);
  };

  const myInfoLogout = async () => {
    logout().then(() => {
      storeLogout();
      setToast(true);
      navigate('/login');
    });
  };

  useEffect(() => {
    let localData = myPageStore.getState();
    setAddress(localData.address);
    setBeforePicture(localData.picture);
    if (localData.address !== newAddress && newAddress.length > 0) {
      patchMyInfoAddress(getValues('address')).then(
        () => {
          let changedAddress = getValues('address');
          setAddress(changedAddress);
          changeInfo({ address: changedAddress, picture: beforePicture });
          setValid(true);
          setToastValue('주소 저장 완료!');
          setToast(true);
        },
        () => {
          setValid(false);
          setToastValue('주소 저장 실패!');
          setToast(true);
        },
      );
    }
    if (localData.picture !== afterPicture && afterPicture) {
      let imageFormData = new FormData();
      imageFormData.append('picture', getValues('picture'));
      patchMyInfoPicture(imageFormData).then(
        () => {
          let changedPicture = afterPicture;
          setBeforePicture(changedPicture);
          changeInfo({ address: localData.address, picture: changedPicture });
          setValid(true);
          setToastValue('이미지 저장 완료!');
          setToast(true);
        },
        () => {
          setValid(false);
          setToastValue('이미지 저장 실패!');
          setToast(true);
        },
      );
    }
  }, [newAddress, afterPicture]);

  return (
    <div className='flex flex-col items-center justify-around'>
      <Input
        inputFor='image'
        className='mt-3'
        contentImageState={{ contentImage: beforePicture, setContentImage: setAfterPicture }}
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
      <div className='mt-7 flex flex-col items-center justify-center space-y-4 p-2'>
        <Button size='large' children='로그아웃' className='' color='lightgray' onClick={myInfoLogout} />
        <Button size='large' children='회원탈퇴' color='pastelred' onClick={() => navigate('/withdrawal')} />
      </div>
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectAddress={handleAddressSelection}
      />
      {toast && <Toast valid={valid} setToast={setToast} value={toastValue} />}
    </div>
  );
};

export default MyInfo;
