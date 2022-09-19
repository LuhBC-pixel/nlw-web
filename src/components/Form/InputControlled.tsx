import { Input } from './Input';

interface InputControlledProps {
  name: string;
  label: string;
  placeholder?: string;
  errors?: any;
  className?: string;
  register: any;
  type?: string;
}

export function InputControlled({
  type = 'text',
  name,
  label,
  errors,
  placeholder,
  className = 'flex flex-col gap-2',
  ...props
}: InputControlledProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className='font-semibold'>
        {label}
      </label>
      <Input type={type} id={name} placeholder={placeholder} {...props} />
      <p>{errors.name?.message}</p>
    </div>
  );
}
