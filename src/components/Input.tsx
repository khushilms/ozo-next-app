import React from 'react';

interface InputProps {
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function Input({
  name,
  value,
  onChange,
  placeholder,
}: InputProps) {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={name} className='text-sm font-medium'>{placeholder}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 rounded bg-white"
      />
    </div>
  )
}

export default Input;