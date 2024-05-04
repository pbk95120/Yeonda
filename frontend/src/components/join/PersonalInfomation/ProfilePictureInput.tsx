import { useState } from 'react';
import SVG from '@/assets/images/Profile.svg';

interface ProfilePictureInputProps {
  onImageChange: (imageDataUrl: string, file: File) => void;
}

const ProfilePictureInput = ({ onImageChange }: ProfilePictureInputProps) => {
  const [image, setImage] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setImage(imageDataUrl);
        onImageChange(imageDataUrl, file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <fieldset>
        <legend className='pb-2 text-sm'>프로필 사진</legend>
        <label htmlFor='profileImage' className='cursor-pointer inline-block'>
          {image ? (
            <img src={image} alt='Profile' className='w-[72px] h-[72px] rounded-full mb-4' />
          ) : (
            <img src={SVG} alt='Profile' className='w-[72px] h-[72px] rounded-full mb-4' />
          )}
          <input id='profileImage' type='file' accept='image/*' onChange={handleImageChange} className='hidden' />
        </label>
      </fieldset>
    </div>
  );
};

export default ProfilePictureInput;
