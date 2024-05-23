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
        <label htmlFor='picture_url' className='inline-block cursor-pointer'>
          {image ? (
            <img src={image} alt='Profile' className='mb-4 h-[72px] w-[72px] rounded-full' />
          ) : (
            <img src={SVG} alt='Profile' className='mb-4 h-[72px] w-[72px] rounded-full' />
          )}
          <input
            id='picture_url'
            type='file'
            name='picture_url'
            accept='image/*'
            onChange={handleImageChange}
            className='hidden'
          />
        </label>
      </fieldset>
    </div>
  );
};

export default ProfilePictureInput;
