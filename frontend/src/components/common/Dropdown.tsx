import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  toggleButton: React.ReactNode;
  isOpen?: boolean;
}

const Dropdown = ({ children, toggleButton, isOpen = false }: Props) => {
  const [open, setOpen] = useState(isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setOpen(!open)}>{toggleButton}</button>
      {open && (
        <div className='overflow-hidden rounded-xl text-center absolute top-[20px] right-[0px] bg-white shadow-lg w-[130px]'>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
