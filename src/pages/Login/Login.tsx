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

  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1280);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const mockFetch = () =>
        new Promise<{ ok: boolean; message: string }>((resolve) =>
          setTimeout(() => {
            if (email === 'test@example.com' && password === '123456') {
              resolve({ ok: true, message: 'Login successful' });
            } else {
              resolve({ ok: false, message: 'Invalid email or password' });
            }
          }, 1000)
        );

      const response = await mockFetch();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(response.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.page}>
      {isDesktop && <FlyingAlien />}
      <div className={s.container}>
        <div className={s.login}>
          <h2 className={s.title}>Login</h2>
          <form
            onSubmit={handleSubmit}
            aria-label="Login form"
            className={s.form}
          >
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className={s.input}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              autoComplete={'current-password'}
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
              <div className={s.message}>
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
              </div>
              <Button type="submit" loading={loading} className={s.button}>
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <p className={s.footer}>
        Don't have an account? <br />
        <a href="#" id="register" className={s.link}>
          Register
        </a>
      </p>
    </div>
  );
};

export default React.memo(Login);
