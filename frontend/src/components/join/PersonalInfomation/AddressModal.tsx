import React from 'react';
import DaumPostcode from 'react-daum-postcode';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: string) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onSelectAddress }) => {
  return (
    isOpen && (
      <div
        className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'
        onClick={onClose}
      >
        <div className='max-w-lg w-full p-4 bg-white rounded shadow'>
          <DaumPostcode onComplete={(data) => onSelectAddress(data.address)} autoClose />
        </div>
      </div>
    )
  );
};

export default AddressModal;
