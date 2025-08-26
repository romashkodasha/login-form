import * as React from 'react';
import s from './Checkbox.module.scss';
import cn from 'classnames';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  className,
  ...props
}) => {
  return (
    <div className={cn(s.checkbox, className)}>
      <input type="checkbox" id={id} {...props} className={s.input} />
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
