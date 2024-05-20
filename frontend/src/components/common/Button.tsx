import { cls } from '@/utils/cls';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (a: any) => void;
  color?: 'darkgray' | 'pastelpeach' | 'orange' | 'blue' | 'lightgray' | 'pastelred';
  className?: string;
  children?: string;
  size?: 'small' | 'mini' | 'medium' | 'large';
  disabled?: boolean;
}

const Button = ({ onClick, color = 'lightgray', className, children, size, disabled, ...props }: ButtonProps) => {
  let defaultStr: string = cls('rounded-xl font-sans shadow-xl');

  if (disabled) {
    defaultStr = cls(defaultStr, ' opacity-50 pointer-events-none');
  } else {
    defaultStr = cls(defaultStr, ' opacity-100 pointer-events-auto');
  }

  switch (color) {
    case 'darkgray': {
      defaultStr = cls(defaultStr, ' text-white bg-darkgray hover:bg-darkgray-hover');
      break;
    }
    case 'pastelpeach': {
      defaultStr = cls(defaultStr, ' text-white bg-pastelpeach hover:bg-pastelpeach-hover');
      break;
    }
    case 'orange': {
      defaultStr = cls(defaultStr, ' text-white bg-orange hover:bg-orange-hover');
      break;
    }
    case 'blue': {
      defaultStr = cls(defaultStr, ' text-white bg-blue hover:bg-blue-hover');
      break;
    }
    case 'lightgray': {
      defaultStr = cls(defaultStr, ' text-white bg-lightgray hover:bg-lightgray-hover');
      break;
    }
    case 'pastelred': {
      defaultStr = cls(defaultStr, ' text-white bg-pastelred hover:bg-pastelred-hover');
      break;
    }
  }

  switch (size) {
    case 'small': {
      defaultStr = cls(defaultStr, ' py-1 px-2 text-xs w-20 h-10');
      break;
    }

    case 'mini': {
      defaultStr = cls(defaultStr, ' py-1 px-2 text-xs w-[100px] h-10');
      break;
    }

    case 'medium': {
      defaultStr = cls(defaultStr, ' py-1 px-2 text-s w-[140px] h-[50px]');
      break;
    }

    case 'large': {
      defaultStr = cls(defaultStr, ' py-1 px-2 text-xl w-[300px] h-[50px]');
      break;
    }
  }

  return (
    <button {...props} onClick={onClick} disabled={disabled} className={`${defaultStr} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
