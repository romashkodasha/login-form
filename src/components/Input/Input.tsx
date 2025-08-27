import React from 'react';
import s from './Input.module.scss';
import cn from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ id, label, className, ...props }) => {
  return (
    <>
      <input id={id} className={cn(s.input, className)} {...props} />
      <label htmlFor={id} className={s.srOnly}>
        {label}
      </label>
    </>
  );
};

export default Input;
