import { useEffect, useState } from 'react';
import { Context } from '../../../store/Context';
import { useContext } from 'react';
import classes from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const authContext = useContext(Context);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const nameHandler = event => {
    setName(event.target.value);
  };
  const emailHandler = event => {
    setEmail(event.target.value);
  };

  const passwordHandler = event => {
    setPassword(event.target.value);
  };

  const formSubmition = event => {
    event.preventDefault();

    if (isLogin) {
      navigate('/userprofile');
      authContext.login(email, password);
    } else {
      navigate('/userprofile');
      authContext.register(name, email, password);
    }

    setName('');
    setEmail('');
    setPassword('');
  };

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={formSubmition}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              value={name}
              onChange={nameHandler}
              type="name"
              id="name"
              required
            />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            value={email}
            onChange={emailHandler}
            type="email"
            id="email"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            value={password}
            onChange={passwordHandler}
            type="password"
            id="password"
            required
            minLength={7}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
