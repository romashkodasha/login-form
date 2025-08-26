import * as React from 'react';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';

import s from './Login.module.scss';
import Button from 'components/Button';
import FlyingAlien from 'components/FlyingAlien/FlyingAlien';

const Login: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === 'test@example.com' && password === '123456') {
        setSuccess(true);
      } else {
        setError('Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.page}>
      <FlyingAlien />
      <div className={s.container}>
        <div className={s.login}>
          <h2 className={s.title}>Login</h2>
          <form
            onSubmit={handleSubmit}
            aria-label="Login form"
            className={s.form}
          >
            <Input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className={s.input}
            />
            <Input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className={s.input}
            />
            <div className={s.options}>
              <Checkbox
                id="remember"
                name="remember"
                label="Remember me"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <a href="#" className={s.link}>
                Forgot Password?
              </a>
            </div>
            <div className={s.buttonContainer}>
              {error && (
                <p role="alert" className={s.error}>
                  {error}
                </p>
              )}
              {success && (
                <p role="status" className={s.success}>
                  Welcome back!👽
                </p>
              )}
              <Button type="submit" loading={loading} className={s.button}>
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <p className={s.footer}>
        Don't have an account?{' '}
        <a href="#" id="register" className={s.link}>
          Register
        </a>
      </p>
    </div>
  );
};

export default React.memo(Login);
