import * as React from 'react';
import s from './Button.module.scss';
import cn from 'classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  className,
  ...rest
}) => {
  return (
    <button
      className={cn(s.button, loading && s.button_loading, className)}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? <span className={s.spinner} /> : children}
    </button>
  );
};

export default Button;
