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
        <div
          onClick={() => setOpen(false)}
          className={cls(`w-[130px] overflow-hidden rounded-xl bg-white text-center shadow-lg ${className}`)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
