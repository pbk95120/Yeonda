import { cls } from '@/utils/cls';
import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  toggleButton: React.ReactNode;
  isOpen?: boolean;
  className?: string;
}

const Dropdown = ({ children, toggleButton, isOpen = false, className }: Props) => {
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
        <div className={cls(`overflow-hidden rounded-xl text-center bg-white shadow-lg w-[130px] ${className}`)}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
