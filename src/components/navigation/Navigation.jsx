import { NavLink, Link, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.css';
import { Context } from '../store/Context';
import { useContext, useState, useEffect } from 'react';

const Navigation = () => {
  const authContext = useContext(Context);
  let [email, setEmail] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   authContext.refresh();
  // }, []);

  useEffect(() => {
    let isEmail = localStorage.getItem('email');

    if (!isEmail) return;
    setEmail(isEmail);
  }, [email]);

  const logoutHandler = () => {
    authContext.logout();
    navigate('/login');
  };

  return (
    <>
      <header className={styles.header}>
        <Link to={'/'}>
          <div className={styles.logo}>GoIT</div>
        </Link>
        <nav>
          <ul>
            {!authContext.isAuth && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
            {authContext.isAuth && (
              <>
                <li>
                  <NavLink to="/userprofile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/contacts">Contacts</NavLink>
                </li>
                <li>
                  <h3>{email}</h3>
                  <div className={styles.actions}>
                    <button onClick={logoutHandler}>Logout</button>
                  </div>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
